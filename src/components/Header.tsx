import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.header 
      className="bg-white shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/">
          <motion.div 
            className="flex items-center" 
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl font-bold text-blue-800">MaisonDeco</span>
            <span className="ml-1 text-sm text-gray-600 mt-1">menuiseries sur mesure</span>
          </motion.div>
        </Link>
        
        {/* Menu pour desktop */}
        <nav className="hidden md:flex space-x-8">
          <NavLink to="/" label="Accueil" />
          <NavLink to="/catalogue" label="Catalogue" />
          <NavLink to="/configurateur" label="Configurateur" />
          <NavLink to="/contact" label="Contact" />
        </nav>
        
        <div className="flex items-center space-x-4">
          <motion.div 
            className="hidden md:flex items-center cursor-pointer"
            whileHover={{ scale: 1.1 }}
          >
            <Link to="/panier" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
            </Link>
          </motion.div>
          
          <motion.button 
            className="md:hidden focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Menu pour mobile */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-white p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col space-y-4">
            <MobileNavLink to="/" label="Accueil" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/catalogue" label="Catalogue" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/configurateur" label="Configurateur" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/contact" label="Contact" onClick={() => setIsMenuOpen(false)} />
            <MobileNavLink to="/panier" label="Panier (2)" onClick={() => setIsMenuOpen(false)} />
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label }) => {
  return (
    <Link to={to}>
      <motion.span 
        className="text-gray-700 font-medium hover:text-blue-800"
        whileHover={{ y: -2 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {label}
      </motion.span>
    </Link>
  );
};

interface MobileNavLinkProps {
  to: string;
  label: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick }) => {
  return (
    <Link to={to} onClick={onClick}>
      <motion.div 
        className="py-2 px-4 text-gray-700 hover:bg-gray-100 rounded-md"
        whileTap={{ backgroundColor: "#EDF2F7" }}
      >
        {label}
      </motion.div>
    </Link>
  );
};

export default Header;
