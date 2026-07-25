import React, { useState } from 'react';
import Card from './Card'; // Assuming Card.jsx is in the components folder
import GoogleIcon from './icons/GoogleIcon'; // Corrected import path

const LoginPage = ({ onLogin, t }) => {
    const [name, setName] = useState('');
    const [city, setCity] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Real authentication with backend API
    const authenticateUser = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            if (isLogin) {
                // Login validation
                if (!email || !password) {
                    setError('Please fill in all required fields');
                    setIsLoading(false);
                    return false;
                }
                
                // Call login API
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    setError(data.error || 'Login failed');
                    setIsLoading(false);
                    return false;
                }
                
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                return { name: data.user.name, city: data.user.city };
            } else {
                // Registration validation
                if (!name || !email || !password || !city || !phone) {
                    setError('Please fill in all required fields');
                    setIsLoading(false);
                    return false;
                }
                if (password.length < 6) {
                    setError('Password must be at least 6 characters long');
                    setIsLoading(false);
                    return false;
                }
                
                // Call register API
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        name: name.trim(), 
                        email, 
                        password, 
                        city: city.trim(), 
                        phone 
                    }),
                });
                
                const data = await response.json();
                
                if (!response.ok) {
                    setError(data.error || 'Registration failed');
                    setIsLoading(false);
                    return false;
                }
                
                // Store token in localStorage
                localStorage.setItem('authToken', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                
                return { name: data.user.name, city: data.user.city };
            }
        } catch (error) {
            setError('Network error. Please try again.');
            setIsLoading(false);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await authenticateUser();
        if (result) {
            onLogin(result.name, result.city);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setError('');
        
        // Simulate Google OAuth
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock Google login success
        onLogin("Bhoomi Sense", "Delhi");
    };
    
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4 bg-cover bg-center relative" style={{backgroundImage: "url('https://images.pexels.com/photos/1467989/pexels-photo-1467989.png')"}}>
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="max-w-md w-full animate-fadeIn z-10">
                 <div className="text-center mb-6">
                    <h1 className="text-5xl font-extrabold text-white" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.6)'}}>Bhoomi Sense</h1>
                </div>
                <Card className="shadow-2xl !p-8 bg-white/90 backdrop-blur-sm">
                    <div className="text-center mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            {isLogin ? t.welcomeBack : t.createAccount}
                        </h2>
                        <p className="text-gray-500">
                            {isLogin ? t.signInToDashboard : t.createAccountSubtitle}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">{t.fullName}</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    required={!isLogin}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                    placeholder="John Doe" 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                />
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">{t.email}</label>
                            <input 
                                type="email" 
                                id="email" 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                placeholder="john@example.com" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{t.password}</label>
                            <input 
                                type="password" 
                                id="password" 
                                required 
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                placeholder="••••••••" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </div>

                        {!isLogin && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">{t.city}</label>
                                    <input 
                                        type="text" 
                                        id="city" 
                                        required={!isLogin}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                        placeholder="e.g., Mumbai" 
                                        value={city} 
                                        onChange={(e) => setCity(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">{t.phoneNumber}</label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        required={!isLogin}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" 
                                        placeholder="+91 12345 67890" 
                                        value={phone} 
                                        onChange={(e) => setPhone(e.target.value)} 
                                    />
                                </div>
                            </>
                        )}

                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? t.loading : (isLogin ? t.signIn : t.createAccount)}
                        </button>
                    </form>

                    <div className="text-center mt-4">
                        <button
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setName('');
                                setEmail('');
                                setPassword('');
                                setCity('');
                                setPhone('');
                            }}
                            className="text-green-600 hover:text-green-700 font-medium"
                        >
                            {isLogin ? t.dontHaveAccount : t.alreadyHaveAccount}
                        </button>
                    </div>

                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-gray-300" />
                        <span className="mx-4 text-gray-400 font-semibold">{t.or}</span>
                        <hr className="flex-grow border-gray-300" />
                    </div>

                    <button 
                        onClick={handleGoogleLogin} 
                        disabled={isLoading}
                        className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-gray-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        <GoogleIcon />
                        <span>{isLoading ? t.loading : t.signInWithGoogle}</span>
                    </button>
                </Card>
            </div>
        </div>
    );
}

export default LoginPage;
