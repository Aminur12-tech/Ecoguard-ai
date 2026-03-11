import { useState } from 'react';
import axios from 'axios';

function App() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input
  };

  // ✅ FIXED: Proper form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
    setError('');

    try {
      console.log('Sending to backend:', formData); // Debug log
      
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name: formData.fullName,
        email: formData.email,
        role: formData.role,
        password: formData.password
      });

      console.log('Success:', res.data); // Debug log
      localStorage.setItem('token', res.data.token);
      alert(`✅ Welcome ${formData.role}! Account created!`);
      window.location.href = '/dashboard';
    } catch (error: any) {
      console.error('Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 flex items-center justify-center p-4" style={{
      backgroundImage: 'url(https://static2.tripoto.com/media/filter/tst/img/2551121/Image/1740046904_untitled_design_2025_02_20t155129_687.jpg.webp)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className=" absolute inset-0 bg-black/60" />
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl border border-emerald-200/50 max-w-md w-full mx-auto p-8">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-2xl">🌿</span>
          </div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
            Join the Movement
          </h1>
          <p className="text-emerald-700 font-semibold text-sm">
            Secure your spot in Assam's sustainable tourism future powered by AI.
          </p>
        </div>

        {/* Form - ✅ FIXED: onSubmit on FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 transition-all shadow-sm hover:shadow-md bg-white/50"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 transition-all shadow-sm hover:shadow-md bg-white/50"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 transition-all shadow-sm hover:shadow-md bg-white/50"
              required
            >
              <option value="">Select Role</option>
              <option value="Traveller">🧳 Traveller</option>
              <option value="Vendor">🏠 Vendor</option>
              <option value="Guide">🗺️ Tour Guide</option>
              <option value="Admin">⚙️ Admin</option>
            </select>
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

          {/* Checkbox */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-5 w-5 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
              I agree to the Sustainable Tourism Terms & ethical use of my data for Assam's 
              <span className="font-semibold text-emerald-700"> ecological preservation</span>
            </label>
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
            disabled={loading}
            className={`w-full font-bold py-3 px-8 rounded-2xl shadow-xl transition-all duration-300 text-lg flex items-center justify-center ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] text-white'
            }`}
          >
            {loading ? (
              <>
                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                Creating...
              </>
            ) : (
              'CREATE ACCOUNT →'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 pt-6 border-t border-gray-200/50">
          <p className="text-sm text-gray-600">
            Already have an account? <span className="font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer transition-colors">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
