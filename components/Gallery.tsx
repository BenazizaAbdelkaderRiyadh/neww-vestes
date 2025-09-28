import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from './Icons';

type GalleryProduct = {
  id: number;
  galleryImage: string;
};

type GalleryProps = {
  products: GalleryProduct[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

export const Gallery: React.FC<GalleryProps> = ({ products, selectedIndex, onSelect }) => {

  const handlePrev = () => {
    onSelect((selectedIndex - 1 + products.length) % products.length);
  };

  const handleNext = () => {
    onSelect((selectedIndex + 1) % products.length);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg">
      <div className="flex items-center gap-4">
        <div className="grid grid-cols-2 gap-4 flex-grow">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 ${
                selectedIndex === index ? 'ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-white/50 animate-pop' : ''
              }`}
              onClick={() => onSelect(index)}
              role="button"
              aria-label={`Select image ${index + 1}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onSelect(index)}
            >
              <img
                src={`${product.galleryImage.split('?')[0]}?auto=compress&cs=tinysrgb&w=400`}
                alt={`Gallery item ${product.id}`}
                className="w-full h-full object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-colors"></div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4">
            <button onClick={handlePrev} aria-label="Previous image" className="p-1 text-gray-600 hover:text-black transition-transform duration-300 hover:scale-110">
                <ArrowUpIcon className="w-6 h-6" />
            </button>
            <button onClick={handleNext} aria-label="Next image" className="p-1 text-gray-600 hover:text-black transition-transform duration-300 hover:scale-110">
                <ArrowDownIcon className="w-6 h-6" />
            </button>
        </div>
      </div>
    </div>
  );
};