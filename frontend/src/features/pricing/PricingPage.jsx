import React from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const PricingPage = () => {
    const plans = [
        {
            name: 'Starter',
            price: '$0',
            desc: 'Perfect for side projects',
            features: ['Up to 1,000 users', 'Basic Analytics', 'Community Support'],
            cta: 'Start for Free',
            variant: 'secondary'
        },
        {
            name: 'Pro',
            price: '$29',
            desc: 'For growing teams',
            features: ['Unlimited users', 'Advanced Analytics', 'Priority Support', 'Custom Domain'],
            cta: 'Get Started',
            variant: 'primary',
            popular: true
        },
        {
            name: 'Enterprise',
            price: 'Contact',
            desc: 'For large organizations',
            features: ['SSO Integration', 'Audit Logs', 'Dedicated Manager', 'SLA'],
            cta: 'Contact Sales',
            variant: 'outline'
        }
    ];

    return (
        <div className="py-20 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Simple, transparent pricing</h1>
                <p className="text-xl text-gray-600">No hidden fees. Cancel at any time.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {plans.map((plan, idx) => (
                    <Card key={idx} className={`relative flex flex-col ${plan.popular ? 'border-blue-500 ring-2 ring-blue-500 ring-offset-2' : ''}`}>
                        {plan.popular && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                                Most Popular
                            </div>
                        )}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-500 uppercase tracking-wider mb-2">{plan.name}</h3>
                            <div className="text-4xl font-extrabold text-gray-900 mb-2">{plan.price}<span className="text-lg font-normal text-gray-500">/mo</span></div>
                            <p className="text-gray-600">{plan.desc}</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-grow">
                            {plan.features.map((feat, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-700">
                                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feat}
                                </li>
                            ))}
                        </ul>

                        <Button variant={plan.variant} className="w-full">{plan.cta}</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default PricingPage;
