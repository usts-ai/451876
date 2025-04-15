import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Configurator from '../components/Configurator';

const ConfigurateurPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<'fenetre' | 'porte' | 'volet'>('fenetre');
  
  const productTypes = [
    { id: 'fenetre', name: 'Fenêtre' },
    { id: 'porte', name: 'Porte' },
    { id: 'volet', name: 'Volet' }
  ] as const;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-2">
            Configurateur de menuiseries
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Personnalisez votre projet selon vos besoins et obtenez un aperçu visuel ainsi qu'une estimation de prix en temps réel
          </p>

          {/* Sélecteur de type de produit */}
          <div className="flex justify-center gap-4 mb-8">
            {productTypes.map((type) => (
              <motion.button
                key={type.id}
                className={`px-6 py-3 rounded-full text-sm font-semibold ${
                  selectedType === type.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type.id as 'fenetre' | 'porte' | 'volet')}
              >
                {type.name}
              </motion.button>
            ))}
          </div>

          {/* Étapes de configuration */}
          <div className="mb-12">
            <ol className="flex items-center w-full">
              <li className="flex w-full items-center text-indigo-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-indigo-200 after:border-4 after:inline-block">
                <span className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                  <svg className="w-4 h-4 text-indigo-600 lg:w-6 lg:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 11.5A2.5 2.5 0 0 1 6 9h9a2.5 2.5 0 0 1 2.5 2.5V12h-14v-.5Z"/>
                  </svg>
                </span>
              </li>
              <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-4 after:inline-block">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                  <svg className="w-4 h-4 text-gray-500 lg:w-6 lg:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                    <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                  </svg>
                </span>
              </li>
              <li className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
                  <svg className="w-4 h-4 text-gray-500 lg:w-6 lg:h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z"/>
                  </svg>
                </span>
              </li>
            </ol>
          </div>

          {/* Configurateur */}
          <motion.div
            key={selectedType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Configurator productType={selectedType} />
          </motion.div>

          {/* Section d'aide */}
          <div className="mt-16 bg-indigo-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-indigo-800 mb-4">
              Besoin d'aide pour votre projet ?
            </h3>
            <p className="text-gray-700 mb-6">
              Nos experts menuisiers sont disponibles pour vous accompagner dans votre projet et répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center text-indigo-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center text-indigo-700">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>contact@maisonsurmesure.fr</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConfigurateurPage;
