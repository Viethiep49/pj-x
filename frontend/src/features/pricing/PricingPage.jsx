import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Waves, Scissors, Crown, Smile } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'

const PricingPage = () => {
    const navigate = useNavigate()
    const [selectedPackage, setSelectedPackage] = useState(null)

    const packages = [
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
    ]

    return (
        <section className="py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h1 className="text-6xl font-fredoka font-bold text-gray-800">
                        Our Spa Packages
                    </h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        Choose the perfect pampering level for your furry friend.
                        Each package comes with a personalized health check & organic treats!
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {packages.map((pkg) => (
                        <Card
                            key={pkg.id}
                            variant={pkg.color}
                            className={`relative cursor-pointer group ${
                                selectedPackage?.id === pkg.id
                                    ? 'ring-4 ring-primary ring-offset-8 transition-all'
                                    : ''
                            }`}
                            onClick={() => setSelectedPackage(pkg)}
                        >
                            {pkg.recommended && (
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full font-fredoka font-bold shadow-md text-sm whitespace-nowrap z-10">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="space-y-8 text-center">
                                <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-inner flex items-center justify-center text-primary">
                                    {pkg.icon}
                                </div>

                                <div>
                                    <h3 className="text-4xl font-fredoka font-bold text-gray-800 mb-2">
                                        {pkg.title}
                                    </h3>

                                    <div className="flex items-center justify-center gap-1">
                                        <span className="text-2xl font-bold text-primary mt-2">$</span>
                                        <span className="text-6xl font-fredoka font-bold text-primary">
                                            {pkg.price}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-500 font-medium leading-relaxed italic">
                                    "{pkg.desc}"
                                </p>

                                <div className="space-y-3 pt-4 border-t border-black/5">
                                    {pkg.perks.map((perk, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 text-gray-700 font-bold"
                                        >
                                            <Smile className="w-5 h-5 text-primary" />
                                            {perk}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant={
                                        selectedPackage?.id === pkg.id
                                            ? 'primary'
                                            : 'outline'
                                    }
                                    className="w-full text-lg py-5"
                                    onClick={() => {
                                        setSelectedPackage(pkg)
                                        navigate('/booking')
                                    }}
                                >
                                    {selectedPackage?.id === pkg.id
                                        ? 'Selected'
                                        : 'Select Plan'}
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PricingPage