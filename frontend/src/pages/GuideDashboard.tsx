import { useState } from 'react';
import axios from 'axios';
import { Upload } from 'lucide-react';

const GuideDashboard = () => {
    const [file, setFile] = useState<File | null>(null);
    const [poiData, setPoiData] = useState({
        name: '',
        description: '',
        lat: 26.14, // Guwahati default
        lng: 91.73
    });
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleSubmitPOI = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('name', poiData.name);
        formData.append('description', poiData.description);
        formData.append('lat', poiData.lat.toString());
        formData.append('lng', poiData.lng.toString());
        formData.append('submitterId', localStorage.getItem('userId') || 'guide1');

        try {
            setUploadStatus('Uploading to AI Vision...');
            const res = await axios.post('http://localhost:5000/api/ugc/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            setUploadStatus(`✅ ${res.data.message}`);
            setPoiData({ name: '', description: '', lat: 26.14, lng: 91.73 });
            setFile(null);
        } catch (error) {
            setUploadStatus('❌ Upload failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-black text-gray-800 mb-12 text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    🌿 Submit New POI
                </h1>

                {/* Upload Form */}
                <div className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border border-emerald-200">
                    <form onSubmit={handleSubmitPOI} className="max-w-2xl mx-auto space-y-8">

                        {/* Photo Upload */}
                        <div className="text-center">
                            <div className="w-48 h-48 border-4 border-dashed border-emerald-300 rounded-3xl mx-auto p-12 flex flex-col items-center justify-center hover:border-emerald-400 transition-all bg-emerald-50/50">
                                {file ? (
                                    <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover rounded-2xl shadow-xl" />
                                ) : (
                                    <>
                                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4 shadow-2xl">
                                            <Upload className="w-10 h-10 text-white" />
                                        </div>
                                        <p className="text-2xl font-bold text-gray-700 mb-2">Drop Photo</p>
                                        <p className="text-gray-600">Haflong Waterfall, Tea Gardens, etc.</p>
                                    </>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="mt-6 w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                            />
                        </div>

                        {/* POI Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-3">📍 POI Name</label>
                                <input
                                    type="text"
                                    placeholder="Haflong Waterfall"
                                    value={poiData.name}
                                    onChange={(e) => setPoiData({ ...poiData, name: e.target.value })}
                                    className="w-full p-4 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-300 shadow-lg"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-bold text-gray-800 mb-3">📝 Description</label>
                                <textarea
                                    placeholder="Secret waterfall hidden in Haflong hills..."
                                    value={poiData.description}
                                    onChange={(e) => setPoiData({ ...poiData, description: e.target.value })}
                                    rows={3}
                                    className="w-full p-4 border-2 border-gray-200 rounded-3xl focus:ring-4 focus:ring-emerald-300 shadow-lg resize-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Status */}
                        {uploadStatus && (
                            <div className={`p-6 rounded-3xl shadow-xl text-center font-bold text-xl ${uploadStatus.includes('✅')
                                    ? 'bg-emerald-100 border-4 border-emerald-300 text-emerald-800'
                                    : uploadStatus.includes('❌')
                                        ? 'bg-red-100 border-4 border-red-300 text-red-800'
                                        : 'bg-blue-100 border-4 border-blue-300 text-blue-800'
                                }`}>
                                {uploadStatus}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={!file}
                            className={`w-full py-6 px-8 rounded-3xl font-black text-xl shadow-2xl transition-all duration-500 transform ${file
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hover:shadow-3xl hover:-translate-y-2 hover:scale-105'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            🚀 Submit POI for AI Analysis & Community Vote
                        </button>
                    </form>
                </div>

                {/* How it Works */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-8 bg-white/70 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                            <span className="text-3xl">🤖</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Vision Tags</h3>
                        <p className="text-gray-700">Automatically detects waterfall, tea garden, trekking</p>
                    </div>

                    <div className="text-center p-8 bg-white/70 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                            <span className="text-3xl">👥</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">24hr Vote</h3>
                        <p className="text-gray-700">Community approves (25+ votes = official POI)</p>
                    </div>

                    <div className="text-center p-8 bg-white/70 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
                        <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                            <span className="text-3xl">💰</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">5% Commission</h3>
                        <p className="text-gray-700">Earn when tourists visit your discovered POI</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GuideDashboard;