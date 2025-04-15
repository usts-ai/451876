import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
    >
      <div className="relative h-48 bg-gray-200">
        <img 
          src={product.image || 'https://via.placeholder.com/400x300?text=Image+Produit'} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Produit';
          }}
        />
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
          {product.category === 'fenetre' ? 'Fenêtre' : 
            product.category === 'porte' ? 'Porte' : 'Volet'}
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <div className="mt-1 text-sm text-gray-600 line-clamp-2 h-10">
          {product.description}
        </div>
        
        <div className="mt-3 flex justify-between items-end">
          <div className="text-blue-800 font-bold">
            {product.price.toLocaleString('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 0
            })}
          </div>
          
          <Link to={`/produit/${product.id}`}>
            <motion.button
              className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Voir détails
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
