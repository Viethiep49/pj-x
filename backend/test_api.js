import axios from 'axios';

const API_URL = 'http://localhost:5001';

async function runTests() {
    console.log('🚀 Starting API Integration Tests...\n');

    try {
        // 1. Health Check
        const health = await axios.get(`${API_URL}/health`);
        console.log('✅ Health Check:', health.data.message);

        // 2. Services List
        const services = await axios.get(`${API_URL}/api/services`);
        console.log(`✅ Services: Found ${services.data.data?.length || 0} services`);

        // 3. Products List
        const products = await axios.get(`${API_URL}/api/products`);
        console.log(`✅ Products: Found ${products.data.data?.length || 0} products`);

        // 4. Test Auth (Registration)
        const testEmail = `test_${Date.now()}@example.com`;
        try {
            const register = await axios.post(`${API_URL}/api/auth/register`, {
                email: testEmail,
                password: 'password123',
                full_name: 'Test User'
            });
            console.log('✅ Auth Register: Success');
            
            // 5. Test Auth (Login)
            const login = await axios.post(`${API_URL}/api/auth/login`, {
                email: testEmail,
                password: 'password123'
            });
            console.log('✅ Auth Login: Success');
            const token = login.data.token;

            // 6. Test Protected Route (Get Me)
            const me = await axios.get(`${API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Protected Route (/me): Success');

        } catch (authError) {
            console.error('❌ Auth Tests Failed:', authError.response?.data?.message || authError.message);
        }

        console.log('\n✨ All tests completed!');
    } catch (error) {
        console.error('❌ Test Suite Crashed:', error.message);
        if (error.code === 'ECONNREFUSED') {
            console.error('👉 Make sure the backend server is running on http://localhost:5001');
        }
    }
}

runTests();
