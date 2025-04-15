import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Types pour le configurateur
interface ConfigOption {
  id: string;
  name: string;
  price: number;
}

interface ConfiguratorProps {
  productType: 'fenetre' | 'porte' | 'volet';
}

const Configurator: React.FC<ConfiguratorProps> = ({ productType }) => {
  // États pour les différentes options de configuration
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedDimension, setSelectedDimension] = useState<string>('standard');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [basePrice] = useState(200);
  
  // Options de matériaux selon le type de produit
  const materials: ConfigOption[] = [
    { id: 'pvc', name: 'PVC', price: 0 },
    { id: 'aluminium', name: 'Aluminium', price: 150 },
    { id: 'bois', name: 'Bois', price: 250 },
    ...(productType === 'fenetre' ? [{ id: 'mixte', name: 'Mixte bois-alu', price: 350 }] : [])
  ];

  // Options de couleurs selon le type de produit
  const colors: ConfigOption[] = [
    { id: 'blanc', name: 'Blanc', price: 0 },
    { id: 'gris', name: 'Gris anthracite', price: 50 },
    { id: 'noir', name: 'Noir', price: 50 },
    ...(productType === 'porte' ? [{ id: 'rouge', name: 'Rouge bordeaux', price: 75 }] : []),
    ...(productType === 'volet' ? [{ id: 'bleu', name: 'Bleu lavande', price: 75 }] : [])
  ];

  // Options de dimensions
  const dimensions: ConfigOption[] = [
    { id: 'standard', name: 'Standard', price: 0 },
    { id: 'sur-mesure-petit', name: 'Sur mesure (petit)', price: 100 },
    { id: 'sur-mesure-moyen', name: 'Sur mesure (moyen)', price: 200 },
    { id: 'sur-mesure-grand', name: 'Sur mesure (grand)', price: 300 }
  ];

  // Options additionnelles selon le type de produit
  const additionalOptions: ConfigOption[] = [
    ...(productType === 'fenetre' ? [
      { id: 'double-vitrage', name: 'Double vitrage renforcé', price: 100 },
      { id: 'isolation-thermique', name: 'Isolation thermique premium', price: 150 }
    ] : []),
    ...(productType === 'porte' ? [
      { id: 'serrure-securite', name: 'Serrure haute sécurité', price: 200 },
      { id: 'judas', name: 'Judas numérique', price: 120 }
    ] : []),
    ...(productType === 'volet' ? [
      { id: 'motorisation', name: 'Motorisation électrique', price: 250 },
      { id: 'commande-distance', name: 'Commande à distance', price: 100 }
    ] : [])
  ];

  // Calcul du prix total basé sur les sélections
  const calculateTotalPrice = () => {
    let totalPrice = basePrice;
    
    // Ajout du prix du matériau
    const selectedMaterialOption = materials.find(m => m.id === selectedMaterial);
    if (selectedMaterialOption) {
      totalPrice += selectedMaterialOption.price;
    }
    
    // Ajout du prix de la couleur
    const selectedColorOption = colors.find(c => c.id === selectedColor);
    if (selectedColorOption) {
      totalPrice += selectedColorOption.price;
    }
    
    // Ajout du prix de la dimension
    const selectedDimensionOption = dimensions.find(d => d.id === selectedDimension);
    if (selectedDimensionOption) {
      totalPrice += selectedDimensionOption.price;
    }
    
    // Ajout des prix des options additionnelles
    selectedOptions.forEach(optionId => {
      const option = additionalOptions.find(o => o.id === optionId);
      if (option) {
        totalPrice += option.price;
      }
    });
    
    return totalPrice;
  };

  // Gestion des options additionnelles
  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId) 
        : [...prev, optionId]
    );
  };

  // Titre du produit selon le type
  const getProductTitle = () => {
    switch(productType) {
      case 'fenetre': return 'votre fenêtre';
      case 'porte': return 'votre porte';
      case 'volet': return 'votre volet';
      default: return 'votre menuiserie';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <motion.h2 
        className="text-2xl font-bold text-gray-800 mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Configurez {getProductTitle()} sur mesure
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div 
          className="bg-gray-50 p-4 rounded-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Preview du produit avec illustration dynamique */}
          <div className="h-64 flex items-center justify-center border border-gray-200 rounded-lg bg-white relative">
            {selectedMaterial && selectedColor ? (
              <motion.div 
                className="w-4/5 h-4/5" 
                style={{ 
                  backgroundColor: selectedColor === 'blanc' ? '#ffffff' : 
                                  selectedColor === 'gris' ? '#4a4a4a' : 
                                  selectedColor === 'noir' ? '#1a1a1a' : 
                                  selectedColor === 'rouge' ? '#7f1d1d' : 
                                  selectedColor === 'bleu' ? '#4f6aa8' : '#ffffff',
                  border: '8px solid',
                  borderColor: selectedMaterial === 'pvc' ? '#e5e7eb' : 
                              selectedMaterial === 'aluminium' ? '#9ca3af' : 
                              selectedMaterial === 'bois' ? '#92400e' :
                              selectedMaterial === 'mixte' ? '#92400e' : '#e5e7eb'
                }}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {productType === 'fenetre' && (
                  <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
                    <div className="border border-gray-300"></div>
                    <div className="border border-gray-300"></div>
                    <div className="border border-gray-300"></div>
                    <div className="border border-gray-300"></div>
                  </div>
                )}
                {productType === 'porte' && (
                  <div className="flex flex-col h-full">
                    <div className="flex-grow border-b border-gray-300 flex items-center justify-center">
                      {selectedOptions.includes('judas') && (
                        <div className="rounded-full w-4 h-4 bg-gray-400"></div>
                      )}
                    </div>
                    <div className="h-12 flex items-center justify-end pr-4">
                      <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                    </div>
                  </div>
                )}
                {productType === 'volet' && (
                  <div className="grid grid-cols-4 h-full">
                    <div className="border-r border-gray-300"></div>
                    <div className="border-r border-gray-300"></div>
                    <div className="border-r border-gray-300"></div>
                    <div></div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="text-gray-400">
                Sélectionnez un matériau et une couleur pour visualiser
              </div>
            )}
          </div>

          {/* Prix total */}
          <div className="mt-6">
            <div className="text-xl font-bold text-indigo-600 flex justify-between items-center">
              <span>Prix estimé:</span>
              <motion.span
                key={calculateTotalPrice()}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {calculateTotalPrice().toLocaleString('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 0
                })}
              </motion.span>
            </div>
            <p className="text-sm text-gray-500 mt-1">Prix TTC, livraison non incluse</p>
          </div>

          <div className="mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Ajouter au panier
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-3 border border-indigo-600 text-indigo-600 py-3 px-6 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Demander un devis détaillé
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Options de matériau */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Matériau</h3>
            <div className="grid grid-cols-2 gap-3">
              {materials.map((material) => (
                <motion.button
                  key={material.id}
                  className={`p-3 rounded-lg text-sm border ${
                    selectedMaterial === material.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:border-indigo-200'
                  } flex justify-between items-center`}
                  onClick={() => setSelectedMaterial(material.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{material.name}</span>
                  {material.price > 0 && (
                    <span className="text-xs text-gray-500">+{material.price}€</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Options de couleurs */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Couleur</h3>
            <div className="grid grid-cols-2 gap-3">
              {colors.map((color) => (
                <motion.button
                  key={color.id}
                  className={`p-3 rounded-lg text-sm border ${
                    selectedColor === color.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:border-indigo-200'
                  } flex justify-between items-center`}
                  onClick={() => setSelectedColor(color.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{color.name}</span>
                  {color.price > 0 && (
                    <span className="text-xs text-gray-500">+{color.price}€</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Options de dimensions */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Dimensions</h3>
            <div className="grid grid-cols-2 gap-3">
              {dimensions.map((dimension) => (
                <motion.button
                  key={dimension.id}
                  className={`p-3 rounded-lg text-sm border ${
                    selectedDimension === dimension.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:border-indigo-200'
                  } flex justify-between items-center`}
                  onClick={() => setSelectedDimension(dimension.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{dimension.name}</span>
                  {dimension.price > 0 && (
                    <span className="text-xs text-gray-500">+{dimension.price}€</span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Options additionnelles */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Options additionnelles</h3>
            <div className="space-y-3">
              {additionalOptions.map((option) => (
                <motion.div
                  key={option.id}
                  className={`p-3 rounded-lg text-sm border ${
                    selectedOptions.includes(option.id)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 text-gray-700 hover:border-indigo-200'
                  } flex justify-between items-center cursor-pointer`}
                  onClick={() => toggleOption(option.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={option.id}
                      checked={selectedOptions.includes(option.id)}
                      onChange={() => toggleOption(option.id)}
                      className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor={option.id} className="cursor-pointer">
                      {option.name}
                    </label>
                  </div>
                  <span className="text-xs text-gray-500">+{option.price}€</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Configurator;
