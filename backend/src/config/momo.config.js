export const momoConfig = {
    partnerCode: 'MOMOBKUN20180810',
    accessKey: 'klm056dS9pPqdUAw',
    secretKey: 'at67qH6mk8w5Y1n71tmHuLM7EA9u9K2I',
    endpoint: 'https://test-payment.momo.vn/v2/gateway/api/create',
    redirectUrl: process.env.CLIENT_URL || 'http://localhost:5173/checkout/result',
    ipnUrl: (process.env.BACKEND_URL || 'http://localhost:5001') + '/api/payments/momo-ipn',
};
