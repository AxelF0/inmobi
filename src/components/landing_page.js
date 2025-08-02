import React, { useState, useEffect } from 'react';
import '../styles/landing_page.css';

const LandingPage = ({ onStartInvesting, setCurrentView }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isVisible, setIsVisible] = useState({});

    // Datos para la animación de pasos
    const steps = [
        {
            number: "01",
            title: "Elige tu Inversión",
            description: "Navega por nuestro catálogo de inmuebles verificados en Bolivia",
            icon: "🏠"
        },
        {
            number: "02", 
            title: "Compra los Derechos Económicos",
            description: "Adquiere tokens que representan una participación en los rendimientos del inmueble",
            icon: "💰"
        },
        {
            number: "03",
            title: "Recibe Ingresos Pasivos",
            description: "Recibe tu parte de los ingresos por alquiler y el potencial de plusvalía del activo",
            icon: "📈"
        }
    ];

    const benefits = [
        {
            icon: "🔢",
            title: "Fraccionado",
            description: "Invierte pequeñas cantidades desde $100 y diversifica tu portafolio inmobiliario"
        },
        {
            icon: "🔍",
            title: "Transparente", 
            description: "Todas las transacciones registradas en blockchain para máxima transparencia"
        },
        {
            icon: "💧",
            title: "Líquido",
            description: "Compra y vende tus tokens en nuestro mercado secundario cuando quieras"
        },
        {
            icon: "🛡️",
            title: "Seguro",
            description: "Inmuebles verificados con documentación legal completa y auditorías regulares"
        }
    ];

    const stats = [
        { value: "$2.5M+", label: "Valor en Propiedades" },
        { value: "150+", label: "Inversores Activos" },
        { value: "25", label: "Propiedades Disponibles" },
        { value: "8.5%", label: "Rendimiento Promedio" }
    ];

    // Animación automática de pasos
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // Intersection Observer para animaciones
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(prev => ({
                            ...prev,
                            [entry.target.id]: true
                        }));
                    }
                });
            },
            { threshold: 0.1 }
        );

        const elements = document.querySelectorAll('[data-animate]');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="landing-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-container">
                    <div className="hero-content">
                        <div className="hero-badge">
                            🚀 El futuro de la inversión inmobiliaria está aquí
                        </div>
                        <h1 className="hero-title">
                            Invierte en bienes raíces de 
                            <span className="highlight"> Bolivia</span>
                            <br />desde tan solo <span className="highlight">$100</span>
                        </h1>
                        <p className="hero-subtitle">
                            Democratizamos la inversión inmobiliaria a través de tokens blockchain. 
                            Accede a propiedades premium, recibe ingresos pasivos y diversifica tu portafolio 
                            con la seguridad de la tecnología descentralizada.
                        </p>
                        <div className="hero-cta">
                            <button 
                                className="cta-primary"
                                onClick={onStartInvesting}
                            >
                                Explorar Propiedades
                            </button>
                            <button className="cta-secondary">
                                ▶ Ver Cómo Funciona
                            </button>
                        </div>
                        <div className="hero-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="stat-item">
                                    <div className="stat-value">{stat.value}</div>
                                    <div className="stat-label">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="floating-card">
                            <div className="card-header">
                                <span className="card-tag">VENTA</span>
                                <span className="card-status">● Activo</span>
                            </div>
                            <div className="card-image"></div>
                            <div className="card-content">
                                <h3>Casa Moderna - La Paz</h3>
                                <div className="card-features">
                                    <span>🏠 180m²</span>
                                    <span>🛏️ 4 hab</span>
                                    <span>🛁 3 baños</span>
                                </div>
                                <div className="card-investment">
                                    <div className="investment-info">
                                        <span>Precio token: $120</span>
                                        <span className="roi">ROI: 9.2%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="floating-elements">
                            <div className="floating-stat">
                                <div className="stat-icon">📊</div>
                                <div>
                                    <div className="stat-title">Rendimiento</div>
                                    <div className="stat-number">+12.5%</div>
                                </div>
                            </div>
                            <div className="floating-stat">
                                <div className="stat-icon">🔒</div>
                                <div>
                                    <div className="stat-title">Blockchain</div>
                                    <div className="stat-number">Seguro</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section" id="how-it-works" data-animate>
                <div className="section-container">
                    <div className="section-header">
                        <h2>Cómo Funciona</h2>
                        <p>Invierte en inmuebles de forma simple y segura en 3 pasos</p>
                    </div>
                    
                    <div className="steps-container">
                        <div className="steps-progress">
                            <div className="progress-line"></div>
                            {steps.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`progress-dot ${index <= currentStep ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                        
                        <div className="steps-content">
                            {steps.map((step, index) => (
                                <div 
                                    key={index}
                                    className={`step-card ${index === currentStep ? 'active' : ''}`}
                                >
                                    <div className="step-icon">{step.icon}</div>
                                    <div className="step-number">{step.number}</div>
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-description">{step.description}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="steps-visual">
                            <div className="process-animation">
                                <div className={`animation-step ${currentStep === 0 ? 'active' : ''}`}>
                                    <div className="mini-properties">
                                        <div className="mini-property"></div>
                                        <div className="mini-property"></div>
                                        <div className="mini-property"></div>
                                    </div>
                                </div>
                                <div className={`animation-step ${currentStep === 1 ? 'active' : ''}`}>
                                    <div className="token-animation">
                                        <div className="token"></div>
                                        <div className="token"></div>
                                        <div className="token"></div>
                                    </div>
                                </div>
                                <div className={`animation-step ${currentStep === 2 ? 'active' : ''}`}>
                                    <div className="income-animation">
                                        <div className="income-bar"></div>
                                        <div className="income-bar"></div>
                                        <div className="income-bar"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="benefits-section" id="benefits" data-animate>
                <div className="section-container">
                    <div className="section-header">
                        <h2>¿Por qué elegir InmobiChain?</h2>
                        <p>Las ventajas que te ofrecemos para invertir en bienes raíces</p>
                    </div>
                    
                    <div className="benefits-grid">
                        {benefits.map((benefit, index) => (
                            <div 
                                key={index}
                                className={`benefit-card ${isVisible.benefits ? 'animate' : ''}`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="benefit-icon">{benefit.icon}</div>
                                <h3 className="benefit-title">{benefit.title}</h3>
                                <p className="benefit-description">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section" id="cta" data-animate>
                <div className="cta-container">
                    <div className="cta-content">
                        <h2>Comienza tu viaje de inversión inmobiliaria</h2>
                        <p>Únete a cientos de inversores que ya están generando ingresos pasivos con InmobiChain</p>
                        <div className="cta-buttons">
                            <button 
                                className="cta-primary large"
                                onClick={onStartInvesting}
                            >
                                Empezar a Invertir
                            </button>
                            <button className="cta-secondary large">
                                Hablar con un Asesor
                            </button>
                        </div>
                    </div>
                    <div className="cta-visual">
                        <div className="success-metrics">
                            <div className="metric">
                                <div className="metric-icon">💎</div>
                                <div className="metric-text">
                                    <div className="metric-value">Inversión mínima</div>
                                    <div className="metric-label">$100 USD</div>
                                </div>
                            </div>
                            <div className="metric">
                                <div className="metric-icon">⚡</div>
                                <div className="metric-text">
                                    <div className="metric-value">Tiempo de setup</div>
                                    <div className="metric-label">5 minutos</div>
                                </div>
                            </div>
                            <div className="metric">
                                <div className="metric-icon">🎯</div>
                                <div className="metric-text">
                                    <div className="metric-value">ROI promedio</div>
                                    <div className="metric-label">8.5% anual</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;