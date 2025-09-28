import React from 'react';
import { Product } from '../App';
import { Logo } from './Logo';
import { ArrowRightIcon } from './Icons';

type ProductDetailProps = {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: Product, size: string, color: string) => void;
};

const sizes = ['S', 'M', 'L', 'XL'];

export const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = React.useState('M');
  const [selectedColor, setSelectedColor] = React.useState(product.variants[0].color);
  const [currentImage, setCurrentImage] = React.useState(product.variants[0].image);
  const [isAdded, setIsAdded] = React.useState(false);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    const newVariant = product.variants.find(v => v.color === color);
    if (newVariant) {
        setCurrentImage(newVariant.image);
    }
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setIsAdded(true);
    setTimeout(() => {
        setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-2 animate-fade-in">
      <div className="relative h-[50vh] lg:h-screen bg-[#E5DCE9]">
        <img
          key={currentImage}
          src={currentImage}
          alt={product.description}
          className="w-full h-full object-cover object-center animate-image-cross-fade"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <button
          onClick={onBack}
          className="absolute top-8 left-8 text-sm font-medium py-2 px-3 border border-gray-400/80 rounded-full hover:border-gray-500/80 transition-all duration-300 bg-white/40 backdrop-blur-md hover:scale-105"
        >
          &larr; Back to Showcase
        </button>
      </div>

      <div className="flex flex-col justify-center p-8 lg:p-16 overflow-hidden">
        <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}>
            <Logo nameParts={product.name} />
        </div>
        <p className="mt-4 text-lg leading-relaxed text-black/80 animate-slide-in-up" style={{ animationDelay: '300ms' }}>
          {product.description}
        </p>

        <div className="mt-8 animate-slide-in-up" style={{ animationDelay: '400ms' }}>
          <h3 className="text-sm font-bold tracking-widest text-black/60 uppercase">Color</h3>
          <div className="flex gap-3 mt-2">
            {product.variants.map(({ color }) => (
              <button
                key={color}
                onClick={() => handleColorSelect(color)}
                className={`w-8 h-8 rounded-full transition-transform duration-300 hover:scale-110 ${selectedColor === color ? 'ring-2 ring-fuchsia-500 ring-offset-2 ring-offset-white' : ''}`}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>
        
        <div className="mt-8 animate-slide-in-up" style={{ animationDelay: '500ms' }}>
          <h3 className="text-sm font-bold tracking-widest text-black/60 uppercase">Size</h3>
          <div className="flex gap-3 mt-2">
            {sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center font-bold border rounded-lg transition-all duration-300 ${selectedSize === size ? 'bg-black text-white border-black' : 'border-gray-300 hover:border-black hover:scale-105'}`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between animate-slide-in-up" style={{ animationDelay: '600ms' }}>
            <span className="text-4xl font-['Roboto_Mono',_monospace] font-bold">${product.price.toFixed(2)}</span>
            <button 
                onClick={handleAddToCartClick}
                disabled={isAdded}
                className="group flex items-center justify-between w-48 text-lg font-medium py-3 px-4 border border-transparent rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
                <span>{isAdded ? 'Added!' : 'Add to Cart'}</span>
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-fuchsia-500/80 transition-transform duration-300 group-hover:translate-x-1 transform-gpu">
                  <ArrowRightIcon className="w-4 h-4 text-white" />
                </div>
            </button>
        </div>
      </div>
    </div>
  );
};