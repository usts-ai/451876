import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-10 pb-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">MaisonDeco</h3>
            <p className="text-gray-400 mb-4">Votre spécialiste de la menuiserie sur mesure depuis 1995. Qualité, fiabilité et service client irréprochable.</p>
            <div className="flex space-x-4 mt-4">
              <SocialIcon icon="facebook" />
              <SocialIcon icon="instagram" />
              <SocialIcon icon="linkedin" />
              <SocialIcon icon="pinterest" />
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Nos produits</h4>
            <ul className="space-y-2">
              <FooterLink to="/catalogue/fenetres" label="Fenêtres" />
              <FooterLink to="/catalogue/portes" label="Portes" />
              <FooterLink to="/catalogue/volets" label="Volets" />
              <FooterLink to="/catalogue/accessoires" label="Accessoires" />
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Services</h4>
            <ul className="space-y-2">
              <FooterLink to="/configurateur" label="Configurateur 3D" />
              <FooterLink to="/devis" label="Devis gratuit" />
              <FooterLink to="/installation" label="Service de pose" />
              <FooterLink to="/sav" label="SAV & Garanties" />
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-4">Contact</h4>
            <address className="text-gray-400 not-italic">
              <p>12 rue des Artisans</p>
              <p>75001 Paris, France</p>
              <p className="mt-2">Tél: 01 23 45 67 89</p>
              <p>Email: contact@maisondeco.fr</p>
            </address>
          </div>
        </div>

        <hr className="border-gray-700 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© 2025 MaisonDeco. Tous droits réservés.</p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="/mentions-legales" className="hover:text-white">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-white">Politique de confidentialité</Link>
            <Link to="/cgv" className="hover:text-white">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  to: string;
  label: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, label }) => {
  return (
    <li>
      <Link to={to}>
        <motion.span 
          className="text-gray-400 hover:text-white"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {label}
        </motion.span>
      </Link>
    </li>
  );
};

interface SocialIconProps {
  icon: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ icon }) => {
  return (
    <motion.a 
      href={`#${icon}`} 
      className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-blue-600"
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="sr-only">{icon}</span>
      <i className={`fab fa-${icon} text-white`}></i>
    </motion.a>
  );
};

export default Footer;
