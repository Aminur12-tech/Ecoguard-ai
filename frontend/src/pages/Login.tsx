import React, { useState } from "react";
import axios from "axios";


export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [Loading, setloading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setloading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            console.log('Success: ', res.data);
            localStorage.setItem('token', res.data.token);
            alert(`✅ Welcome back ${formData.email}!`);
            window.location.href = '/dashboard';
        } catch (error: any) {
            console.log('Error: ', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Login failed!');
        } finally {
            setloading(false);
        }
    };


    const handleRegister = () => {
        window.location.href = '/';
    }

    return (
        <div className="w-full min-h-screen flex items-center justify-center " style={{
            backgroundImage: 'url(https://lh3.googleusercontent.com/aida-public/AB6AXuArw11frnBe8Pdyvcd3PIEQwpUtXWeRAt3tju0UaE-VEGBCVO80cEhOzGzaj3T33HtNIxXnHRlz0rvmLf9qqlpbA30jYIcHv4TR-S4Tx8_sB7fH62cGk5-WNPhPIhZIVyUYXQuzeDaKyEG8Cyb91CHGZXoQmY1cPzwkFz5aaW2vuMeZJ4Pai0T3eIdDyfXieuIq_tQxve7QPyp_8tEIHGz-0gOflVeGTcSP6U3cMod60fffcZBPTXUtReyPLBVoQ10AaAhJUB9oIETM)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-emerald-200/50 max-w-md w-full mx-auto p-8 m-8">
                {/* Header */}
                <div className="text-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-2xl">🌿</span>
                    </div>
                    <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-emerald-700 font-semibold text-sm mb-5">
                        Please enter your credentials for access
                    </p>
                </div>

                {/*Form*/}
                <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 transition-all shadow-sm hover:shadow-md bg-white/50"
                        required
                    />
                </div>
                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 transition-all shadow-sm hover:shadow-md bg-white/50"
                        required
                    />
                </div>
                {/* Error Message */}
                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-2xl text-sm">
                        {error}
                    </div>
                )}

                {/* Submit Button - ✅ FIXED: type="submit" + NO onClick */}
                <button
                    type="submit"

                    disabled={Loading}
                    className={`w-full font-bold py-3 px-8 my-6 rounded-2xl shadow-xl transition-all duration-300 text-lg flex items-center justify-center ${Loading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] text-white'
                        }`}
                >
                    {Loading ? (
                        <>
                            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                            Logging...
                        </>
                    ) : (
                        'Login'
                    )}
                </button>
                </form>
                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-200/50">
                    <p className="text-sm text-gray-600" onClick={handleRegister}>
                        Don't have an account? <span className="font-bold text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors">Register</span>
                    </p>
                </div>
            </div>
        </div>
    )
}