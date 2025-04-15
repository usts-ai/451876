import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products, getProductsByCategory } from '../data/products';

const CataloguePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fenetre' | 'porte' | 'volet'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tous les produits' },
    { id: 'fenetre', name: 'Fenêtres' },
    { id: 'porte', name: 'Portes' },
    { id: 'volet', name: 'Volets' }
  ];

  const getFilteredProducts = () => {
    let filteredProducts = activeCategory === 'all' ? products : getProductsByCategory(activeCategory as 'fenetre' | 'porte' | 'volet');
    
    if (searchTerm.trim()) {
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filteredProducts;
  };

  const filteredProducts = getFilteredProducts();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Notre catalogue de menuiseries sur mesure
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de fenêtres, portes et volets de qualité supérieure, 
              fabriqués sur mesure pour s'adapter parfaitement à votre intérieur.
            </p>
          </div>

          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  } transition-colors duration-200`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category.id as 'all' | 'fenetre' | 'porte' | 'volet')}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Résultats du catalogue */}
          {filteredProducts.length > 0 ? (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredProducts.map((product) => (
                <motion.div key={product.id} variants={itemVariants}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12 bg-white rounded-lg shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun produit trouvé</h3>
              <p className="mt-1 text-gray-500">Essayez de modifier vos critères de recherche.</p>
              <div className="mt-6">
                <button
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  Réinitialiser les filtres
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* Section Contact */}
          <motion.div 
            className="mt-16 bg-indigo-600 text-white rounded-xl p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Besoin d'un conseil personnalisé ?</h3>
                <p className="text-indigo-100">
                  Nos experts sont disponibles pour vous aider à choisir la menuiserie adaptée à vos besoins.
                </p>
              </div>
              <motion.button
                className="px-6 py-3 bg-white text-indigo-600 rounded-lg font-medium shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Demander un rendez-vous
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CataloguePage;
