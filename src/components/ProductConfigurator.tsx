import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Product } from '../data/products';

interface ProductConfiguratorProps {
  product: Product;
}

const ProductConfigurator: React.FC<ProductConfiguratorProps> = ({ product }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>(product.materials[0] || '');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
  const [options, setOptions] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);

  const toggleOption = (option: string) => {
    if (options.includes(option)) {
      setOptions(options.filter(o => o !== option));
    } else {
      setOptions([...options, option]);
    }
  };

  const additionalOptions = [
    'Isolation thermique renforcée',
    'Vitrage anti-effraction',
    'Poignée design premium',
    'Joint acoustique',
    'Motorisation'
  ];

  const steps = [
    { title: "Matériau", description: "Choisissez le matériau qui correspond à vos besoins" },
    { title: "Couleur", description: "Sélectionnez la couleur qui s'harmonise avec votre décoration" },
    { title: "Dimensions", description: "Personnalisez les dimensions selon votre espace" },
    { title: "Options", description: "Ajoutez des options pour améliorer votre produit" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculatePrice = () => {
    let basePrice = product.price;
    
    // Ajustements selon le matériau
    if (selectedMaterial === 'Aluminium') basePrice *= 1.2;
    if (selectedMaterial === 'Mixte bois-alu') basePrice *= 1.35;

    // Ajustements selon les dimensions
    const dimensionFactor = (dimensions.width / 100) * (dimensions.height / 100);
    basePrice *= dimensionFactor > 1 ? dimensionFactor : 1;

    // Ajustements selon les options
    basePrice += options.length * 39.99;

    return basePrice;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Configurez votre {product.name}</h2>

      {/* Indicateur d'étape */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className={`text-xs font-medium ${currentStep >= index ? 'text-blue-800' : 'text-gray-400'}`}
            >
              {step.title}
            </div>
          ))}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div 
            className="h-2 bg-blue-600 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          ></motion.div>
        </div>
      </div>

      {/* Étape 1: Matériaux */}
      {currentStep === 0 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Choisissez le matériau</h3>
          <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.materials.map((material) => (
              <motion.div
                key={material}
                className={`border-2 rounded-lg p-4 cursor-pointer text-center ${
                  selectedMaterial === material ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedMaterial(material)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium">{material}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Étape 2: Couleurs */}
      {currentStep === 1 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Sélectionnez la couleur</h3>
          <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {product.colors.map((color) => (
              <motion.div
                key={color}
                className={`border-2 rounded-lg p-3 cursor-pointer text-center ${
                  selectedColor === color ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedColor(color)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="font-medium">{color}</div>
                <div 
                  className="w-8 h-8 mx-auto mt-2 rounded-full border border-gray-300"
                  style={{ 
                    backgroundColor: 
                      color === 'Blanc' ? 'white' :
                      color === 'Noir' ? 'black' :
                      color === 'Gris anthracite' ? '#3a3a3a' :
                      color === 'Chêne doré' ? '#d4a76a' :
                      color === 'Rouge bordeaux' ? '#8c2332' :
                      color === 'Bleu canard' ? '#007a87' :
                      color === 'Transparent' ? 'rgba(255,255,255,0.3)' :
                      color === 'Dépoli' ? 'rgba(240,240,240,0.5)' : '#aaaaaa'
                  }}
                ></div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Étape 3: Dimensions */}
      {currentStep === 2 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Définissez les dimensions</h3>
          <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Largeur (cm)</label>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 px-3 py-2 rounded-l-md"
                  onClick={() => setDimensions({...dimensions, width: Math.max(50, dimensions.width - 10)})}
                >
                  -
                </button>
                <motion.div 
                  className="flex-1 bg-gray-100 py-2 text-center font-medium"
                  key={dimensions.width}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {dimensions.width} cm
                </motion.div>
                <button 
                  className="bg-gray-200 px-3 py-2 rounded-r-md"
                  onClick={() => setDimensions({...dimensions, width: Math.min(300, dimensions.width + 10)})}
                >
                  +
                </button>
              </div>
              <input 
                type="range" 
                min="50" 
                max="300" 
                value={dimensions.width}
                onChange={(e) => setDimensions({...dimensions, width: parseInt(e.target.value)})}
                className="w-full mt-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hauteur (cm)</label>
              <div className="flex items-center">
                <button 
                  className="bg-gray-200 px-3 py-2 rounded-l-md"
                  onClick={() => setDimensions({...dimensions, height: Math.max(50, dimensions.height - 10)})}
                >
                  -
                </button>
                <motion.div 
                  className="flex-1 bg-gray-100 py-2 text-center font-medium"
                  key={dimensions.height}
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.1 }}
                >
                  {dimensions.height} cm
                </motion.div>
                <button 
                  className="bg-gray-200 px-3 py-2 rounded-r-md"
                  onClick={() => setDimensions({...dimensions, height: Math.min(300, dimensions.height + 10)})}
                >
                  +
                </button>
              </div>
              <input 
                type="range" 
                min="50" 
                max="300" 
                value={dimensions.height}
                onChange={(e) => setDimensions({...dimensions, height: parseInt(e.target.value)})}
                className="w-full mt-2"
              />
            </div>
          </div>

          <div className="mt-6 relative">
            <div className="text-sm text-gray-600 mb-2">Aperçu des proportions :</div>
            <div 
              className="border-4 border-gray-300 bg-blue-50 mx-auto"
              style={{ 
                width: `${dimensions.width}px`, 
                height: `${dimensions.height}px`,
                maxWidth: '100%',
                maxHeight: '300px',
                transform: dimensions.width > 300 ? `scale(${300 / dimensions.width})` : 'none',
                transformOrigin: 'top left'
              }}
            ></div>
          </div>
        </motion.div>
      )}

      {/* Étape 4: Options supplémentaires */}
      {currentStep === 3 && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Options supplémentaires</h3>
          <p className="text-gray-600 mb-4">{steps[currentStep].description}</p>
          
          <div className="space-y-3">
            {additionalOptions.map((option) => (
              <div 
                key={option}
                className="flex items-center p-3 border rounded-lg cursor-pointer"
                onClick={() => toggleOption(option)}
              >
                <div 
                  className={`w-6 h-6 rounded flex items-center justify-center border ${
                    options.includes(option) 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'border-gray-300'
                  }`}
                >
                  {options.includes(option) && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className="ml-3">
                  <div className="font-medium">{option}</div>
                  <div className="text-sm text-gray-500">+ 39,99 €</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Navigation entre les étapes */}
      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`px-4 py-2 rounded-md ${
            currentStep === 0 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-gray-700 text-white hover:bg-gray-800'
          }`}
        >
          Précédent
        </button>

        <div className="text-xl font-bold text-blue-800">
          {calculatePrice().toLocaleString('fr-FR', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0
          })}
        </div>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Suivant
          </button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Ajouter au panier
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default ProductConfigurator;
