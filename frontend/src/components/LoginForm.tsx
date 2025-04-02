import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/LoginForm.css';

const LoginForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data.accessToken);
            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Erro ao fazer login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="modern-login-container">
            <div className="modern-login-card">
                <div className="modern-login-header">
                    <div className="logo-container">
                        <div className="logo-circle"></div>
                        <h1>Tarefas</h1>
                    </div>
                    <p>Gerenciador de tarefas</p>
                </div>

                <form onSubmit={handleSubmit} className="modern-login-form">
                    <h2>Bem-vindo de volta</h2>

                    <div className="modern-input-group">
                        <label htmlFor="email">Email</label>
                        <div className="modern-input-container">
                            <span className="material-icons">email</span>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="modern-input-group">
                        <label htmlFor="password">Senha</label>
                        <div className="modern-input-container">
                            <span className="material-icons">lock</span>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Sua senha"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="password-toggle-btn"
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                <span className="material-icons">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="modern-options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Lembrar-me</label>
                        </div>
                    </div>

                    {error && <div className="modern-error">{error}</div>}

                    <button
                        type="submit"
                        className="modern-submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loader"></div>
                        ) : (
                            'Entrar'
                        )}
                    </button>

                    <div className="modern-divider">
                        <span>Não tem conta?</span>
                    </div>


                    <div className="modern-signup">
                        <a href="/register">Cadastre-se</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;