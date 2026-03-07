import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Plus, Minus, FileText, Download, Trash2, ShoppingCart } from 'lucide-react';
import { PRODUCTS, Product } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

export default function QuotationBuilder() {
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', 'Cámaras', 'Facturación', 'POS'];
  const filteredProducts = selectedCategory === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const total = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(0, 86, 179); // Primary color
    doc.text('BRIGHTECH PANAMÁ', 105, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text('Cotización de Servicios Tecnológicos', 105, 30, { align: 'center' });
    
    // Client Info
    doc.setTextColor(0);
    doc.setFontSize(10);
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.text(`Cliente: ${clientName || 'Valioso Cliente'}`, 20, 52);
    doc.text(`Email: ${clientEmail || 'N/A'}`, 20, 59);
    
    // Table
    const tableData = cart.map(item => [
      item.product.name,
      item.quantity.toString(),
      `$${item.product.price.toFixed(2)}`,
      `$${(item.product.price * item.quantity).toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: 70,
      head: [['Descripción', 'Cant.', 'Precio Unit.', 'Subtotal']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [0, 86, 179] },
      foot: [['', '', 'TOTAL', `$${total.toFixed(2)}`]],
      footStyles: { fillColor: [240, 240, 240], textColor: [0, 0, 0], fontStyle: 'bold' }
    });

    // Footer
    const finalY = (doc as any).lastAutoTable.finalY + 20;
    doc.setFontSize(10);
    doc.text('Términos y Condiciones:', 20, finalY);
    doc.setFontSize(8);
    doc.text('1. Esta cotización tiene una validez de 15 días.', 20, finalY + 7);
    doc.text('2. Los precios no incluyen ITBMS (7%).', 20, finalY + 12);
    doc.text('3. Tiempo de entrega sujeto a disponibilidad de stock.', 20, finalY + 17);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 86, 179);
    doc.text('¡Gracias por confiar en BRIGHTECH!', 105, finalY + 35, { align: 'center' });

    doc.save(`Cotizacion_BRIGHTECH_${clientName.replace(/\s+/g, '_') || 'Cliente'}.pdf`);
  };

  return (
    <section id="cotizador" className="section bg-white">
      <div className="container px-4">
        <h2 className="section-title text-2xl sm:text-3xl md:text-4xl">Generador de Cotizaciones</h2>
        <p className="cn-text text-center mb-12">报价单生成器</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
              <h3 className="text-xl font-bold">Nuestros Productos y Servicios</h3>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                      selectedCategory === cat 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map(product => (
                <motion.div 
                  key={product.id}
                  whileHover={{ scale: 1.02 }}
                  className="border rounded-xl overflow-hidden flex flex-col bg-white hover:border-primary transition-colors shadow-sm"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="bg-primary/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">{product.name}</h4>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="font-bold text-lg text-primary">${product.price.toFixed(2)}</span>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-primary text-white p-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 text-sm"
                      >
                        <Plus size={16} /> Agregar
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart / Quotation Summary */}
          <div className="bg-light p-6 rounded-2xl h-fit sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingCart className="text-primary" />
              <h3 className="text-xl font-bold">Tu Cotización</h3>
            </div>

            <div className="space-y-4 mb-6">
              <input 
                type="text" 
                placeholder="Nombre del Cliente" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full p-2 rounded-lg border-none focus:ring-2 focus:ring-primary outline-none text-sm"
              />
              <input 
                type="email" 
                placeholder="Email del Cliente" 
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full p-2 rounded-lg border-none focus:ring-2 focus:ring-primary outline-none text-sm"
              />
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              <AnimatePresence>
                {cart.length === 0 ? (
                  <p className="text-center text-gray-500 py-8 text-sm italic">No hay productos seleccionados.</p>
                ) : (
                  cart.map(item => (
                    <motion.div 
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm"
                    >
                      <div className="flex-1">
                        <h5 className="text-sm font-bold truncate max-w-[150px]">{item.product.name}</h5>
                        <p className="text-xs text-gray-500">${item.product.price.toFixed(2)} c/u</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-gray-100 rounded-lg">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1 hover:text-primary"><Minus size={14} /></button>
                          <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1 hover:text-primary"><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:bg-red-50 p-1 rounded"><Trash2 size={16} /></button>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="font-bold">Total Estimado:</span>
                <span className="text-2xl font-bold text-primary">${total.toFixed(2)}</span>
              </div>
              <button 
                onClick={generatePDF}
                disabled={cart.length === 0}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-primary/90 transition-colors"
              >
                <Download size={20} /> Generar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
