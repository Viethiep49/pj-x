import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PawPrint, Scissors, Waves, Crown, Calendar,
    Star, Phone, MapPin, Instagram, Facebook,
    Heart, Sparkles, Smile, Menu, X, ArrowRight,
    ShieldCheck, Lock, CheckCircle2
} from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';

const LandingPage = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [bookingStep, setBookingStep] = useState(1);

    return (
        <div className="bg-clay-background min-h-screen font-nunito text-gray-800 overflow-hidden relative selection:bg-primary/20">
            {/* Organic Background Blobs */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                    x: [0, 50, 0]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-peach/30 rounded-full blur-[100px] -z-10"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [0, -120, 0],
                    y: [0, 100, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-lavender/30 rounded-full blur-[100px] -z-10"
            />

            {/* Bubble Navigation */}
            <nav className="fixed top-6 left-0 right-0 z-50 px-6">
    <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-clay-md border border-white/50 px-8 py-3 flex items-center justify-between"
    >
        <div className="flex items-center gap-10"> 
            <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-clay-sm group-hover:rotate-12 transition-transform">
                    <PawPrint className="text-white w-6 h-6" />
                </div>
                <span className="font-fredoka font-bold text-2xl text-primary tracking-tight">Pawsitive</span>
            </div>

            <div className="hidden lg:flex items-center gap-8">
                {['Services', 'Gallery', 'Reviews'].map((item) => (
                    <a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="font-fredoka font-bold text-gray-500 hover:text-primary transition-colors relative group"
                    >
                        {item}
                        <span className="absolute -bottom-1 left-0 w-0 h-1 bg-primary rounded-full transition-all group-hover:w-full" />
                    </a>
                ))}
            </div>
        </div>

        <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 border-l border-gray-200 pl-6">
                <Link to="/login" className="font-fredoka font-bold text-gray-500 hover:text-primary transition-colors">
                    Log In
                </Link>
                <Link to="/register">
                    <Button className="py-2.5 px-6 text-sm" variant="peach">
                        Sign Up
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <Link to="/booking">
                    <Button className="hidden sm:flex py-3 px-8 text-sm" variant="primary">
                        Book Now
                    </Button>
                </Link>
                <button
                    className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-cream shadow-clay-sm"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>
        </div>
    </motion.div>
</nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-clay-background pt-24 px-6 md:hidden"
                    >
                        <div className="grid gap-4">
                            {['Services', 'Gallery', 'Reviews'].map((item) => (
                                <Card key={item} className="text-center py-4" onClick={() => setIsMenuOpen(false)}>
                                    <span className="font-fredoka font-bold text-xl text-gray-700">{item}</span>
                                </Card>
                            ))}
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="outline" className="w-full">Log In</Button>
                                </Link>
                                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                                    <Button variant="peach" className="w-full">Sign Up</Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

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
                            We don't just groom; we pamper. Give your best friend the luxury experience they deserve in our joyful claymorphism-inspired spa.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap gap-6 justify-center lg:justify-start"
                        ><Link to="/booking">
        <Button className="text-xl px-10 py-6 group">
            Start Booking
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
        </Button>
    </Link>
    <Button variant="peach" className="text-xl px-10 py-6">
        Meet our Team
    </Button>
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
                                src="https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800"
                                alt="Main Pet"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Floating Fragment 1 */}
                        <motion.div
                            animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 left-0 w-1/2 aspect-[4/3] rounded-clay shadow-clay-md border-8 border-white z-30 overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400"
                                alt="Small Pet"
                                className="w-full h-full object-cover"
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
                                <div className="font-fredoka font-bold text-gray-800">4.9/5</div>
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
                            <div className="text-sm opacity-80 leading-tight font-bold">Safe & <br />Trusted</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Task 5: Interactive Package Picker */}
            <section id="services" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20 space-y-4">
                        <motion.h2
                            whileInView={{ scale: [0.9, 1.1, 1] }}
                            className="text-6xl font-fredoka font-bold text-gray-800"
                        >
                            Our Spa Packages
                        </motion.h2>
                        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                            Choose the perfect pampering level for your furry friend.
                            Each package comes with a personalized health check & organic treats!
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                id: 'essential',
                                title: 'Essential Glow',
                                price: '35',
                                icon: <Waves className="w-12 h-12" />,
                                desc: 'Perfect for regular maintenance. Includes bath and brush.',
                                color: 'lavender',
                                perks: ['Luxury Bath', 'Nail Filing', 'Ear Cleaning']
                            },
                            {
                                id: 'full',
                                title: 'The Full Clip',
                                price: '65',
                                icon: <Scissors className="w-12 h-12" />,
                                desc: 'Complete breed-standard haircut and styling by experts.',
                                color: 'peach',
                                recommended: true,
                                perks: ['Breed Styling', 'Sanitary Trim', 'Paw Massage']
                            },
                            {
                                id: 'royal',
                                title: 'Royal Spa',
                                price: '95',
                                icon: <Crown className="w-12 h-12" />,
                                desc: 'The ultimate luxury experience. Full treatment for royalty.',
                                color: 'cream',
                                perks: ['Teeth Cleaning', 'Organic Scent', 'De-shedding Treatment']
                            }
                        ].map((pkg) => (
                            <Card
                                key={pkg.id}
                                variant={pkg.color}
                                className={`relative cursor-pointer group ${selectedPackage?.id === pkg.id ? 'ring-4 ring-primary ring-offset-8 transition-all' : ''}`}
                                onClick={() => setSelectedPackage(pkg)}
                            >
                                {pkg.recommended && (
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full font-fredoka font-bold shadow-clay-sm text-sm whitespace-nowrap z-10">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="space-y-8 text-center">
                                    <motion.div
                                        whileHover={{ rotate: [0, -10, 10, 0] }}
                                        className="w-24 h-24 mx-auto bg-white rounded-clay shadow-clay-inner flex items-center justify-center text-primary"
                                    >
                                        {pkg.icon}
                                    </motion.div>

                                    <div>
                                        <h3 className="text-4xl font-fredoka font-bold text-gray-800 mb-2">{pkg.title}</h3>
                                        <div className="flex items-center justify-center gap-1">
                                            <span className="text-2xl font-bold text-primary mt-2">$</span>
                                            <span className="text-6xl font-fredoka font-bold text-primary">{pkg.price}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-500 font-medium leading-relaxed italic">
                                        "{pkg.desc}"
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-black/5">
                                        {pkg.perks.map((perk, i) => (
                                            <div key={i} className="flex items-center gap-3 text-gray-700 font-bold">
                                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-clay-sm">
                                                    <Smile className="w-4 h-4 text-primary" />
                                                </div>
                                                {perk}
                                            </div>
                                        ))}
                                    </div>

                                    <Button
    variant={selectedPackage?.id === pkg.id ? 'primary' : 'outline'}
    className="w-full text-lg py-5"
    onClick={() => {
        setSelectedPackage(pkg);
        navigate('/booking'); 
    }}
>
    {selectedPackage?.id === pkg.id ? 'Selected' : 'Select Plan'}
</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            {/* Task 6: Organic Draggable Gallery */}
            <section id="gallery" className="py-32 bg-white/30 relative overflow-hidden h-[900px]">
                <div className="max-w-7xl mx-auto px-6 relative z-10 pointer-events-none">
                    <div className="text-center space-y-4">
                        <h2 className="text-6xl font-fredoka font-bold text-gray-800">Happy Clients</h2>
                        <p className="text-xl text-gray-500 font-medium">
                            Drag the photos around! See the joy in our furry friends' eyes.
                        </p>
                    </div>
                </div>

                {/* Draggable Area */}
                <div className="absolute inset-0 z-0">
                    {[
                        { src: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&q=80&w=400', rotate: -5, x: '10%', y: '20%' },
                        { src: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400', rotate: 8, x: '60%', y: '15%' },
                        { src: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=400', rotate: -12, x: '20%', y: '50%' },
                        { src: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400', rotate: 5, x: '70%', y: '55%' },
                        { src: 'https://images.unsplash.com/photo-1591768793355-74d7afb3604f?auto=format&fit=crop&q=80&w=400', rotate: -3, x: '45%', y: '35%' },
                        { src: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&q=80&w=400', rotate: 10, x: '40%', y: '65%' },
                    ].map((img, idx) => (
                        <motion.div
                            key={idx}
                            drag
                            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                            dragElastic={0.9}
                            dragTransition={{ bounceStiffness: 100, bounceDamping: 10 }}
                            whileDrag={{ scale: 1.1, zIndex: 50, rotate: 0 }}
                            initial={{ x: img.x, y: img.y, rotate: img.rotate }}
                            className="absolute cursor-grab active:cursor-grabbing group p-4 bg-white rounded-clay shadow-clay-lg border-8 border-white w-64 aspect-[3/4]"
                        >
                            <img
                                src={img.src}
                                alt={`Gallery Pet ${idx}`}
                                className="w-full h-full object-cover rounded-[1rem] pointer-events-none"
                            />
                            <div className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-clay-sm opacity-0 group-hover:opacity-100 transition-opacity">
                                <Heart className="w-5 h-5 text-red-400 fill-red-400" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-blob blur-xl"
                />
                <motion.div
                    animate={{ x: [20, -20, 20], y: [20, -20, 20] }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-secondary/10 rounded-blob blur-xl"
                />
            </section>
            {/* Task 7: Step-based Booking Flow */}
            <section id="booking" className="py-32 relative">
                <div className="max-w-4xl mx-auto px-6">
                    <Card className="p-12 overflow-hidden relative">
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 right-0 h-2 bg-cream">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(bookingStep / 3) * 100}%` }}
                                className="h-full bg-primary"
                            />
                        </div>

                        <div className="space-y-12">
                            <div className="text-center space-y-4">
                                <h2 className="text-5xl font-fredoka font-bold text-gray-800 leading-tight">Book a Session</h2>
                                <div className="flex items-center justify-center gap-4">
                                    <div className="flex items-center gap-2 text-primary font-bold bg-primary/5 px-4 py-1 rounded-full text-sm">
                                        <Lock className="w-4 h-4" />
                                        SSL Secure Booking
                                    </div>
                                    <p className="text-gray-400 font-bold">Step {bookingStep} of 3</p>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                {bookingStep === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-fredoka font-bold text-center">Select your package</h3>
                                        <div className="grid gap-4">
                                            {['Essential Glow', 'The Full Clip', 'Royal Spa'].map((name) => (
                                                <div
                                                    key={name}
                                                    onClick={() => {
                                                        setSelectedPackage({ title: name });
                                                        setBookingStep(2);
                                                    }}
                                                    className={`p-6 rounded-clay border-2 cursor-pointer transition-all ${selectedPackage?.title === name ? 'border-primary bg-primary/5' : 'border-cream hover:border-peach'}`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-xl font-bold text-gray-700">{name}</span>
                                                        {selectedPackage?.title === name && <div className="w-6 h-6 bg-primary rounded-full" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {bookingStep === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-fredoka font-bold text-center">Tell us about your pet</h3>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <Input label="Pet Type" placeholder="Dog, Cat, etc." />
                                            <Input label="Pet Name" placeholder="Daisy" />
                                            <Input label="Breed" placeholder="Golden Retriever" />
                                            <Input label="Age" placeholder="2 years" />
                                        </div>
                                        <div className="flex gap-4">
                                            <Button variant="outline" className="flex-1" onClick={() => setBookingStep(1)}>Back</Button>
                                            <Button className="flex-[2]" onClick={() => setBookingStep(3)}>Next Step</Button>
                                        </div>
                                    </motion.div>
                                )}

                                {bookingStep === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-8"
                                    >
                                        <h3 className="text-3xl font-fredoka font-bold text-center">Pick a date & time</h3>
                                        <div className="grid gap-6">
                                            <Input label="Preferred Date" type="date" />
                                            <div className="grid grid-cols-3 gap-4">
                                                {['09:00', '11:00', '14:00', '16:00', '18:00'].map(t => (
                                                    <div key={t} className="p-3 text-center rounded-clay bg-cream font-bold cursor-pointer hover:bg-peach transition-colors">
                                                        {t}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <Button variant="outline" className="flex-1" onClick={() => setBookingStep(2)}>Back</Button>
                                            <Button className="flex-[2]" onClick={() => alert('Booking Confirmed! 🐾')}>Confirm Booking</Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="flex items-center justify-center gap-8 text-gray-400 text-sm font-bold pt-8 border-t border-black/5">
                                <div className="flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5" />
                                    No Payment Required
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Instant Confirmation
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            {/* Task 8, 9: Testimonials & Footer */}
            <section id="reviews" className="py-32 bg-peach/10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {[
                            { name: 'Sarah Miller', pet: 'Golden Retriever', text: 'Pawsitive logic is just magic! Buddy looks like a cloud after his Royal Spa session.' },
                            { name: 'David Chen', pet: 'Persian Cat', text: 'Clean, professional, and full of love. My cat usually hates water but he stayed so calm here.' },
                            { name: 'Emma Watson', pet: 'Shiba Inu', text: 'The most aesthetic pet spa I have ever seen. And the groomers are true pet lovers!' }
                        ].map((item, idx) => (
                            <Card key={idx} variant="white" className="relative">
                                <PawPrint className="absolute top-4 right-4 text-primary/10 w-16 h-16" />
                                <div className="space-y-6 relative z-10">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-5 h-5 fill-secondary text-secondary" />)}
                                    </div>
                                    <p className="text-xl text-gray-600 font-medium italic">"{item.text}"</p>
                                    <div className="flex items-center gap-4 pt-4 border-t border-black/5">
                                        <div className="w-14 h-14 bg-lavender rounded-full shadow-clay-inner" />
                                        <div>
                                            <div className="font-fredoka font-bold text-gray-800 text-lg">{item.name}</div>
                                            <div className="text-sm text-primary font-bold">{item.pet} Owner</div>
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
                            <span className="font-fredoka font-bold text-2xl text-primary tracking-tight">Pawsitive</span>
                        </div>
                        <p className="text-gray-500 font-medium leading-relaxed">
                            Luxury grooming experiences for your best friends. We combine style with a gentle, loving touch.
                        </p>
                        <div className="flex gap-4">
                            <motion.div whileHover={{ scale: 1.2, rotate: 10 }} className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shadow-clay-sm cursor-pointer">
                                <Instagram className="text-primary w-6 h-6" />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.2, rotate: -10 }} className="w-12 h-12 bg-cream rounded-full flex items-center justify-center shadow-clay-sm cursor-pointer">
                                <Facebook className="text-primary w-6 h-6" />
                            </motion.div>
                        </div>
                    </div>

                    {[
                        { title: 'Links', items: ['Services', 'Gallery', 'Booking', 'Reviews'] },
                        { title: 'Support', items: ['Help Center', 'Safety Rules', 'Privacy', 'Terms'] },
                        { title: 'Contact', items: ['+1 (555) PAW-SOME', 'groom@pawsitive.pet', '123 Pet St, Valley', 'Mon-Sun: 9am-6pm'] }
                    ].map((col) => (
                        <div key={col.title} className="space-y-6">
                            <h4 className="font-fredoka font-bold text-xl text-gray-800">{col.title}</h4>
                            <ul className="space-y-4">
                                {col.items.map(link => (
                                    <li key={link} className="text-gray-500 font-medium hover:text-primary transition-colors cursor-pointer">
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div className="max-w-7xl mx-auto px-6 pt-20 mt-20 border-t border-black/5 text-center text-gray-400 font-bold italic">
                    © 2024 Pawsitive Pet Spa. Pure Love for Your Best Friends.
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
