import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/User.js";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ─── Google Login ─────────────────────────────────────────────
export const googleLogin = async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).json({ success: false, message: "Access token is required" });
    }

    // Fetch user info from Google using the access_token
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (!response.ok) {
      return res.status(401).json({ success: false, message: "Invalid Google token" });
    }

    const payload = await response.json();
    const { email, name, picture, sub: googleId } = payload;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email not provided by Google" });
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Generate a random password hash for OAuth users
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const password_hash = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        email,
        full_name: name || "Google User",
        password_hash,
        avatar_url: picture || null,
        role: "customer",
        is_active: true,
      });
    } else {
      // Update avatar if not set
      if (!user.avatar_url && picture) {
        user.avatar_url = picture;
        await user.save();
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ success: false, message: "Google login failed" });
  }
};

// ─── GitHub Login (OAuth Callback) ────────────────────────────
// GET /auth/github/callback?code=...
// GitHub redirects here → exchange code → find/create user → redirect to frontend with token
export const githubCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

    if (!code) {
      return res.redirect(`${FRONTEND_URL}/login?error=GitHub+code+is+required`);
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.redirect(`${FRONTEND_URL}/login?error=${encodeURIComponent(tokenData.error_description || "GitHub authorization failed")}`);
    }

    const { access_token } = tokenData;

    // Fetch user profile
    const userResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" },
    });

    if (!userResponse.ok) {
      return res.redirect(`${FRONTEND_URL}/login?error=Failed+to+fetch+GitHub+user+info`);
    }

    const ghUser = await userResponse.json();

    // Fetch user emails (email may be private)
    let email = ghUser.email;
    if (!email) {
      const emailsResponse = await fetch("https://api.github.com/user/emails", {
        headers: { Authorization: `Bearer ${access_token}`, Accept: "application/json" },
      });
      if (emailsResponse.ok) {
        const emails = await emailsResponse.json();
        const primary = emails.find((e) => e.primary && e.verified);
        email = primary?.email || emails[0]?.email;
      }
    }

    if (!email) {
      return res.redirect(`${FRONTEND_URL}/login?error=Email+not+available+from+GitHub`);
    }

    // Find or create user
    let user = await User.findOne({ where: { email } });

    if (!user) {
      const randomPassword = crypto.randomBytes(32).toString("hex");
      const password_hash = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        email,
        full_name: ghUser.name || ghUser.login || "GitHub User",
        password_hash,
        avatar_url: ghUser.avatar_url || null,
        role: "customer",
        is_active: true,
      });
    } else {
      // Always update name and avatar from GitHub
      user.full_name = ghUser.name || ghUser.login || user.full_name;
      if (ghUser.avatar_url) {
        user.avatar_url = ghUser.avatar_url;
      }
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token + user info
    const userData = encodeURIComponent(JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.full_name,
      full_name: user.full_name,
      avatar_url: user.avatar_url,
      role: user.role,
    }));

    return res.redirect(`${FRONTEND_URL}/login?github_token=${token}&github_user=${userData}`);
  } catch (error) {
    console.error("GitHub callback error:", error);
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
    return res.redirect(`${FRONTEND_URL}/login?error=GitHub+login+failed`);
  }
};

// ─── Standard Login ───────────────────────────────────────────
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};

// ─── Register ─────────────────────────────────────────────────
export const register = async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      full_name,
      password_hash,
      role: "customer",
      is_active: true,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
};

// ─── Get Current User ─────────────────────────────────────────
export const me = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
