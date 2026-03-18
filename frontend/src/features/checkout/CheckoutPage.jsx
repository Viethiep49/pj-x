import React, { useState, useEffect } from "react";
import { useCart } from "../../contexts/CartContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, CheckCircle2, ChevronLeft, MapPin, X } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import Button from "../../components/ui/Button";
import api from "../../services/api";

export default function CheckoutPage() {
    const { cartItems, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    // Redirection if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !success) {
            navigate("/shop");
        }
    }, [cartItems, navigate]);

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [loading, setLoading] = useState(false);
    const [showMoMoModal, setShowMoMoModal] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    // Form states
    const [shippingDetails, setShippingDetails] = useState({
        name: user?.full_name || "",
        phone: user?.phone_number || "",
        address: "",
        notes: "",
    });

    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    });

    const SHIPPING_FEE = 30000; // 30k VND fixed testing fee
    const FINAL_TOTAL = cartTotal + SHIPPING_FEE;

    // Mock MoMo QR Data (format: momo://pay?phone=...&amount=...&note=...)
    // This is a simplified format for demo purposes
    const momoLink = `2|99|0987654321|Pawsitive Pet Spa|admin@pawsitive.com|0|0|${FINAL_TOTAL}|Demo Order ${Date.now().toString().slice(-4)}`;

    const handlePlaceOrder = async (e) => {
        if (e) e.preventDefault();
        setError("");

        // Validate shipping
        if (!shippingDetails.name || !shippingDetails.phone || !shippingDetails.address) {
            setError("Please fill in all shipping details.");
            return;
        }

        // Validate Card if selected
        if (paymentMethod === "card") {
            if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvc) {
                setError("Please fill in all card details.");
                return;
            }
        }

        // If MoMo, show the modal first
        if (paymentMethod === "momo" && !showMoMoModal) {
            setShowMoMoModal(true);
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order first
            const orderPayload = {
                items: cartItems.map(item => ({ product_id: item.id, quantity: item.quantity })),
                delivery_method: "shipping",
                shipping_address: shippingDetails.address,
                receiver_name: shippingDetails.name,
                receiver_phone: shippingDetails.phone,
                notes: shippingDetails.notes,
                payment_method: paymentMethod,
            };

            const orderRes = await api.post('/orders', orderPayload);
            const orderData = orderRes.data.data;

            if (paymentMethod === 'momo') {
                // 2. Request MoMo Payment URL
                const momoRes = await api.post('/payments/momo', {
                    orderId: orderData.id,
                    amount: FINAL_TOTAL
                });
                
                if (momoRes.data.payUrl) {
                    window.location.href = momoRes.data.payUrl; // Redirect to MoMo
                    return;
                }
            }

            // Success Flow for other methods
            setSuccess(true);
            setTimeout(() => {
                clearCart();
                navigate("/my-pets"); 
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to process payment. Please try again.");
            setLoading(false);
            setShowMoMoModal(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-peach/30 flex items-center justify-center p-4 font-nunito">
                <div className="bg-white p-12 rounded-3xl shadow-xl text-center max-w-lg w-full animate-squish">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                    <h2 className="text-3xl font-fredoka font-bold text-gray-800 mb-4">Payment Successful!</h2>
                    <p className="text-gray-500 font-nunito text-lg mb-8">
                        Your order has been placed and is being processed. Thank you for shopping at Pawsitive Pet Spa.
                    </p>
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm text-gray-400 mt-4">Redirecting to your pets...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-peach/10 pt-8 pb-20 font-nunito">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <button
                    onClick={() => navigate("/shop")}
                    className="flex items-center gap-2 text-gray-500 hover:text-primary transition font-bold mb-8"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Shop
                </button>

                <h1 className="text-4xl font-fredoka font-bold text-gray-800 mb-10">Checkout</h1>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Left Column: Form & Payment */}
                    <div className="flex-1 space-y-8">
                        {/* Shipping Details */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-orange-100 text-orange-500 rounded-xl"><MapPin className="w-5 h-5" /></div>
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-bold text-gray-600 block mb-2">Receiver Name</label>
                                    <input
                                        type="text"
                                        value={shippingDetails.name}
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, name: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/40 font-semibold text-gray-700"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-bold text-gray-600 block mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={shippingDetails.phone}
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, phone: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/40 font-semibold text-gray-700"
                                        placeholder="0123 456 789"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-bold text-gray-600 block mb-2">Delivery Address</label>
                                    <input
                                        type="text"
                                        value={shippingDetails.address}
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/40 font-semibold text-gray-700"
                                        placeholder="123 Puppy Lane, District 1, HCMC"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="text-sm font-bold text-gray-600 block mb-2">Order Notes (Optional)</label>
                                    <textarea
                                        value={shippingDetails.notes}
                                        onChange={(e) => setShippingDetails({ ...shippingDetails, notes: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-primary/40 font-semibold text-gray-700 h-24 resize-none"
                                        placeholder="Leave it at the door..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-500 rounded-xl"><CreditCard className="w-5 h-5" /></div>
                                Payment Method
                            </h2>

                            <div className="space-y-4">
                                {/* Option: Card */}
                                <label className={`block p-4 rounded-xl border-2 transition cursor-pointer ${paymentMethod === 'card' ? 'border-primary bg-orange-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="payment"
                                                checked={paymentMethod === 'card'}
                                                onChange={() => setPaymentMethod('card')}
                                                className="w-5 h-5 text-primary accent-primary"
                                            />
                                            <span className="font-bold text-gray-700">Credit / Debit Card</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-500">VISA</div>
                                            <div className="px-2 py-1 bg-gray-100 rounded text-xs font-bold text-gray-500">MASTER</div>
                                        </div>
                                    </div>

                                    {/* Card Form */}
                                    {paymentMethod === 'card' && (
                                        <div className="mt-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={cardDetails.number}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                                                    placeholder="Card number"
                                                    className="w-full p-4 pl-12 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-gray-700 shadow-sm"
                                                    maxLength={19}
                                                />
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <input
                                                    type="text"
                                                    value={cardDetails.expiry}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                                                    placeholder="MM / YY"
                                                    className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-gray-700 shadow-sm"
                                                    maxLength={5}
                                                />
                                                <input
                                                    type="text"
                                                    value={cardDetails.cvc}
                                                    onChange={(e) => setCardDetails({ ...cardDetails, cvc: e.target.value })}
                                                    placeholder="CVC"
                                                    className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-gray-700 shadow-sm"
                                                    maxLength={4}
                                                />
                                            </div>
                                            <input
                                                type="text"
                                                value={cardDetails.name}
                                                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                                                placeholder="Name on card"
                                                className="w-full p-4 rounded-xl bg-white border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent font-semibold text-gray-700 shadow-sm uppercase tracking-wide"
                                            />
                                        </div>
                                    )}
                                </label>

                                {/* Option: PayPal */}
                                <label className={`block p-4 rounded-xl border-2 transition cursor-pointer ${paymentMethod === 'paypal' ? 'border-[#0070ba] bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={() => setPaymentMethod('paypal')}
                                            className="w-5 h-5 text-[#0070ba] accent-[#0070ba]"
                                        />
                                        <span className="font-bold text-[#0070ba] italic tracking-tight text-xl">PayPal</span>
                                    </div>
                                    {paymentMethod === 'paypal' && (
                                        <div className="mt-6 text-center animate-in fade-in slide-in-from-top-4 p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                            <p className="text-gray-500 font-semibold mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
                                        </div>
                                    )}
                                </label>

                                {/* Option: MoMo */}
                                <label className={`block p-4 rounded-xl border-2 transition cursor-pointer ${paymentMethod === 'momo' ? 'border-[#a50064] bg-pink-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === 'momo'}
                                            onChange={() => setPaymentMethod('momo')}
                                            className="w-5 h-5 text-[#a50064] accent-[#a50064]"
                                        />
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-[#a50064] rounded flex items-center justify-center text-white font-bold text-xs">M</div>
                                            <span className="font-bold text-[#a50064]">MoMo Wallet</span>
                                        </div>
                                    </div>
                                    {paymentMethod === 'momo' && (
                                        <div className="mt-6 flex flex-col items-center animate-in fade-in slide-in-from-top-4 p-6 bg-white rounded-xl border border-gray-100 shadow-inner">
                                            <div className="p-4 bg-gray-50 rounded-2xl mb-4 border border-gray-100">
                                                <QRCodeSVG value={momoLink} size={160} />
                                            </div>
                                            <p className="text-gray-500 font-bold text-sm text-center">Scan QR code using MoMo app <br/> to pay <span className="text-[#a50064]">{FINAL_TOTAL.toLocaleString("vi-VN")}đ</span></p>
                                        </div>
                                    )}
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="w-full lg:w-[400px]">
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h3>

                            {/* Cart Items List */}
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex items-center gap-4">
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg border border-gray-100" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                                            <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-bold text-primary text-sm whitespace-nowrap">
                                            {(Number(item.price) * item.quantity).toLocaleString("vi-VN")} đ
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-6 space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600 font-semibold text-sm">
                                    <span>Subtotal</span>
                                    <span>{cartTotal.toLocaleString("vi-VN")} đ</span>
                                </div>
                                <div className="flex justify-between text-gray-600 font-semibold text-sm">
                                    <span>Shipping Estimate</span>
                                    <span>{SHIPPING_FEE.toLocaleString("vi-VN")} đ</span>
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-6 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-800">Total</span>
                                    <span className="text-3xl font-fredoka font-bold text-primary">
                                        {FINAL_TOTAL.toLocaleString("vi-VN")} đ
                                    </span>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm font-bold text-center mb-4">{error}</p>}

                            <Button
                                className="w-full py-4 text-lg shadow-clay-puffy relative overflow-hidden group"
                                onClick={handlePlaceOrder}
                                disabled={loading}
                            >
                                <div className={`absolute inset-0 bg-white/20 transition-transform duration-500 ${loading ? 'translate-y-0' : 'translate-y-full'}`}></div>
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing...
                                    </span>
                                ) : (
                                    <span>
                                        {paymentMethod === 'card' && "Pay Now"}
                                        {paymentMethod === 'paypal' && "Continue to PayPal"}
                                        {paymentMethod === 'momo' && "Confirm Payment"}
                                    </span>
                                )}
                            </Button>
                            <p className="text-xs text-center text-gray-400 mt-4 font-semibold flex items-center justify-center gap-1">
                                <CreditCard className="w-3 h-3" /> Secure, encrypted transaction.
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* MoMo Payment Modal (For Demo) */}
            {showMoMoModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                        {/* Header */}
                        <div className="bg-[#a50064] p-6 text-white text-center relative">
                            <button 
                                onClick={() => setShowMoMoModal(false)}
                                className="absolute right-4 top-4 p-1 hover:bg-white/20 rounded-full transition"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <div className="text-[#a50064] font-black text-2xl">M</div>
                            </div>
                            <h3 className="text-xl font-fredoka font-bold">MoMo Payment</h3>
                            <p className="opacity-80 text-sm">Pawsitive Pet Spa</p>
                        </div>

                        {/* Body */}
                        <div className="p-8 flex flex-col items-center">
                            <div className="bg-gray-50 p-6 rounded-3xl mb-6 shadow-inner border border-gray-100">
                                <QRCodeSVG value={momoLink} size={220} includeMargin={true} level="H" />
                            </div>
                            
                            <div className="text-center space-y-2 mb-8">
                                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Amount to Pay</p>
                                <p className="text-4xl font-fredoka font-bold text-[#a50064]">{FINAL_TOTAL.toLocaleString("vi-VN")}đ</p>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-2xl text-blue-700 text-sm font-semibold">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                    Waiting for transaction confirmation...
                                </div>
                                
                                <Button 
                                    className="w-full py-4 bg-[#a50064] hover:bg-[#850052] border-none"
                                    onClick={() => handlePlaceOrder()} // Finalize order
                                    disabled={loading}
                                >
                                    {loading ? "Verifying..." : "Confirm I've Paid"}
                                </Button>
                            </div>
                        </div>
                        
                        {/* Footer */}
                        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">Momo Sandbox Testing Environment</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
