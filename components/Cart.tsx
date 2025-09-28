import React from 'react';
import { CloseIcon, PlusIcon, MinusIcon, TrashIcon } from './Icons';
import { CartItem } from '../App';

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemove: (cartItemId: string) => void;
};

export const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
    const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const getItemName = (name: string | string[]) => {
        return Array.isArray(name) ? name.join('') : name;
    }

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
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-xl border-l border-white/60 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div className="flex justify-between items-center p-6 border-b border-white/60">
          <h2 id="cart-heading" className="text-2xl font-bold tracking-tight">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            aria-label="Close cart"
          >
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
            <div className="flex-grow flex items-center justify-center">
                <p className="text-lg text-black/60">Your cart is empty.</p>
            </div>
        ) : (
            <div className="flex-grow overflow-y-auto p-6">
                <ul className="space-y-4">
                    {isOpen && items.map((item, index) => (
                        <li 
                            key={item.cartItemId} 
                            className="flex gap-4 bg-white/40 p-4 rounded-lg shadow animate-slide-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <img src={`${item.galleryImage.split('?')[0]}?auto=compress&cs=tinysrgb&w=200`} alt={getItemName(item.name)} className="w-24 h-24 object-cover rounded-md" />
                            <div className="flex-grow flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold">{getItemName(item.name)}</h3>
                                    <p className="text-sm text-black/70">
                                        Size: {item.selectedSize}
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-black/70">
                                        Color: <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: item.selectedColor }}></span>
                                    </div>
                                    <p className="font-['Roboto_Mono',_monospace] font-bold mt-1">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center border border-gray-300 rounded-full">
                                        <button onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded-l-full disabled:opacity-50 transition-colors" aria-label="Decrease quantity" disabled={item.quantity <= 1}><MinusIcon className="w-4 h-4"/></button>
                                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded-r-full transition-colors" aria-label="Increase quantity"><PlusIcon className="w-4 h-4"/></button>
                                    </div>
                                    <button onClick={() => onRemove(item.cartItemId)} className="text-gray-500 transition-all duration-300 hover:scale-110 hover:text-red-500" aria-label="Remove item">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )}
        
        {items.length > 0 && (
            <div className="p-6 border-t border-white/60">
                <div className="flex justify-between items-center font-bold text-lg">
                    <span>Subtotal</span>
                    <span className="font-['Roboto_Mono',_monospace]">${subtotal.toFixed(2)}</span>
                </div>
                <button className="w-full mt-4 text-lg font-medium py-3 px-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5">
                    Proceed to Checkout
                </button>
            </div>
        )}

      </div>
    </>
  );
};