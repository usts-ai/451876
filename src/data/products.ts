export interface Product {
  id: string;
  name: string;
  category: 'fenetre' | 'porte' | 'volet';
  description: string;
  price: number;
  image: string;
  features: string[];
  materials: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: 'fenetre-1',
    name: 'Fenêtre Eco-Confort',
    category: 'fenetre',
    description: 'Fenêtre à double vitrage offrant une isolation thermique et acoustique optimale, idéale pour les habitations modernes.',
    price: 249.99,
    image: '/images/fenetre-1.jpg',
    features: ['Double vitrage', 'Isolation thermique renforcée', 'Profils fins', 'Étanchéité à l\'air'],
    materials: ['PVC', 'Aluminium', 'Bois'],
    colors: ['Blanc', 'Gris anthracite', 'Chêne doré', 'Noir']
  },
  {
    id: 'fenetre-2',
    name: 'Fenêtre Panoramique XL',
    category: 'fenetre',
    description: 'Grande baie vitrée avec vue panoramique, idéale pour les salons et les pièces à vivre donnant sur l\'extérieur.',
    price: 599.99,
    image: '/images/fenetre-2.jpg',
    features: ['Triple vitrage', 'Grandes dimensions', 'Isolation thermique premium', 'Anti-effraction'],
    materials: ['Aluminium', 'Mixte bois-alu'],
    colors: ['Gris anthracite', 'Noir', 'Blanc']
  },
  {
    id: 'porte-1',
    name: 'Porte d\'Entrée Sécurité+',
    category: 'porte',
    description: 'Porte d\'entrée haute sécurité avec serrure multipoints et matériaux renforcés pour une protection optimale de votre domicile.',
    price: 899.99,
    image: '/images/porte-1.jpg',
    features: ['Serrure 5 points', 'Isolation thermique', 'Résistance classe 3', 'Joint périphérique'],
    materials: ['Acier', 'Aluminium', 'Mixte bois-métal'],
    colors: ['Gris anthracite', 'Rouge bordeaux', 'Bleu canard', 'Noir']
  },
  {
    id: 'porte-2',
    name: 'Porte Coulissante Moderne',
    category: 'porte',
    description: 'Solution élégante pour gagner de l\'espace avec un design contemporain qui s\'intègre parfaitement dans votre intérieur.',
    price: 749.99,
    image: '/images/porte-2.jpg',
    features: ['Système coulissant silencieux', 'Fermeture douce', 'Verre sécurit', 'Rail caché'],
    materials: ['Verre', 'Aluminium', 'Bois'],
    colors: ['Transparent', 'Dépoli', 'Teinté gris', 'Noir']
  },
  {
    id: 'volet-1',
    name: 'Volet Roulant Électrique',
    category: 'volet',
    description: 'Volet roulant motorisé avec commande à distance, offrant confort d\'utilisation et sécurité renforcée pour votre habitation.',
    price: 349.99,
    image: '/images/volet-1.jpg',
    features: ['Motorisation intégrée', 'Commande smartphone', 'Détection d\'obstacles', 'Isolation renforcée'],
    materials: ['Aluminium', 'PVC'],
    colors: ['Blanc', 'Beige', 'Gris', 'Marron']
  },
  {
    id: 'volet-2',
    name: 'Volet Battant Tradition',
    category: 'volet',
    description: 'Volet battant traditionnel alliant charme d\'autrefois et performances modernes pour une esthétique authentique de votre façade.',
    price: 259.99,
    image: '/images/volet-2.jpg',
    features: ['Pentures réglables', 'Protection solaire', 'Résistance aux intempéries', 'Quincaillerie de qualité'],
    materials: ['Bois', 'PVC', 'Aluminium'],
    colors: ['Blanc', 'Bleu lavande', 'Rouge basque', 'Vert sapin']
  }
];

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 3);
};

export const getProductsByCategory = (category: 'fenetre' | 'porte' | 'volet'): Product[] => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
