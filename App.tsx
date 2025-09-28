import React, { useState } from 'react';
import { Gallery } from './components/Gallery';
import { Logo } from './components/Logo';
import { MenuIcon, ArrowRightIcon, CartIcon } from './components/Icons';
import { Menu } from './components/Menu';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { NewReleasesPage } from './components/NewReleasesPage';
import { OutfitDetailPage } from './components/OutfitDetailPage';

export interface ColorVariant {
    color: string;
    image: string;
}

export interface BaseItem {
    id: number;
    name: string | [string, string, string];
    description: string;
    price: number;
    galleryImage: string;
}

export interface Product extends BaseItem {
    name: [string, string, string];
    variants: ColorVariant[];
    releaseImage: string;
}

export interface Outfit extends BaseItem {
    name: string;
    variants: ColorVariant[];
}

export type ShopItem = Product | Outfit;

export interface CartItem extends BaseItem {
    cartItemId: string;
    selectedSize: string;
    selectedColor: string;
    quantity: number;
}

const products: Product[] = [
    {
        id: 1,
        name: ['Aero', '', 'Nova'],
        description: 'The Aero Nova puffer blends lightweight insulation with a futuristic cut, keeping you warm while looking sharp in any season.',
        variants: [
            { color: '#F0EBF4', image: "./assets/1.png" },
            { color: '#333333', image: "./assets/2.png" },
            { color: '#8675A9', image: "./assets/4.png" },
        ],
        galleryImage: "./assets/1.png",
        releaseImage: "./assets/1.png",
        price: 399.99,
    },
    {
        id: 2,
        name: ['Terra', '', 'Edge'],
        description: 'Designed for the outdoors,the Terra Edge jacket combines water resistance, breathability,and is durable for all-weathers.',
        variants: [
            { color: '#304FFE', image: "./assets/10.png" },
            { color: '#ef5420ff', image: "./assets/6.png" },
            { color: '#C0C0C0', image: "./assets/17.png" },
        ],
        galleryImage: "./assets/10.png",
        releaseImage: "./assets/10.png",
        price: 449.99,
    },
    {
        id: 3,
        name: ['Neo', '', 'Tek'],
        description: 'A sleek, urban-ready jacket with a tech-inspired silhouette. It is designed for everyday style with performance at its core.',
        variants: [
            { color: '#212121', image: "./assets/18.png" },
            { color: '#FFFFFF', image: "./assets/20.png" },
            { color: '#00C853', image: "./assets/19.png" },
        ],
        galleryImage: "./assets/18.png",
        releaseImage: "./assets/18.png",
        price: 479.99,
    },
    {
        id: 4,
        name: ['Urban', '', 'Core'],
        description: 'The Urban Core veste merges city style with functional design. Featuring adjustable fit and breathable fabrics for all-day wear.',
        variants: [
            { color: '#CD7F32', image: "./assets/21.png" },
            { color: '#D1D1D1', image: "./assets/22.png" },
            { color: '#000270ff', image: "./assets/23.png" },

        ],
        galleryImage: "./assets/21.png",
        releaseImage: "./assets/21.png",
        price: 379.99,
    },
];

const newOutfits: Outfit[] = [
    { 
        id: 101, 
        name: 'Urban Core', 
        description: 'The Urban Core veste merges city style with functional design. Featuring adjustable fit and breathable fabrics for all-day wear.',
        variants: [
            { color: '#CD7F32', image: "./assets/21.png" },
            { color: '#D1D1D1', image: "./assets/22.png" },
            { color: '#000270ff', image: "./assets/23.png" },

        ],
        galleryImage: "./assets/21.png",
        price: 379.99,
    },
    { 
        id: 102, 
        name: 'Neo Tek', 
        description: 'A sleek, urban-ready jacket with a tech-inspired silhouette. It is designed for everyday style with performance at its core.',
        variants: [
            { color: '#00C853', image: "./assets/19.png" },
            { color: '#212121', image: "./assets/18.png" },
            { color: '#FFFFFF', image: "./assets/20.png" },

        ],
        galleryImage: "./assets/19.png",
        price: 479.99,
    },
    { 
        id: 103, 
        name: 'Aero Nova', 
        description: 'The Aero Nova puffer blends lightweight insulation with a futuristic cut, keeping you warm while looking sharp in any season.',
        variants: [
            { color: '#333333', image: "./assets/2.png" },
            { color: '#F0EBF4', image: "./assets/1.png" },
            { color: '#8675A9', image: "./assets/4.png" },
        ],
        galleryImage: "./assets/2.png",
        price: 399.99,
    },
    
];

const App: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'showcase' | 'detail' | 'new-releases' | 'outfit-detail'>('showcase');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedOutfit, setSelectedOutfit] = useState<Outfit | null>(null);

  const selectedProduct = products[selectedIndex];

  const handleDiscoverClick = () => setCurrentView('detail');
  const handleBackToShowcase = () => setCurrentView('showcase');
  const handleGoToNewReleases = () => setCurrentView('new-releases');
  const handleBackToNewReleases = () => setCurrentView('new-releases');
  
  const handleViewOutfitDetails = (outfit: Outfit) => {
    setSelectedOutfit(outfit);
    setCurrentView('outfit-detail');
  };

  const handleAddToCart = (item: ShopItem, selectedSize: string, selectedColor: string) => {
    const cartItemId = `${item.id}-${selectedSize}-${selectedColor}`;

    const selectedVariant = item.variants.find(v => v.color === selectedColor);
    const variantImage = selectedVariant ? selectedVariant.image : item.galleryImage;

    setCart(prevCart => {
        const existingItem = prevCart.find(item => item.cartItemId === cartItemId);
        if (existingItem) {
            return prevCart.map(cartItem => 
                cartItem.cartItemId === cartItemId 
                    ? { ...cartItem, quantity: cartItem.quantity + 1 }
                    : cartItem
            );
        } else {
            return [...prevCart, { 
                ...item,
                galleryImage: variantImage,
                cartItemId, 
                selectedSize, 
                selectedColor, 
                quantity: 1 
            }];
        }
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
      setCart(prevCart => 
          prevCart.map(item => 
              item.cartItemId === cartItemId
                  ? { ...item, quantity: newQuantity }
                  : item
          ).filter(item => item.quantity > 0)
      );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
      setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="relative w-full min-h-screen bg-[#F0EBF4] text-black overflow-hidden">
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onUpdateQuantity={handleUpdateCartQuantity} 
        onRemove={handleRemoveFromCart} 
      />
      
      {currentView === 'detail' && (
        <ProductDetail product={selectedProduct} onBack={handleBackToShowcase} onAddToCart={handleAddToCart} />
      )}

      {currentView === 'new-releases' && (
        <NewReleasesPage outfits={newOutfits} onBack={handleBackToShowcase} onViewDetails={handleViewOutfitDetails} />
      )}

      {currentView === 'outfit-detail' && selectedOutfit && (
        <OutfitDetailPage outfit={selectedOutfit} onBack={handleBackToNewReleases} onAddToCart={handleAddToCart} />
      )}

      <div className={`transition-opacity duration-500 ${currentView === 'showcase' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        {/* Updated background text */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[20vw] lg:text-[25rem] font-black text-black leading-none -translate-y-16 animate-shimmer">
            AB
          </span>
          <span className="text-[20vw] lg:text-[25rem] font-black text-black leading-none -translate-y-32 animate-shimmer">
            BR
          </span>
        </div>

        <main className="relative z-10 w-full h-full">
          <header className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 flex items-center gap-2">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center p-3 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-lg transition-transform duration-300 hover:scale-105"
              aria-label={`Open cart with ${cartItemCount} items`}
            >
              <CartIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-fuchsia-600 text-xs font-bold text-white">
                  {cartItemCount}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center gap-3 p-2 pl-4 bg-white/40 backdrop-blur-md rounded-full border border-white/60 shadow-lg transition-transform duration-300 hover:scale-105"
              aria-label="Open menu"
            >
              <span className="text-sm font-bold tracking-widest">MENU</span>
              <MenuIcon />
            </button>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-8 h-full items-center pt-16 lg:pt-0">
            <div className="relative w-full h-[60vh] lg:h-screen flex items-center justify-center pl-4 sm:pl-8">
              <img
                key={selectedProduct.id}
                src={selectedProduct.variants[0].image}
                alt="Model wearing a futuristic puffer jacket"
                className="w-auto h-full max-h-[90vh] object-contain object-center drop-shadow-2xl animate-image-cross-fade transition-transform duration-500 ease-in-out hover:scale-105 origin-center"
              />
              <div className="absolute bottom-4 left-4 sm:left-8 right-4 sm:right-auto sm:max-w-sm p-4 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg">
                  <div className="flex items-center gap-4">
                      <div className="flex-grow">
                          <h3 className="font-bold text-base">NEW RELEASE</h3>
                          <p className="text-sm mt-1 text-black/80">
                              This is concept art using AI & Photoshop
                          </p>
                          <button 
                            onClick={handleGoToNewReleases}
                            className="group mt-4 flex items-center justify-center gap-2 text-white text-xs font-bold py-2 px-4 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:-translate-y-0.5"
                          >
                              Discover
                              <div className="bg-fuchsia-500 rounded-full p-0.5 transition-transform duration-300 group-hover:translate-x-0.5">
                                  <ArrowRightIcon className="w-3 h-3 text-white" />
                              </div>
                          </button>
                      </div>
                       <img 
                          src={selectedProduct.releaseImage}
                          alt="Futuristic shoe"
                          className="w-24 h-24 object-cover rounded-lg"
                      />
                  </div>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-8 h-full p-4 sm:p-8 pt-0 lg:pt-8">
              <div className="flex flex-col justify-between p-8 bg-gradient-to-br from-white/50 to-white/30 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg min-h-64">
                <div>
                  <Logo nameParts={selectedProduct.name} />
                  <p className="mt-4 text-base leading-relaxed text-black/80">
                    {selectedProduct.description}
                  </p>
                </div>
                <button 
                  onClick={handleDiscoverClick}
                  className="group flex items-center justify-between w-40 text-sm font-medium py-2 px-3 border border-gray-400/80 rounded-full hover:border-gray-500/80 hover:bg-white/20 transition-all duration-300">
                  <span>Discover</span>
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-fuchsia-600 to-purple-600 transition-transform duration-300 group-hover:translate-x-1 transform-gpu">
                    <ArrowRightIcon className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>
              
              <Gallery 
                products={products}
                selectedIndex={selectedIndex}
                onSelect={setSelectedIndex}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
