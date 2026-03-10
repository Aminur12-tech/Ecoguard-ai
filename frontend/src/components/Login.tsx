import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Traveller');

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/api/auth/register', {
        email, password, role
      });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/dashboard';
  } catch (error) {
    alert('Registration failed!');
  }
};

return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="bg-white p-8 rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
        EcoGuard AI v2.0
      </h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      >
        <option value="Traveller">Traveller</option>
        <option value="Vendor">Homestay Owner</option>
        <option value="Guide">Local Guide</option>
        <option value="Admin">Admin</option>
      </select>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <button
        onClick={handleRegister}
        className="w-full bg-green-600 text-white p-3 rounded-lg font-bold hover:bg-green-700"
      >
        REGISTER
      </button>
    </div>
  </div>
);
}
