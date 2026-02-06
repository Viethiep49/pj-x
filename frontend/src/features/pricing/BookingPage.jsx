import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const BookingPage = () => {
    const [step, setStep] = useState(1);


    const products = [
        { id: 1, name: 'Premium Puppy Food', price: '$25', tag: 'Seeds/Food' },
        { id: 2, name: 'Soft Pet Brush', price: '$12', tag: 'Pet brush' },
        { id: 3, name: 'Luxury Pet Crate', price: '$120', tag: 'Pet cage' },
    ];

    return (
        <div className="min-h-screen bg-clay-background p-6 font-nunito">
            <h1 className="font-fredoka text-4xl text-primary text-center mb-10 uppercase tracking-wider">Book a Session</h1>
            
            <div className="max-w-6xl mx-auto">
                {step === 1 && (
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card variant="white" className="text-center flex flex-col justify-between">
                                <div>
                                    <h3 className="font-fredoka text-2xl mb-4 text-primary">Essential Glow</h3>
                                    <p className="mb-6 text-gray-600">Basic grooming for small pets.</p>
                                </div>
                                <Button variant="primary" className="w-full" onClick={() => setStep(2)}>Choose</Button>
                            </Card>
                            
                            <Card variant="peach" className="text-center border-2 border-primary/20 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-fredoka text-2xl mb-4 text-primary-dark">Royal Spa</h3>
                                    <p className="mb-6 text-primary-dark/70">Full treatment for your best friend.</p>
                                </div>
                                <Button variant="peach" className="w-full" onClick={() => setStep(2)}>Choose</Button>
                            </Card>

                            <Card variant="white" className="text-center flex flex-col justify-between">
                                <div>
                                    <h3 className="font-fredoka text-2xl mb-4 text-secondary">The Full Clip</h3>
                                    <p className="mb-6 text-gray-600">Complete stylized haircut & de-shedding.</p>
                                </div>
                                <Button variant="outline" className="w-full" onClick={() => setStep(2)}>Choose</Button>
                            </Card>

                            <Card variant="white" className="text-center flex flex-col justify-between">
                                <div>
                                    <h3 className="font-fredoka text-2xl mb-4 text-sunOrange">Medicated Bath</h3>
                                    <p className="mb-6 text-gray-600">Anti-flea & skin treatment bath.</p>
                                </div>
                                <Button variant="outline" className="w-full border-sunOrange text-sunOrange" onClick={() => setStep(2)}>Choose</Button>
                            </Card>
                        </div>

                        <div className="mt-20">
                            <h2 className="font-fredoka text-3xl text-center mb-8 text-primary">Pet Essentials Shop 🦴</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {products.map(product => (
                                    <Card key={product.id} className="group hover:translate-y-[-8px] transition-all">
                                        <div className="w-full aspect-square bg-cream rounded-clay mb-4 flex items-center justify-center text-5xl shadow-clay-inner">
                                            {product.id === 1 ? '🍖' : product.id === 2 ? '🪮' : '🏠'}
                                        </div>
                                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-1 rounded-full uppercase tracking-tighter">
                                            {product.tag}
                                        </span>
                                        <h4 className="font-fredoka text-xl mt-2">{product.name}</h4>
                                        <p className="text-2xl font-bold text-gray-700 mt-1">{product.price}</p>
                                        <Button variant="primary" className="w-full mt-4 py-2 text-sm">Add to Cart</Button>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <Card className="max-w-md mx-auto animate-float">
                        <h2 className="font-fredoka text-2xl mb-6 text-center text-primary">Pet Details</h2>
                        <div className="space-y-4 mb-8">
                            <Input label="Pet Name" placeholder="e.g. Buddy" />
                            <Input label="Pet Breed" placeholder="e.g. Golden Retriever" />
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="w-full" onClick={() => setStep(1)}>Back</Button>
                            <Button variant="primary" className="w-full" onClick={() => setStep(3)}>Next</Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default BookingPage;