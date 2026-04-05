import axios from 'axios';

const API_URL = 'http://localhost:5001';

async function run() {
    try {
        const email = `petuser_${Date.now()}@test.com`;
        await axios.post(`${API_URL}/api/auth/register`, { email, password: 'password123', full_name: 'Pet Owner' });
        const loginRes = await axios.post(`${API_URL}/api/auth/login`, { email, password: 'password123' });
        const token = loginRes.data.token;
        const headers = { Authorization: `Bearer ${token}` };

        console.log('User created and logged in.');

        await axios.post(`${API_URL}/api/pets`, {
            name: 'Pet 1', species: 'dog', gender: 'male', breed: 'cho co',
        }, { headers });
        console.log('Added 1st pet.');

        let petsRes = await axios.get(`${API_URL}/api/pets`, { headers });
        console.log('GET /pets returned:', petsRes.data.data.length, 'pets.');

        await axios.post(`${API_URL}/api/pets`, {
            name: 'Pet 2', species: 'cat', gender: 'female', breed: 'meo ta',
        }, { headers });
        console.log('Added 2nd pet.');

        petsRes = await axios.get(`${API_URL}/api/pets`, { headers });
        console.log('GET /pets returned:', petsRes.data.data.length, 'pets.');

    } catch (err) {
        if (err.response) {
            console.error('API Error:', err.response.data);
        } else {
            console.error('Error:', err.message);
        }
    }
}
run();
