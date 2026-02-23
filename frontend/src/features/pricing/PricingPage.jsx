import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Waves, Scissors, Crown, Smile, Loader } from 'lucide-react'
import Card from '../../components/ui/Card'
import Button from '../../components/ui/Button'
import api from '../../services/api'

const PricingPage = () => {
    const navigate = useNavigate()
    const [selectedPackage, setSelectedPackage] = useState(null)
    const [services, setServices] = useState([])
    const [loading, setLoading] = useState(true)

    // Icons map based on index or name
    const ICONS = [
        <Waves className="w-12 h-12" />,
        <Scissors className="w-12 h-12" />,
        <Crown className="w-12 h-12" />
    ]

    const COLORS = ['lavender', 'peach', 'cream']

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await api.get('/services')
                setServices(res.data.data)
            } catch (error) {
                console.error("Lỗi khi tải dịch vụ:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchServices()
    }, [])

    return (
        <section className="py-32 px-6 bg-clay-background min-h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <h1 className="text-6xl font-fredoka font-bold text-gray-800">
                        Bảng Giá Dịch Vụ
                    </h1>
                    <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
                        Chọn gói dịch vụ hoàn hảo để chăm sóc thú cưng của bạn.
                        Mỗi gói đều đi kèm kiểm tra sức khỏe và quà tặng hấp dẫn!
                    </p>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader className="w-12 h-12 text-primary animate-spin" />
                        <p className="mt-4 text-gray-500 font-bold">Đang tải bảng giá...</p>
                    </div>
                ) : services.length === 0 ? (
                    <div className="text-center py-20 text-gray-500 font-bold text-xl">
                        Hiện chưa có dịch vụ nào.
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-12 pt-8">
                        {services.map((pkg, index) => {
                            const icon = ICONS[index % ICONS.length]
                            const color = COLORS[index % COLORS.length]
                            const isRecommended = index === 1 // Mock recommendation for the second item
                            const perks = pkg.description ? pkg.description.split('.').filter(p => p.trim()) : ['Tắm gội', 'Cắt tỉa', 'Kiểm tra sức khỏe']

                            return (
                                <Card
                                    key={pkg.id}
                                    variant={color}
                                    className={`relative cursor-pointer group flex flex-col h-full ${selectedPackage?.id === pkg.id
                                        ? 'ring-4 ring-primary ring-offset-8 transition-all'
                                        : ''
                                        }`}
                                    onClick={() => setSelectedPackage(pkg)}
                                >
                                    {isRecommended && (
                                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 rounded-full font-fredoka font-bold shadow-md text-sm whitespace-nowrap z-10">
                                            PHỔ BIẾN NHẤT
                                        </div>
                                    )}

                                    <div className="space-y-8 text-center flex-1 flex flex-col">
                                        <div className="w-24 h-24 mx-auto bg-white rounded-full shadow-inner flex items-center justify-center text-primary">
                                            {icon}
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-fredoka font-bold text-gray-800 mb-2 line-clamp-2 px-2" title={pkg.name}>
                                                {pkg.name}
                                            </h3>

                                            <div className="flex items-center justify-center gap-1 mt-4">
                                                <span className="text-4xl font-fredoka font-bold text-primary">
                                                    {Number(pkg.price).toLocaleString('vi-VN')}
                                                </span>
                                                <span className="text-xl font-bold text-primary mt-2 flex-shrink-0">₫</span>
                                            </div>
                                            {pkg.duration_minutes && (
                                                <p className="text-sm text-gray-500 font-bold mt-2">
                                                    (Thời gian: {pkg.duration_minutes} phút)
                                                </p>
                                            )}
                                        </div>



                                        <div className="space-y-3 pt-4 border-t border-black/5 text-left">
                                            {perks.map((perk, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-3 text-gray-700 font-bold"
                                                >
                                                    <Smile className="w-5 h-5 text-primary flex-shrink-0" />
                                                    <span className="text-sm">{perk.trim()}</span>
                                                </div>
                                            ))}
                                        </div>

                                    </div>
                                    <div className="mt-8 pt-4">
                                        <Button
                                            variant={
                                                selectedPackage?.id === pkg.id
                                                    ? 'primary'
                                                    : 'outline'
                                            }
                                            className="w-full text-lg py-4"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setSelectedPackage(pkg)
                                                // Redirect to booking with selected service
                                                navigate('/booking') // Adjust query param if needed
                                            }}
                                        >
                                            {selectedPackage?.id === pkg.id
                                                ? 'Đã Chọn'
                                                : 'Chọn Gói Này'}
                                        </Button>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    )
}

export default PricingPage