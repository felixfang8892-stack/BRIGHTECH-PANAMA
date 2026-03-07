export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  features: string[];
}

export const PRODUCTS: Product[] = [
  // --- NVR (网络硬盘录像机) ---
  {
    id: 'DHI-NVR1108HS-8P-S3/H',
    name: 'Dahua NVR 8 Canales con 8 Puertos PoE',
    category: 'NVR y Grabadores',
    price: 98.46, 
    description: 'Grabador de red (NVR) de 8 canales con 8 puertos PoE integrados. Ideal para pequeñas y medianas empresas. Soporta compresión Smart H.265+.',
    image: 'https://placehold.co/400x300/0056b3/ffffff?text=NVR+8CH+PoE',
    features: ['8 Puertos PoE Directos', 'Compresión Smart H.265+', 'Monitoreo App DMSS']
  },
  {
    id: 'NVR5216-16P-EI',
    name: 'Dahua NVR 16 Canales WizSense IA con PoE',
    category: 'NVR y Grabadores',
    price: 389.28, 
    description: 'Grabador NVR avanzado de 16 canales con Inteligencia Artificial (WizSense). Reconocimiento facial y protección perimetral de alta precisión para proyectos exigentes.',
    image: 'https://placehold.co/400x300/0056b3/ffffff?text=NVR+IA+16CH',
    features: ['16 Puertos PoE', 'Inteligencia Artificial', 'Reconocimiento Facial']
  },

  // --- XVR (同轴高清录像机) ---
  {
    id: 'DH-XVR5108HS-I3',
    name: 'Grabador XVR 8 Canales WizSense IA',
    category: 'XVR y Grabadores',
    price: 71.28, 
    description: 'XVR Penta-híbrido de 8 canales con inteligencia artificial WizSense. Solución ideal para modernizar sistemas de seguridad antiguos reutilizando el cableado.',
    image: 'https://placehold.co/400x300/0056b3/ffffff?text=XVR+WizSense+8CH',
    features: ['Soporta 5 Tecnologías', 'Codificación AI', 'SMD Plus (Filtro de falsas alarmas)']
  },

  // --- IPC (网络摄像机) ---
  {
    id: 'DH-IPC-HFW1239TL1P-A-IL-0280B',
    name: 'Cámara Bala IP 2MP Inteligente con Audio',
    category: 'Cámaras IP',
    price: 35.76, 
    description: 'Cámara de red tipo bala de 2 Megapíxeles. Excelente calidad de imagen IP con micrófono incorporado para grabación de audio ambiental.',
    image: 'https://placehold.co/400x300/0056b3/ffffff?text=Bala+IP+2MP',
    features: ['Resolución 2MP (1080p)', 'Detección Inteligente', 'Micrófono Integrado']
  },

  // --- HAC (同轴高清摄像机) ---
  {
    id: 'DH-HAC-T1A51N-U-IL-A-0280B',
    name: 'Cámara Domo HDCVI 5MP con Audio',
    category: 'Cámaras Análogas HD',
    price: 17.50, 
    description: 'Cámara tipo domo de alta resolución (5MP) para sistemas análogos. Excelente opción costo-beneficio para tiendas y oficinas. Incluye transmisión de audio.',
    image: 'https://placehold.co/400x300/0056b3/ffffff?text=Domo+HDCVI+5MP',
    features: ['Alta Resolución 5MP', 'Audio sobre Coaxial', 'Iluminador Dual Inteligente']
  },

  // --- Switches & Redes (交换机) ---
  {
    id: 'DH-CS4220-16GT-190-V2',
    name: 'Switch Dahua 16 Puertos Gigabit PoE',
    category: 'Redes y Switches',
    price: 178.82, 
    description: 'Switch comercial gigabit de 16 puertos PoE. Diseñado específicamente para garantizar la transmisión fluida de video en sistemas de múltiples cámaras IP.',
    image: 'https://placehold.co/400x300/0056b3/ffffff?text=Switch+PoE+16+Puertos',
    features: ['16 Puertos Gigabit PoE', 'Transmisión Larga Distancia', 'Alta Confiabilidad']
  }
];

export const CATEGORIES = ['Todos', 'NVR y Grabadores', 'XVR y Grabadores', 'Cámaras IP', 'Cámaras Análogas HD', 'Redes y Switches'];
