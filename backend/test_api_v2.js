import axios from 'axios';

const API_URL = 'http://localhost:5001';

async function runTests() {
    console.log('🚀 Starting Comprehensive API Tests (v2)...\n');

    const headers = {};
    let testUserToken = '';
    let firstProductId = '';
    let createdOrderId = '';

    try {
        // 1. Health Check
        const health = await axios.get(`${API_URL}/health`);
        console.log('✅ Health Check:', health.data.message);

        // 2. Services List
        const services = await axios.get(`${API_URL}/api/services`);
        console.log(`✅ GET /services: Found ${services.data.data?.length || 0} services`);

        // 3. Products List
        const products = await axios.get(`${API_URL}/api/products`);
        if (products.data.data?.length > 0) {
            firstProductId = products.data.data[0].id;
            console.log(`✅ GET /products: Found ${products.data.data.length} products (Test with ID: ${firstProductId})`);
        } else {
            console.log('⚠️  GET /products: No products found. Creating order will fail.');
        }

        // 4. Test Auth (Registration & Login)
        const testEmail = `test_v2_${Date.now()}@example.com`;
        const register = await axios.post(`${API_URL}/api/auth/register`, {
            email: testEmail,
            password: 'password123',
            full_name: 'Test V2 User'
        });
        console.log('✅ POST /auth/register: Success');
        
        const login = await axios.post(`${API_URL}/api/auth/login`, {
            email: testEmail,
            password: 'password123'
        });
        testUserToken = login.data.token;
        headers.Authorization = `Bearer ${testUserToken}`;
        console.log('✅ POST /auth/login: Success (Token received)');

        // 5. Create Order
        if (firstProductId) {
            const orderPayload = {
                items: [{ product_id: firstProductId, quantity: 1 }],
                delivery_method: 'shipping',
                shipping_address: '123 Test St, HCMC',
                receiver_name: 'Test V2 User',
                receiver_phone: '0987654321',
                payment_method: 'momo'
            };
            const orderRes = await axios.post(`${API_URL}/api/orders`, orderPayload, { headers });
            createdOrderId = orderRes.data.data.id;
            console.log(`✅ POST /orders: Success (Order ID: ${createdOrderId})`);

            // 6. Test MoMo Payment URL Generation
            try {
                const momoRes = await axios.post(`${API_URL}/api/payments/momo`, {
                    orderId: createdOrderId,
                    amount: orderRes.data.data.total_amount
                }, { headers });
                
                if (momoRes.data.payUrl) {
                    console.log('✅ POST /payments/momo: Success (payUrl generated)');
                    // console.log('   🔗 Pay URL:', momoRes.data.payUrl);
                } else {
                    console.error('❌ POST /payments/momo: Failed (No payUrl in response)');
                }
            } catch (momoError) {
                console.error('❌ POST /payments/momo: Failed');
                if (momoError.response) {
                    console.error('   Error Data:', JSON.stringify(momoError.response.data, null, 2));
                } else {
                    console.error('   Message:', momoError.message);
                }
            }
        }

        // 7. Get My Orders
        const myOrders = await axios.get(`${API_URL}/api/orders`, { headers });
        console.log(`✅ GET /orders (My Orders): Found ${myOrders.data.data?.length || 0} orders`);

        console.log('\n✨ All critical API paths tested successfully!');
    } catch (error) {
        console.error('\n❌ Test Failed:');
        if (error.response) {
            console.error(`   Status: ${error.response.status}`);
            console.error('   Data:', error.response.data);
        } else {
            console.error(`   Message: ${error.message}`);
        }
    }
}

runTests();
