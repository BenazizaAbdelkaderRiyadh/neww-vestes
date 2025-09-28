import React from 'react';
import { Outfit } from '../App';

type NewReleasesProps = {
  outfits: Outfit[];
  onBack: () => void;
  onViewDetails: (outfit: Outfit) => void;
};

export const NewReleasesPage: React.FC<NewReleasesProps> = ({ outfits, onBack, onViewDetails }) => {
  return (
    <div className="w-full min-h-screen p-4 sm:p-8 animate-fade-in">
      <header className="flex items-center justify-between mb-8">
        <div>
          <button
            onClick={onBack}
            className="text-sm font-medium py-2 px-3 border border-gray-400/80 rounded-full hover:border-gray-500/80 transition-all duration-300 bg-white/40 backdrop-blur-md hover:scale-105"
          >
            &larr; Back to Showcase
          </button>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Latest Drops</h1>
        <div className="w-24"></div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {outfits.map((outfit, index) => (
          <div
            key={outfit.id}
            className="bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg p-4 flex flex-col gap-4 overflow-hidden transition-transform duration-300 hover:-translate-y-1 animate-slide-in-up"
            style={{ animationDelay: `${100 + index * 75}ms` }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg">
                <img 
                    src={outfit.galleryImage} 
                    alt={outfit.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
            </div>
            <div>
                <h3 className="font-bold text-lg">{outfit.name}</h3>
                <p className="text-sm text-black/70 mt-1">{outfit.description}</p>
                <button 
                  onClick={() => onViewDetails(outfit)}
                  className="mt-4 text-sm font-bold text-fuchsia-700 hover:underline"
                >
                    View Details
                </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};