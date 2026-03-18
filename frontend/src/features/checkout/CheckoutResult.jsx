import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Button from "../../components/ui/Button";
import { useCart } from "../../contexts/CartContext";

export default function CheckoutResult() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { clearCart } = useCart();
    
    const resultCode = searchParams.get("resultCode");
    const message = searchParams.get("message");
    const orderId = searchParams.get("orderId");

    const isSuccess = resultCode === "0";

    useEffect(() => {
        if (isSuccess) {
            clearCart();
        }
    }, [isSuccess, clearCart]);

    return (
        <div className="min-h-screen bg-peach/10 flex items-center justify-center p-4 font-nunito">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-xl text-center max-w-lg w-full border border-gray-100">
                {isSuccess ? (
                    <>
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <h2 className="text-3xl font-fredoka font-bold text-gray-800 mb-4">Payment Success!</h2>
                        <p className="text-gray-500 text-lg mb-8">
                            Your payment has been processed successfully. Your order <strong>#{orderId?.slice(-6)}</strong> is being prepared.
                        </p>
                    </>
                ) : (
                    <>
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <h2 className="text-3xl font-fredoka font-bold text-gray-800 mb-4">Payment Failed</h2>
                        <p className="text-gray-500 text-lg mb-8">
                            {message || "Something went wrong during the transaction. Please try again."}
                        </p>
                    </>
                )}

                <div className="space-y-3">
                    <Button 
                        className="w-full py-4 text-lg"
                        onClick={() => navigate(isSuccess ? "/my-pets" : "/checkout")}
                    >
                        {isSuccess ? "View My Orders" : "Try Again"}
                    </Button>
                    <button 
                        onClick={() => navigate("/shop")}
                        className="text-gray-400 font-bold text-sm hover:text-primary transition"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        </div>
    );
}
