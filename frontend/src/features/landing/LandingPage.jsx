import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PawPrint,
  Scissors,
  Waves,
  Crown,
  Calendar,
  Star,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Heart,
  Sparkles,
  Smile,
  ArrowRight,
  ShieldCheck,
  Lock,
  CheckCircle2,
  Scan,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import Input from "../../components/ui/Input";

const LandingPage = () => {

  return (
    <div className="bg-clay-background min-h-screen font-nunito text-gray-800 overflow-hidden relative selection:bg-primary/20">
      {/* Organic Background Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-peach/30 rounded-full blur-[100px] -z-10 pointer-events-none"
        style={{ willChange: "transform" }}
      />
      <motion.div
        animate={{
          y: [0, 80, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-lavender/30 rounded-full blur-[100px] -z-10 pointer-events-none"
        style={{ willChange: "transform" }}
      />


      {/* Fragmented Hero Section */}
      <section className="relative pt-40 pb-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Concentrated Content */}
          <div className="lg:col-span-6 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 bg-cream rounded-full shadow-clay-sm text-primary-dark font-bold"
            >
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="font-fredoka">Premium Pet Daycare & Spa</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl lg:text-9xl font-fredoka font-bold leading-[1.1] text-gray-800"
            >
              Happy <br />
              <span className="text-primary text-puffy">Paws,</span> <br />
              <span className="text-secondary">Kind</span> Hearts
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-gray-500 font-medium max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Chúng tôi không chỉ chải chuốt; chúng tôi nuông chiều. Hãy mang
              đến cho người bạn thân nhất của bạn trải nghiệm sang trọng mà họ
              xứng đáng có được trong spa lấy cảm hứng từ chủ nghĩa đất sét vui
              tươi của chúng tôi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              <Link to="/booking">
                <Button className="text-xl px-10 py-6 group">
                  Đặt lịch ngay
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Button>
              </Link>
              <Link to="/scan">
                <Button
                  variant="peach"
                  className="text-xl px-10 py-6 group flex items-center gap-3"
                >
                  <Scan className="w-6 h-6" />
                  Tìm sản phẩm qua ảnh
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Fragmented Visuals (Right Side) */}
          <div className="lg:col-span-6 relative h-[600px] mt-20 lg:mt-0">
            {/* Main Floating Image */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-3/4 aspect-square rounded-blob overflow-hidden shadow-clay-lg border-[16px] border-white z-20"
            >
              <img
                src="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?w=800&auto=format&fit=crop&q=80"
                alt="Main Pet Spa"
                className="w-full h-full object-cover"
                loading="eager"
                draggable={false}
              />
            </motion.div>

            {/* Floating Fragment 1 */}
            <motion.div
              animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-10 left-0 w-1/2 aspect-[4/3] rounded-clay shadow-clay-md border-8 border-white z-30 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=400&auto=format&fit=crop&q=80"
                alt="Small Pet Grooming"
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </motion.div>

            {/* Decorative Badge 1 */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 10 }}
              className="absolute top-1/4 -left-10 bg-white p-6 rounded-clay shadow-clay-md z-40 flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <Star className="text-secondary w-6 h-6 fill-secondary" />
              </div>
              <div>
                <div className="font-fredoka font-bold text-gray-800">
                  4.9/5
                </div>
                <div className="text-sm text-gray-400">User Rating</div>
              </div>
            </motion.div>

            {/* Decorative Badge 2 */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -10 }}
              className="absolute bottom-20 right-0 bg-primary p-6 rounded-clay shadow-clay-lg z-40 flex items-center gap-4 text-white cursor-pointer"
            >
              <Heart className="w-10 h-10 fill-white" />
              <div className="font-fredoka font-bold text-3xl">100%</div>
              <div className="text-sm opacity-80 leading-tight font-bold">
                Safe & <br />
                Trusted
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Task 6: Organic Draggable Gallery */}
      <section
        id="gallery"
        className="py-32 bg-white/30 relative overflow-hidden h-[900px]"
      >
        <div className="max-w-7xl mx-auto px-6 relative z-10 pointer-events-none">
          <div className="text-center space-y-4">
            <h2 className="text-6xl font-fredoka font-bold text-gray-800">
              Happy Clients
            </h2>
            <p className="text-xl text-gray-500 font-medium">
              Kéo thả ảnh để khám phá khoảnh khắc đáng yêu của các bé thú cưng.
            </p>
          </div>
        </div>

        {/* Draggable Area */}
        {/* FIX: Use absolute position + responsive grid calculations instead of % to stop overlap */}
        <div className="relative w-full h-[600px] mt-20 flex flex-wrap justify-center items-center gap-8 px-6">
          {[
            {
              src: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80", // Happy Dog
              rotate: -5,
            },
            {
              src: "https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=400&auto=format&fit=crop&q=80", // Pug in towel
              rotate: 8,
            },
            {
              src: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&auto=format&fit=crop&q=80", // Shiba
              rotate: -12,
            },
            {
              src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&auto=format&fit=crop&q=80", // Cat grooming
              rotate: 5,
            },
            {
              src: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&auto=format&fit=crop&q=80", // Cat in towel
              rotate: -3,
            },
            {
              src: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&auto=format&fit=crop&q=80", // Running dogs
              rotate: 10,
            },
          ].map((img, idx) => (
            <motion.div
              key={idx}
              drag
              dragConstraints={{
                left: -100,
                right: 100,
                top: -100,
                bottom: 100,
              }}
              dragElastic={0.9}
              dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
              whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0 }}
              initial={{ rotate: img.rotate }}
              className="relative cursor-grab active:cursor-grabbing group p-2 sm:p-4 bg-white rounded-clay shadow-clay-lg border-[6px] sm:border-8 border-white w-40 sm:w-64 aspect-[3/4] flex-shrink-0"
            >
              <img
                src={img.src}
                alt={`Gallery Pet ${idx}`}
                className="w-full h-full object-cover rounded-[1rem] pointer-events-none"
                loading="lazy"
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-clay-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ x: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/20 rounded-blob blur-xl pointer-events-none"
          style={{ willChange: "transform" }}
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/20 rounded-blob blur-xl pointer-events-none"
          style={{ willChange: "transform" }}
        />
      </section>

      {/* How It Works — 3 steps */}
      <section className="py-32 bg-white/40 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-peach/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-lavender/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-primary/10 rounded-full text-primary font-bold font-fredoka"
            >
              <Sparkles className="w-4 h-4" /> Đơn giản & Nhanh chóng
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-6xl font-fredoka font-bold text-gray-800"
            >
              Cách Hoạt Động
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 font-medium max-w-xl mx-auto"
            >
              Chỉ 3 bước đơn giản để thú cưng của bạn được chăm sóc tốt nhất!
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 relative">
            {/* Connector line — aligned with icon center (icon is w-24 h-24, starts at mt-4 below step badge) */}

            {[
              {
                step: "01",
                icon: <Scan className="w-10 h-10" />,
                title: "Scan Thú Cưng",
                desc: "Dùng AI Scanner để nhận diện giống thú cưng và nhận gợi ý dịch vụ phù hợp nhất.",
                color: "bg-primary",
                bg: "bg-primary/5",
                delay: 0,
              },
              {
                step: "02",
                icon: <Scissors className="w-10 h-10" />,
                title: "Chọn Dịch Vụ",
                desc: "Xem bảng giá và chọn gói chăm sóc phù hợp với nhu cầu của thú cưng bạn.",
                color: "bg-peach",
                bg: "bg-peach/10",
                delay: 0.15,
              },
              {
                step: "03",
                icon: <Calendar className="w-10 h-10" />,
                title: "Đặt Lịch Ngay",
                desc: "Chọn ngày giờ thuận tiện và nhận xác nhận lịch hẹn tức thì qua hệ thống.",
                color: "bg-secondary",
                bg: "bg-secondary/5",
                delay: 0.3,
              },
            ].map((item) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item.delay, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className={`relative ${item.bg} rounded-clay p-10 shadow-clay-md border-2 border-white flex flex-col items-center text-center gap-6 cursor-default`}
              >
                {/* Step number badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-clay-sm flex items-center justify-center">
                  <span className="font-fredoka font-bold text-primary text-sm">
                    {item.step}
                  </span>
                </div>

                {/* Icon */}
                <div
                  className={`w-24 h-24 ${item.color} rounded-full flex items-center justify-center shadow-clay-md text-white mt-4`}
                >
                  {item.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-fredoka font-bold text-gray-800">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <Link to="/booking">
              <Button className="text-xl px-12 py-5 group">
                Bắt đầu ngay
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Task 8, 9: Testimonials & Footer */}
      <section id="reviews" className="py-32 bg-peach/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              {
                name: "Sarah Miller",
                pet: "Golden Retriever",
                text: "Pawsitive đúng là phép màu! Buddy nhìn như một đám mây nhỏ sau khi sử dụng gói Royal Spa.",
              },
              {
                name: "David Chen",
                pet: "Persian Cat",
                text: "Rất sạch sẽ, làm việc chuyên nghiệp và chăm bé cực kỳ có tâm. Mèo mình bình thường ghét tắm lắm mà hôm nay ngoan xỉu luôn.",
              },
              {
                name: "Emma Watson",
                pet: "Shiba Inu",
                text: "Spa thú cưng có không gian thẩm mỹ nhất mà mình từng ghé. Đội ngũ groomer đều là những người yêu thú cưng thực sự.",
              },
            ].map((item, idx) => (
              <Card key={idx} variant="white" className="relative">
                <PawPrint className="absolute top-4 right-4 text-primary/10 w-16 h-16" />
                <div className="space-y-6 relative z-10">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className="w-5 h-5 fill-secondary text-secondary"
                      />
                    ))}
                  </div>
                  <p className="text-xl text-gray-600 font-medium italic">
                    "{item.text}"
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-black/5">
                    {/* Fixed Avatar using Unsplash placeholders */}
                    <div className="w-14 h-14 bg-lavender rounded-full shadow-clay-inner overflow-hidden border-2 border-white">
                      <img
                        src={`https://ui-avatars.com/api/?name=${item.name.replace(" ", "+")}&background=E3DCFA&color=664cc3&bold=true`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-fredoka font-bold text-gray-800 text-lg">
                        {item.name}
                      </div>
                      <div className="text-sm text-primary font-bold">
                        {item.pet} Owner
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-24 bg-white border-t-8 border-cream">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-clay-sm">
                <PawPrint className="text-white w-5 h-5" />
              </div>
              <span className="font-fredoka font-bold text-2xl text-primary tracking-tight">
                Pawsitive
              </span>
            </div>
            <p className="text-gray-500 font-medium leading-relaxed">
              Chăm sóc thú cưng chuẩn cao cấp – nhẹ nhàng, tinh tế và tràn đầy
              yêu thương.
            </p>
            <div className="flex gap-4">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shadow-clay-sm cursor-pointer"
              >
                <Instagram className="text-primary w-6 h-6" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.2, rotate: -10 }}
                className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shadow-clay-sm cursor-pointer"
              >
                <Facebook className="text-primary w-6 h-6" />
              </motion.div>
            </div>
          </div>

          {[
            {
              title: "Khám Phá",
              items: ["Dịch vụ", "Hình ảnh", "Đặt lịch", "Đánh giá khách hàng"],
            },
            {
              title: "Hỗ Trợ",
              items: [
                "Trung tâm hỗ trợ",
                "Quy tắc an toàn",
                "Chính sách riêng tư",
                "Điều khoản dịch vụ",
              ],
            },
            {
              title: "Liên Hệ",
              items: [
                "Điện thoại: 0912 345 678",
                "Email: groom@pawsitive.pet",
                "Địa chỉ: 58 Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh",
                "Giờ hoạt động: 9:00 - 23:00 (Thứ 2 - Chủ nhật)",
              ],
            },
          ].map((col) => (
            <div key={col.title} className="space-y-6">
              <h4 className="font-fredoka font-bold text-xl text-gray-800">
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.items.map((link) => (
                  <li
                    key={link}
                    className="text-gray-500 font-medium hover:text-primary transition-colors cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-black/5 text-center text-gray-400 font-bold italic">
          © 2024 Pawsitive Pet Spa. Yêu thương trọn vẹn dành cho những người bạn
          thân yêu.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
