import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterForm.css';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        setIsLoading(true);
        try {
            await axios.post('/auth/register', { name, email, password, confirmPassword });
            setIsLoading(false);
            setError('');
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.style.display = 'flex';
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                navigate('/login');
            }
        } catch (err: any) {
            setIsLoading(false);
            setError(err.response?.data?.message || 'Erro ao cadastrar');
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <h1>Criar Conta</h1>
                    <p>Preencha os dados abaixo para se cadastrar</p>
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="input-group">
                        <label htmlFor="name">Nome completo</label>
                        <div className="input-field-container">
                            <span className="material-icons">person</span>
                            <input
                                id="name"
                                type="text"
                                placeholder="Digite seu nome completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-field-container">
                            <span className="material-icons">email</span>
                            <input
                                id="email"
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Senha</label>
                        <div className="input-field-container">
                            <span className="material-icons">lock</span>
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="toggle-password-btn"
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                <span className="material-icons">
                                    {showPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="confirmPassword">Confirmar Senha</label>
                        <div className="input-field-container">
                            <span className="material-icons">lock</span>
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirme sua senha"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="toggle-password-btn"
                                aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                <span className="material-icons">
                                    {showConfirmPassword ? 'visibility_off' : 'visibility'}
                                </span>
                            </button>
                        </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <div id="success-message" className="success-message" style={{ display: 'none' }}>
                        <span className="success-icon">✓</span>
                        Cadastro realizado com sucesso! Redirecionando...
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-spinner"></span>
                        ) : (
                            'Cadastrar'
                        )}
                    </button>
                </form>

                <div className="login-link">
                    Já tem uma conta? <a href="/login">Faça login</a>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;