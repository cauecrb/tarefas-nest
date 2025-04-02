import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.accessToken);
            navigate('/dashboard'); // Redireciona após login
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <div className="password-container">
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="show-password-btn"
                >
                    {showPassword ? '🙈' : '👁️'}
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            <button type="submit">Entrar</button>
        </form>
    );
};

export default LoginForm;