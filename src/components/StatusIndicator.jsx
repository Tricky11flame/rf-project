import React from 'react';
import { Bluetooth, Activity } from 'lucide-react';

const StatusIndicator = ({ status }) => {
  const isScanning = status.scanning;
  const isConnected = status.connected;

  return (
    <div className="w-full glass rounded-2xl p-6 mb-8 transition-all duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${isScanning ? 'gold-gradient' : 'bg-sony-dark'} transition-colors duration-500`}>
            {isScanning ? (
              <Activity className="w-6 h-6 text-sony-black animate-pulse" />
            ) : (
              <Bluetooth className={`w-6 h-6 ${isConnected ? 'text-sony-gold' : 'text-sony-white'}`} />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">System Status</p>
            <h2 className="text-xl font-bold tracking-tight">
              {isScanning ? (
                <span className="gold-text-gradient">Scanning Airwaves...</span>
              ) : isConnected ? (
                <span className="text-sony-white">Streaming Active</span>
              ) : (
                <span className="text-gray-400">Standby Mode</span>
              )}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${isConnected ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : isScanning ? 'bg-sony-gold animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
            {isConnected ? 'Live' : isScanning ? 'Searching' : 'Idle'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatusIndicator;
