export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Cámaras' | 'Facturación' | 'POS';
  image: string;
}

export const PRODUCTS: Product[] = [
  // Cámaras Dahua
  {
    id: 'cam-01',
    name: 'Kit 4 Cámaras Dahua Full-Color',
    description: 'Incluye NVR, 4 cámaras 2MP, disco 1TB e instalación básica.',
    price: 450.00,
    category: 'Cámaras',
    image: 'https://picsum.photos/seed/dahua-kit4/400/300'
  },
  {
    id: 'cam-02',
    name: 'Kit 8 Cámaras Dahua IA',
    description: 'Incluye NVR IA, 8 cámaras 4MP, disco 2TB e instalación básica.',
    price: 850.00,
    category: 'Cámaras',
    image: 'https://picsum.photos/seed/dahua-kit8/400/300'
  },
  {
    id: 'cam-03',
    name: 'Cámara PTZ Dahua 360°',
    description: 'Cámara domo con zoom óptico 25x y seguimiento inteligente.',
    price: 320.00,
    category: 'Cámaras',
    image: 'https://picsum.photos/seed/dahua-ptz/400/300'
  },
  
  // Facturación Electrónica
  {
    id: 'fac-01',
    name: 'Plan Facturación Anual (Ilimitado)',
    description: 'Emisión ilimitada de documentos, soporte 24/7 y firma electrónica.',
    price: 180.00,
    category: 'Facturación',
    image: 'https://picsum.photos/seed/billing-plan/400/300'
  },
  {
    id: 'fac-02',
    name: 'Implementación PAC + DGI',
    description: 'Trámite de registro ante la DGI y configuración inicial del sistema.',
    price: 75.00,
    category: 'Facturación',
    image: 'https://picsum.photos/seed/dgi-setup/400/300'
  },

  // Sistemas POS
  {
    id: 'pos-01',
    name: 'Software POS Retail (Licencia Vitalicia)',
    description: 'Control de inventario, ventas, reportes y multi-usuario.',
    price: 250.00,
    category: 'POS',
    image: 'https://picsum.photos/seed/pos-software/400/300'
  },
  {
    id: 'pos-02',
    name: 'Combo Hardware POS',
    description: 'Impresora térmica, gaveta de dinero y lector de códigos.',
    price: 350.00,
    category: 'POS',
    image: 'https://picsum.photos/seed/pos-hardware/400/300'
  },
  {
    id: 'pos-03',
    name: 'Computadora All-in-One Táctil',
    description: 'Pantalla táctil 15", 8GB RAM, SSD 256GB para punto de venta.',
    price: 550.00,
    category: 'POS',
    image: 'https://picsum.photos/seed/pos-aio/400/300'
  }
];
