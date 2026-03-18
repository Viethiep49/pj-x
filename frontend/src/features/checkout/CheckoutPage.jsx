import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, CheckCircle2, ChevronLeft, MapPin, X, ReceiptText } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Button from "../../components/ui/Button";
import api from "../../services/api";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [paymentMethod, setPaymentMethod] = useState("momo"); // Default to MoMo for demo
    const [loading, setLoading] = useState(false);
    const [showMoMoModal, setShowMoMoModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const [error, setError] = useState("");

    // Official MoMo Logo
    const momoLogo = "https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-MoMo-Square.png";

    // Image helper synced with ShopPage.jsx logic
    const getProductImage = (item) => {
        return item.image_url || item.image || "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80";
    };

    useEffect(() => {
        if (cartItems.length === 0 && !success) {
            navigate("/shop");
        }
    }, [cartItems, navigate, success]);

    const [shippingDetails, setShippingDetails] = useState({
        name: user?.full_name || "Hiep Truong",
        phone: user?.phone_number || "0987654321",
        address: "123 Puppy Lane, District 1, HCMC",
        notes: "Giao giờ hành chính",
    });

    const SHIPPING_FEE = 30000;
    const FINAL_TOTAL = cartTotal + SHIPPING_FEE;

    // QR Data for MoMo
    const qrValue = `2|99|0987654321|Pawsitive Store|demo@pawsitive.com|0|0|${FINAL_TOTAL}|ORDER_${Date.now()}`;

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();
        setError("");

        if (!shippingDetails.name || !shippingDetails.phone || !shippingDetails.address) {
            setError("Please fill in all shipping details.");
            return;
        }

        // Trigger MoMo Modal
        if (paymentMethod === "momo" && !showMoMoModal) {
            setShowMoMoModal(true);
            return;
        }

        setLoading(true);

        try {
            // Simulated local process for demo
            const payload = {
                items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
                delivery_method: "shipping",
                shipping_address: shippingDetails.address,
                receiver_name: shippingDetails.name,
                receiver_phone: shippingDetails.phone,
                notes: shippingDetails.notes,
                payment_method: paymentMethod
            };

            const res = await api.post('/orders', payload);
            setOrderData(res.data.data);
            
            // Artificial delay for "processing" feel
            await new Promise(r => setTimeout(r, 1500));

            setSuccess(true);
            setShowMoMoModal(false);
            clearCart();
        } catch (err) {
            setError("Demo order failed. Please check backend connection.");
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-peach/10 pt-12 pb-20 font-nunito flex items-center justify-center p-4">
                <div className="bg-white rounded-[3rem] shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-500 border border-gray-100">
                    <div className="bg-green-500 p-8 text-white text-center">
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
                            <CheckCircle2 className="w-10 h-10" />
                        </div>
                        <h2 className="text-3xl font-fredoka font-bold">Payment Successful!</h2>
                        <p className="opacity-90 font-semibold">Thank you for your trust!</p>
                    </div>
                    
                    <div className="p-10">
                        <div className="flex items-center gap-2 text-gray-400 font-bold uppercase text-xs tracking-widest mb-6">
                            <ReceiptText className="w-4 h-4" /> Order Invoice
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-bold">Order Number</span>
                                <span className="text-gray-800 font-black">#{orderData?.order_number || "ORD12345"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 font-bold">Date</span>
                                <span className="text-gray-800 font-bold">{new Date().toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex justify-between border-t border-dashed border-gray-200 pt-4">
                                <span className="text-gray-500 font-bold">Total Paid</span>
                                <span className="text-2xl font-black text-primary">{FINAL_TOTAL.toLocaleString()} đ</span>
                            </div>
                        </div>

                        <Button className="w-full py-4 text-lg shadow-clay-puffy" onClick={() => navigate("/my-pets")}>
                            Manage My Pets
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-peach/10 pt-8 pb-20 font-nunito">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <button onClick={() => navigate("/shop")} className="flex items-center gap-2 text-gray-500 hover:text-primary transition font-bold mb-8">
                    <ChevronLeft className="w-5 h-5" /> Back to Shop
                </button>

                <h1 className="text-4xl font-fredoka font-bold text-gray-800 mb-10">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-10">
                    <div className="flex-1 space-y-8">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-orange-100 text-orange-500 rounded-xl"><MapPin className="w-5 h-5" /></div>
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                <input type="text" value={shippingDetails.name} onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border-none font-bold" placeholder="Receiver Name" />
                                <input type="tel" value={shippingDetails.phone} onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border-none font-bold" placeholder="Phone" />
                                <div className="md:col-span-2">
                                    <input type="text" value={shippingDetails.address} onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })} className="w-full p-3 rounded-xl bg-gray-50 border-none font-bold" placeholder="Address" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-500 rounded-xl"><CreditCard className="w-5 h-5" /></div>
                                Payment Method
                            </h2>
                            <div className="space-y-4">
                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'momo' ? 'border-[#a50064] bg-pink-50/30' : 'border-gray-50'}`} onClick={() => setPaymentMethod('momo')}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'momo' ? 'border-[#a50064]' : 'border-gray-300'}`}>
                                            {paymentMethod === 'momo' && <div className="w-2.5 h-2.5 bg-[#a50064] rounded-full"></div>}
                                        </div>
                                        <img src={momoLogo} alt="MoMo" className="w-8 h-8 object-contain rounded-lg" />
                                        <span className="font-black text-gray-700">MoMo Wallet</span>
                                    </div>
                                    <span className="px-2 py-1 bg-[#a50064] text-white rounded text-[10px] font-bold">DEMO</span>
                                </label>

                                <label className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${paymentMethod === 'card' ? 'border-primary bg-orange-50/30' : 'border-gray-50'}`} onClick={() => setPaymentMethod('card')}>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'card' ? 'border-primary' : 'border-gray-300'}`}>
                                            {paymentMethod === 'card' && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                                        </div>
                                        <CreditCard className="w-8 h-8 text-blue-500" />
                                        <span className="font-black text-gray-700">Credit Card</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wider">Order Summary</h3>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 border border-gray-100">
                                            <img 
                                                src={getProductImage(item)} 
                                                alt={item.name} 
                                                className="w-full h-full object-cover" 
                                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&q=80" }}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-gray-800 text-sm truncate">{item.name}</h4>
                                            <p className="text-gray-400 text-xs font-bold mt-1">x{item.quantity}</p>
                                        </div>
                                        <p className="font-black text-gray-700 text-sm">
                                            {(item.price * item.quantity).toLocaleString()} đ
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-dashed border-gray-100 pt-6 space-y-3 mb-6 font-bold text-sm">
                                <div className="flex justify-between text-gray-400"><span>Subtotal</span><span>{cartTotal.toLocaleString()} đ</span></div>
                                <div className="flex justify-between text-gray-400"><span>Shipping</span><span>30,000 đ</span></div>
                                <div className="flex justify-between text-gray-800 text-xl border-t border-gray-100 pt-4 font-black">
                                    <span>Total</span>
                                    <span className="text-primary">{FINAL_TOTAL.toLocaleString()} đ</span>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-xs font-bold mb-4">{error}</p>}

                            <Button 
                                className={`w-full py-4 text-lg font-black transition-all ${paymentMethod === 'momo' ? 'bg-[#a50064] hover:bg-[#850052] border-none text-white' : ''}`}
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                {loading ? "Processing..." : paymentMethod === 'momo' ? "Confirm & Pay" : "Place Order"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MoMo QR Modal (Demo) */}
            {showMoMoModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[100] flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-[3rem] w-full max-w-md overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
                        <div className="bg-[#a50064] p-8 text-white text-center relative">
                            <button onClick={() => setShowMoMoModal(false)} className="absolute right-6 top-6 p-2 hover:bg-white/20 rounded-full transition"><X /></button>
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-black/10">
                                <img src={momoLogo} alt="MoMo" className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-fredoka font-bold">Thanh toán MoMo</h3>
                            <p className="opacity-80 font-semibold tracking-wide">Pawsitive Pet Spa</p>
                        </div>

                        <div className="p-10 flex flex-col items-center">
                            <div className="bg-gray-50 p-6 rounded-[2.5rem] mb-8 border-4 border-gray-50 shadow-inner">
                                <QRCodeSVG value={qrValue} size={220} level="H" includeMargin={true} />
                            </div>
                            
                            <div className="text-center mb-8">
                                <p className="text-gray-400 font-black uppercase text-xs tracking-[0.2em] mb-2">Số tiền cần trả</p>
                                <p className="text-4xl font-black text-[#a50064] tracking-tight">{FINAL_TOTAL.toLocaleString()}đ</p>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-center gap-3 p-4 bg-pink-50 rounded-2xl text-[#a50064] text-sm font-black">
                                    <div className="w-2 h-2 bg-[#a50064] rounded-full animate-ping"></div>
                                    Đang chờ bạn quét mã...
                                </div>
                                <Button 
                                    className="w-full py-5 bg-[#a50064] hover:bg-[#850052] border-none text-xl font-black rounded-2xl shadow-lg text-white"
                                    onClick={() => handlePlaceOrder()} 
                                    disabled={loading}
                                >
                                    {loading ? "Đang xác nhận..." : "Tôi đã thanh toán xong"}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
