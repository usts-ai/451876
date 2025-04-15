import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getFeaturedProducts } from '../data/products';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 15
      }
    }
  };

  return (
    <div>
      {/* Section Héro */}
      <motion.section 
        className="relative h-screen bg-gradient-to-r from-blue-900 to-blue-600 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        {/* Contenu principal */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Menuiseries sur mesure pour votre habitat d'exception
              </motion.h1>
              
              <motion.p 
                className="text-xl text-white opacity-90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Personnalisez vos fenêtres, portes et volets selon vos envies et découvrez notre qualité artisanale française depuis 1995.
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Link to="/configurateur">
                  <motion.button 
                    className="bg-white text-blue-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Configurer mon projet
                  </motion.button>
                </Link>
                
                <Link to="/catalogue">
                  <motion.button 
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Découvrir nos produits
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Animation de défilement */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div 
            className="text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 0], 
              y: [0, 10, 0] 
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <span className="block mb-2 text-sm">Découvrir plus</span>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 mx-auto" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Avantages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Pourquoi choisir MaisonDeco ?
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <FeatureCard 
              icon="🛠️" 
              title="Fabrication sur mesure" 
              description="Des produits uniques créés spécifiquement selon vos besoins et dimensions."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="🇫🇷" 
              title="Fabrication française" 
              description="Tous nos produits sont fabriqués en France par des artisans qualifiés."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="💯" 
              title="Qualité garantie" 
              description="Des matériaux premium et une garantie de 10 ans sur tous nos produits."
              variants={itemVariants}
            />
            <FeatureCard 
              icon="🚚" 
              title="Installation professionnelle" 
              description="Une équipe de poseurs experts pour une installation parfaite."
              variants={itemVariants}
            />
          </motion.div>
        </div>
      </section>

      {/* Section Produits en vedette */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <motion.h2 
              className="text-3xl font-bold text-gray-800"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Nos produits en vedette
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link to="/catalogue">
                <motion.button 
                  className="text-blue-600 font-medium hover:underline flex items-center"
                  whileHover={{ x: 5 }}
                >
                  Voir tout notre catalogue
                  <svg className="ml-1 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Configurateur */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center">
            <motion.div 
              className="lg:w-1/2 mb-10 lg:mb-0"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Configurez votre projet en quelques clics</h2>
              <p className="text-blue-100 mb-8 text-lg">
                Notre configurateur 3D vous permet de personnaliser votre menuiserie en temps réel : dimensions, matériaux, couleurs, options... Visualisez votre projet et obtenez un devis instantané !
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/configurateur">
                  <motion.button 
                    className="bg-white text-blue-800 px-6 py-3 rounded-full font-medium hover:bg-blue-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Essayer le configurateur
                  </motion.button>
                </Link>
                
                <Link to="/demo">
                  <motion.button 
                    className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Voir la démonstration
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 lg:pl-16"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="text-xs text-gray-500 font-medium ml-2">Configurateur 3D</div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-4">
                    <div className="text-gray-800 font-medium">Fenêtre sur mesure</div>
                    <div className="text-blue-600 font-bold">1 249 €</div>
                  </div>
                  
                  <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <div>Matériau</div>
                      <div className="font-medium text-gray-800">Aluminium</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Couleur</div>
                      <div className="font-medium text-gray-800">Gris anthracite</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Dimensions</div>
                      <div className="font-medium text-gray-800">120 × 100 cm</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Options</div>
                      <div className="font-medium text-gray-800">Double vitrage, Anti-bruit</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="font-bold mb-1">Aperçu 3D</div>
                      <div className="text-xs">Visualisation interactive</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ce que nos clients disent de nous
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              quote="La qualité des fenêtres est exceptionnelle et l'isolation thermique incomparable. Le service client a été très réactif et professionnel."
              author="Sophie Martin"
              position="Propriétaire à Lyon"
            />
            <Testimonial 
              quote="Le configurateur en ligne est vraiment intuitif et m'a permis de visualiser parfaitement mes futures portes. Installation impeccable."
              author="Thomas Dubois"
              position="Architecte d'intérieur"
            />
            <Testimonial 
              quote="Des volets sur mesure qui s'adaptent parfaitement à nos fenêtres atypiques. Un grand merci pour le conseil et le suivi de projet."
              author="Marie Leroy"
              position="Maison rénovée à Bordeaux"
            />
          </div>
        </div>
      </section>

      {/* Section Appel à l'action */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Prêt à transformer votre habitat ?
          </motion.h2>
          
          <motion.p 
            className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Nos experts sont à votre disposition pour vous accompagner dans votre projet de menuiseries sur mesure. Demandez un devis gratuit ou prenez rendez-vous en boutique.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Link to="/devis">
              <motion.button 
                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Demander un devis gratuit
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button 
                className="bg-white text-blue-800 border border-blue-800 px-6 py-3 rounded-full font-semibold hover:bg-blue-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Contacter un conseiller
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

// Composants auxiliaires
interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  variants: any;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, variants }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md"
      variants={variants}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, author, position }) => {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-2xl text-blue-600 mb-4">"</div>
      <p className="text-gray-700 italic mb-4">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
        <div>
          <div className="font-medium text-gray-800">{author}</div>
          <div className="text-sm text-gray-500">{position}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
