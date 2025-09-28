import React from 'react';
import { CloseIcon } from './Icons';

type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const menuItems = ['Collections', 'New Releases', 'About', 'Contact'];

export const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-l border-white/60 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-heading"
      >
        <div className="flex justify-between items-center p-8">
          <h2 id="menu-heading" className="text-2xl font-bold tracking-tight">
            Navigation
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav className="mt-8">
          <ul>
            {isOpen && menuItems.map((item, index) => (
              <li 
                key={item}
                className="animate-slide-in-up"
                style={{ animationDelay: `${150 + index * 75}ms` }}
              >
                <a
                  href="#"
                  className="block px-8 py-4 text-lg font-medium text-black/80 hover:bg-black/5 transition-colors"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};