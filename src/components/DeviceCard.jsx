import React from 'react';
import { Speaker, ArrowRight } from 'lucide-react';

const DeviceCard = ({ device, onConnect }) => {
  return (
    <div 
      onClick={() => onConnect(device.a)}
      className="group relative w-full glass hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300 rounded-xl p-4 mb-3 cursor-pointer overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-sony-gold scale-y-0 group-hover:scale-y-100 transition-transform origin-top" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-sony-dark rounded-lg group-hover:bg-sony-gold transition-colors duration-300">
            <Speaker className="w-5 h-5 text-gray-400 group-hover:text-sony-black" />
          </div>
          <div>
            <h3 className="font-semibold text-sony-white text-lg group-hover:text-sony-gold transition-colors">{device.n}</h3>
            <p className="text-xs font-mono text-gray-500 mt-1 uppercase tracking-tighter">{device.a}</p>
          </div>
        </div>
        
        <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <ArrowRight className="w-5 h-5 text-sony-gold" />
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
