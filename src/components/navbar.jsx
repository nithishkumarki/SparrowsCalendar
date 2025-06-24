import React from 'react';
import sparrowLogo from '../asserts/sparrowLogo.png';
import sparrow from '../asserts/sparrow.png';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Navbar({ month, year, MONTHS, onPrev, onNext, SparrowLogo }) {
  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg mb-6 p-6 border border-white/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
        
          <img 
            src={sparrowLogo}
            alt="Logo" 
            className="w-12 h-12 rounded-lg object-contain"
          
          />
          <SparrowLogo className="w-12 h-12 text-green-600 hidden" />
          <h1 className="text-3xl font-bold text-gray-900">Sparrow's Calendar</h1>
        </div>
        <div className="flex items-center space-x-4">
         <button 
            onClick={onPrev}
            className="p-2 rounded-full hover:bg-green-100 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-green-700" />
          </button>
          <h2 className="text-xl font-semibold text-gray-800 min-w-48 text-center">
            {MONTHS[month]} {year}
          </h2>
          <button 
            onClick={onNext}
            className="p-2 rounded-full hover:bg-green-100 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-green-700" />
          </button>
     
        </div>
      </div>
    </div>
  );
}
export default Navbar;