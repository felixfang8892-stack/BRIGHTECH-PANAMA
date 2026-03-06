import React, { useState, useEffect } from 'react';
import { Menu, X, Send, ArrowUp, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ShoppingGuide from './components/ShoppingGuide';
import QuotationBuilder from './components/QuotationBuilder';

const PHONE_NUMBER = "+507 69519368";
const WHATSAPP_LINK = "https://wa.me/50769519368";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState({ message: '', isError: false });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      q: "¿Cuántos días de grabación guardan las cámaras?",
      a: "Depende del disco duro, usualmente configuramos para 15 a 30 días de respaldo continuo."
    },
    {
      q: "¿Puedo ver las cámaras si no estoy en Panamá?",
      a: "Sí, mediante la App oficial de Dahua (DMSS) podrá ver en tiempo real desde cualquier país."
    },
    {
      q: "¿El sistema de facturación funciona sin internet?",
      a: "El sistema puede generar el documento, pero requiere conexión para la validación con el PAC/DGI. Ofrecemos opciones con respaldo offline."
    },
    {
      q: "¿Las cámaras ven bien de noche?",
      a: "Instalamos tecnología Full-Color e infrarroja de alta potencia para claridad total en oscuridad."
    },
    {
      q: "¿Cumplen con la ley de Facturación Electrónica de Panamá?",
      a: "Totalmente. Somos proveedores autorizados y garantizamos el cumplimiento fiscal ante la DGI."
    },
    {
      q: "¿Qué pasa si falla el equipo?",
      a: "Contamos con soporte técnico local y garantía de fábrica directa en todos nuestros componentes."
    },
    {
      q: "¿Realizan instalaciones en el interior del país?",
      a: "Cubrimos Ciudad de Panamá y provincias centrales bajo previa agenda."
    },
    {
      q: "¿Puedo integrar mis cámaras actuales al nuevo sistema?",
      a: "Realizamos una evaluación técnica. Si son compatibles, podemos integrarlas para ahorrar costos."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ message: 'Enviando...', isError: false });
    setTimeout(() => {
      setFormStatus({ message: '¡Enviado con Éxito! Un consultor le contactará en breve.', isError: false });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* WhatsApp Float */}
      <motion.a 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        href={WHATSAPP_LINK} 
        className="whatsapp-float" 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8 fill-white">
          <path d="M12.031 6.172c-2.335 0-4.241 1.91-4.241 4.249 0 .882.261 1.761.758 2.502L7.69 15.656l2.844-.741c.715.39 1.493.593 2.29.593 2.335 0 4.243-1.91 4.243-4.251 0-2.339-1.908-4.085-4.036-4.085zM10.22 13.56c-.235-.235-.353-.518-.353-.846 0-.328.118-.611.353-.846l1.812-1.812c.235-.235.518-.353.846-.353s.611.118.846.353c.235.235.353.518.353.846 0 .328-.118.611-.353.846l-1.812 1.812c-.235.235-.518.353-.846.353-.328 0-.611-.118-.846-.353z"/>
        </svg>
      </motion.a>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-container px-4">
          <div className="logo flex items-center">
            BRIGHTECH <span className="cn-tag">专业科技</span>
          </div>
          
          {/* Desktop Nav */}
          <ul className="nav-links hidden md:flex">
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#dahua">Cámaras</a></li>
            <li><a href="#factura">Facturación</a></li>
            <li><a href="#pos">POS</a></li>
            <li><a href="#cotizador">Cotizador</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contacto" className="btn-nav">Contacto</a></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white/95 backdrop-blur-md absolute top-full left-0 w-full shadow-xl overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 font-medium">
                <a href="#inicio" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Inicio</a>
                <a href="#dahua" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Cámaras</a>
                <a href="#factura" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Facturación</a>
                <a href="#pos" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>POS</a>
                <a href="#cotizador" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Cotizador</a>
                <a href="#faq" className="hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                <a href="#contacto" className="btn-nav text-center mt-2" onClick={() => setIsMenuOpen(false)}>Contacto</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section id="inicio" className="hero flex items-center min-h-[70vh] md:min-h-[80vh]">
        <div className="container hero-content px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="badge bg-white/10 inline-block px-4 py-1 rounded-full mb-6 text-sm md:text-base">Soluciones B2B Panamá 🇵🇦</div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Protección Inteligente + <span className="highlight">Facturación Electrónica</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-4 max-w-2xl mx-auto">Seguridad avanzada con cámaras <strong>Dahua</strong> y cumplimiento fiscal garantizado (PAC) para su negocio.</p>
            <p className="cn-subtext text-secondary font-bold mb-8 text-sm sm:text-base">大华智能监控安装 + 巴拿马电子发票/收银系统一站式服务</p>
            <div className="hero-btns flex flex-col sm:flex-row justify-center gap-4">
              <a href={WHATSAPP_LINK} className="btn primary text-sm sm:text-base">Cotizar por WhatsApp</a>
              <a href="#contacto" className="btn secondary text-sm sm:text-base">Agendar Visita</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dahua Section */}
      <section id="dahua" className="section">
        <div className="container px-4">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Soluciones de Video Vigilancia <span className="brand">Dahua</span></h2>
          <p className="cn-text text-center mb-12">大华智能监控方案</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <motion.div whileHover={{ y: -5 }} className="card">
              <div className="icon">🤖</div>
              <h3 className="font-bold text-lg md:text-xl mb-2">IA Detección Humana</h3>
              <p className="text-sm md:text-base">Alertas inteligentes que distinguen personas de objetos, reduciendo falsas alarmas.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="card">
              <div className="icon">🌑</div>
              <h3 className="font-bold text-lg md:text-xl mb-2">Visión Nocturna Color</h3>
              <p className="text-sm md:text-base">Tecnología Full-Color para identificar rostros y matrículas incluso en oscuridad total.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="card">
              <div className="icon">📱</div>
              <h3 className="font-bold text-lg md:text-xl mb-2">Acceso Remoto</h3>
              <p className="text-sm md:text-base">Vea su negocio en vivo desde su celular en cualquier parte del mundo.</p>
            </motion.div>
          </div>

          <div className="packages mt-16 md:mt-24">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-8">Paquetes Recomendados <span className="cn-tag">推荐套餐</span></h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="pkg-card">
                <h4 className="font-bold text-lg">Tienda Pequeña</h4>
                <p className="text-sm md:text-base">2-4 Cámaras + Grabador (NVR) + Configuración Móvil</p>
                <small className="text-gray-500">Ideal para quioscos o locales de &lt; 50m2</small>
              </div>
              <div className="pkg-card">
                <h4 className="font-bold text-lg">Minimarket</h4>
                <p className="text-sm md:text-base">6-8 Cámaras + Audio + Disco Duro Alta Capacidad</p>
                <small className="text-gray-500">Control de pasillos y cajas de cobro</small>
              </div>
              <div className="pkg-card">
                <h4 className="font-bold text-lg">Bodega / Almacén</h4>
                <p className="text-sm md:text-base">16+ Cámaras IP + PTZ (Giro 360°) + Perímetro IA</p>
                <small className="text-gray-500">Seguridad perimetral y logística</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facturación Section */}
      <section id="factura" className="section bg-light overflow-hidden">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-side order-2 lg:order-1">
              <h2 className="section-title text-left text-2xl sm:text-3xl md:text-4xl">Facturación Electrónica (PAC)</h2>
              <p className="cn-text">巴拿马电子发票合规系统</p>
              <p className="mb-6 text-sm md:text-base">Cumpla con la normativa de la DGI de forma sencilla y segura con nuestro sistema certificado.</p>
              <ul className="space-y-3 text-sm md:text-base">
                <li className="flex items-start gap-2"><span>✅</span> <span>Emisión ilimitada de facturas y notas de crédito.</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Reportes mensuales automáticos para contabilidad.</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Gestión multi-sucursal y multi-usuario.</span></li>
                <li className="flex items-start gap-2"><span>✅</span> <span>Respaldo en la nube 24/7.</span></li>
              </ul>
            </div>
            <div className="visual-side flex justify-center order-1 lg:order-2">
              <motion.div 
                whileHover={{ rotate: 0, scale: 1.05 }}
                className="w-48 h-48 sm:w-64 sm:h-64 bg-primary text-white flex items-center justify-center rounded-2xl shadow-2xl font-bold text-xl sm:text-2xl rotate-3 transition-transform"
              >
                PAC Certified
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* POS Section */}
      <section id="pos" className="section">
        <div className="container px-4">
          <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Sistemas POS & Software de Caja</h2>
          <p className="cn-text text-center mb-12">收银机与收银管理系统</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="pos-info">
              <h3 className="text-xl sm:text-2xl font-bold mb-4">Control Total de su Inventario</h3>
              <p className="mb-6 text-sm md:text-base">Software intuitivo compatible con:</p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <span className="bg-light px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base">🖨️ Impresoras</span>
                <span className="bg-light px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base">🏷️ Lectores</span>
                <span className="bg-light px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base">💵 Gavetas</span>
                <span className="bg-light px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base">⚖️ Balanzas</span>
              </div>
            </div>
            <div className="pos-features grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-light p-4 rounded-lg font-medium text-sm sm:text-base">📦 Inventarios en tiempo real</div>
              <div className="bg-light p-4 rounded-lg font-medium text-sm sm:text-base">📊 Reportes de ventas diarios</div>
              <div className="bg-light p-4 rounded-lg font-medium text-sm sm:text-base">🎟️ Gestión de promociones</div>
              <div className="bg-light p-4 rounded-lg font-medium text-sm sm:text-base">🔐 Control de cierres de caja</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quotation Builder Section */}
      <QuotationBuilder />

      {/* Process Section */}
      <section className="section bg-dark text-white">
        <div className="container px-4">
          <h2 className="section-title white">Nuestro Proceso de Implementación</h2>
          <div className="process-steps mt-12">
            <div className="step"><span>1</span> Diagnóstico</div>
            <div className="step"><span>2</span> Diseño</div>
            <div className="step"><span>3</span> Instalación</div>
            <div className="step"><span>4</span> Soporte</div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section">
        <div className="container px-4 max-w-3xl">
          <h2 className="section-title">Preguntas Frecuentes <span className="cn-tag">常见问题</span></h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`}>
                <div 
                  className="faq-question flex justify-between items-center p-4 cursor-pointer font-bold"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  {faq.q} <span>{activeFaq === index ? '-' : '+'}</span>
                </div>
                <motion.div 
                  initial={false}
                  animate={{ height: activeFaq === index ? 'auto' : 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 border-t border-gray-100 text-gray-600">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="section bg-light">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="section-title text-left text-2xl sm:text-3xl md:text-4xl">Contáctenos Ahora</h2>
              <p className="mb-8 text-sm md:text-base">Solicite una auditoría gratuita de seguridad o una demo del software POS.</p>
              <div className="space-y-4 text-sm md:text-base">
                <p><strong>Tel/WA:</strong> <a href={WHATSAPP_LINK} className="text-primary hover:underline">{PHONE_NUMBER}</a></p>
                <p><strong>Email:</strong> <a href="mailto:info@brightech.pa" className="text-primary hover:underline">info@brightech.pa</a></p>
                <p><strong>Ubicación:</strong> Ciudad de Panamá</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="contact-form shadow-xl p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre completo" required className="w-full" />
                <input type="tel" placeholder="Teléfono" required className="w-full" />
              </div>
              <input type="email" placeholder="Correo electrónico" required className="w-full" />
              <select required className="w-full">
                <option value="">Seleccione Servicio</option>
                <option value="camaras">Cámaras Dahua</option>
                <option value="factura">Facturación Electrónica</option>
                <option value="pos">POS / Software</option>
                <option value="todo">Solución Completa</option>
              </select>
              <textarea placeholder="Cuéntenos sobre su negocio..." rows={4} className="w-full"></textarea>
              <button type="submit" className="btn primary w-full flex items-center justify-center gap-2 py-3">
                <Send size={18} /> Enviar Solicitud
              </button>
              {formStatus.message && (
                <p className={`text-center mt-4 font-medium text-sm sm:text-base ${formStatus.isError ? 'text-red-500' : 'text-green-600'}`}>
                  {formStatus.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container px-4">
          <div className="footer-grid">
            <div>
              <h4 className="font-bold text-white mb-4">BRIGHTECH</h4>
              <p>Tecnología para el crecimiento de su empresa en Panamá.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Horario</h4>
              <p>Lun - Vie: 8:00 AM - 5:00 PM</p>
              <p>Sáb: 9:00 AM - 1:00 PM</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Área de Servicio</h4>
              <p>Ciudad de Panamá, La Chorrera, Colón e Interior.</p>
            </div>
          </div>
          <div className="copyright mt-12 pt-8 border-t border-gray-800 text-center text-sm">
            &copy; {new Date().getFullYear()} BRIGHTECH Panamá. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      {showBackToTop && (
        <button 
          id="backToTop" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center justify-center"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* AI Shopping Guide */}
      <ShoppingGuide />
    </div>
  );
}
