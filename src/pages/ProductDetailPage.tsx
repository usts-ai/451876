import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProductById, Product } from '../data/products';
import Configurator from '../components/Configurator';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'configurator'>('description');
  const [selectedImage, setSelectedImage] = useState(0);

  // Simulation de chargement de données
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const foundProduct = productId ? getProductById(productId) : null;
      setProduct(foundProduct || null);
      setIsLoading(false);
    }, 500);
  }, [productId]);

  // Gestion du cas où le produit n'est pas trouvé
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center bg-white p-8 rounded-lg shadow">
            <svg className="w-16 h-16 text-indigo-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Produit non trouvé</h1>
            <p className="text-gray-600 mb-6">Le produit que vous recherchez n'existe pas ou a été retiré de notre catalogue.</p>
            <Link to="/catalogue">
              <motion.button
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Retourner au catalogue
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Images mockées pour la galerie
  const productImages = [
    product.image || 'https://via.placeholder.com/600x400?text=Image+Produit',
    'https://via.placeholder.com/600x400?text=Vue+Intérieure',
    'https://via.placeholder.com/600x400?text=Vue+Détaillée'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Galerie d'images */}
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                <motion.img 
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-64 md:h-96 object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key={selectedImage}
                  transition={{ duration: 0.5 }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/600x400?text=Image+Non+Disponible';
                  }}
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {productImages.map((img, index) => (
                  <motion.button
                    key={index}
                    className={`flex-shrink-0 w-20 h-20 bg-gray-100 rounded ${
                      selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img}
                      alt={`${product.name} - vue ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Image';
                      }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Informations produit */}
            <div className="p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center mb-2">
                  <Link to="/catalogue" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Catalogue
                  </Link>
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-600">
                    {product.category === 'fenetre' ? 'Fenêtres' : 
                     product.category === 'porte' ? 'Portes' : 'Volets'}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                <div className="mb-5">
                  <div className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {product.category === 'fenetre' ? 'Fenêtre' : 
                     product.category === 'porte' ? 'Porte' : 'Volet'}
                  </div>
                </div>
                
                <div className="text-2xl font-bold text-indigo-600 mb-6">
                  {product.price.toLocaleString('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0
                  })}
                  <span className="text-sm text-gray-500 font-normal ml-2">TTC</span>
                </div>
                
                <p className="text-gray-700 mb-6">{product.description}</p>
                
                <div className="flex space-x-4 mb-6">
                  <motion.button
                    className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Ajouter au panier
                  </motion.button>
                  <Link to={`/configurateur?type=${product.category}`}>
                    <motion.button
                      className="flex-1 border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Configurer
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Onglets d'information */}
          <div className="border-t border-gray-200">
            <div className="flex overflow-x-auto border-b border-gray-200">
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'description'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'specifications'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('specifications')}
              >
                Caractéristiques
              </button>
              <button
                className={`py-4 px-6 text-sm font-medium ${
                  activeTab === 'configurator'
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('configurator')}
              >
                Configurateur
              </button>
            </div>
            
            <div className="p-6">
              {activeTab === 'description' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">À propos de ce produit</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <p className="text-gray-600">
                    Nos menuiseries sont fabriquées sur mesure dans nos ateliers français, selon un savoir-faire artisanal 
                    alliant tradition et technologies de pointe. Nous utilisons uniquement des matériaux de qualité 
                    supérieure pour vous garantir des produits durables et performants.
                  </p>
                </motion.div>
              )}
              
              {activeTab === 'specifications' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Spécifications techniques</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Caractéristiques</h4>
                      <ul className="space-y-2">
                        {product.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Matériaux disponibles</h4>
                      <ul className="space-y-2">
                        {product.materials.map((material, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <svg className="w-5 h-5 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            {material}
                          </li>
                        ))}
                      </ul>
                      
                      <h4 className="font-medium text-gray-700 mt-6 mb-2">Coloris disponibles</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                          >
                            {color}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'configurator' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">
                    Configurez votre {product.category === 'fenetre' ? 'fenêtre' : product.category === 'porte' ? 'porte' : 'volet'} sur mesure
                  </h3>
                  <Configurator productType={product.category} />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Produits recommandés - section optionnelle qui pourrait être ajoutée */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
