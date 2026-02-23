import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";

const CartDrawer = () => {
    const { cartItems, isCartOpen, closeCart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        closeCart();
        navigate("/checkout");
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl z-50 flex flex-col font-nunito"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="w-6 h-6 text-primary" />
                                <h2 className="text-2xl font-fredoka font-bold text-gray-800">Your Cart</h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream hover:bg-peach transition-colors text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-20 flex flex-col items-center">
                                    <div className="w-24 h-24 bg-cream rounded-full flex items-center justify-center mb-6">
                                        <ShoppingBag className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="text-xl font-bold text-gray-600">Your cart is empty</p>
                                    <p className="text-gray-400 font-semibold mt-2 mb-6">Let's find some treats for your pet!</p>
                                    <Button onClick={() => { closeCart(); navigate('/shop'); }}>Go to Shop</Button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4 p-4 rounded-xl border-2 border-cream bg-white">
                                        <img
                                            src={item.image || "https://loremflickr.com/200/200/pet,product?lock=200"}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-lg border border-black/5"
                                        />
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h4 className="font-bold text-gray-800 line-clamp-2">{item.name}</h4>
                                                <p className="text-primary font-bold mt-1">
                                                    {Number(item.price).toLocaleString("vi-VN")} đ
                                                </p>
                                            </div>

                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex items-center gap-3 bg-cream rounded-full px-2 py-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-primary transition-colors"
                                                    >
                                                        <Minus className="w-3 h-3" />
                                                    </button>
                                                    <span className="font-bold text-gray-800 text-sm w-4 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-600 hover:text-primary transition-colors"
                                                    >
                                                        <Plus className="w-3 h-3" />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-gray-500 font-bold">Subtotal</span>
                                    <span className="text-2xl font-fredoka font-bold text-gray-800">
                                        {cartTotal.toLocaleString("vi-VN")} đ
                                    </span>
                                </div>
                                <Button className="w-full py-4 text-lg" onClick={handleCheckout}>
                                    Proceed to Checkout
                                </Button>
                                <div className="text-center mt-4">
                                    <p className="text-sm font-semibold text-gray-500">Free shipping on orders over 500,000 đ</p>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;
