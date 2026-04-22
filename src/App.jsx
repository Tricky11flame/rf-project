import React, { useState, useEffect } from 'react';
import { apiFetch } from './services/api';
import StatusIndicator from './components/StatusIndicator';
import DeviceCard from './components/DeviceCard';
import { Search, Power, WifiOff, Settings2, Bluetooth } from 'lucide-react';

function App() {
  const [status, setStatus] = useState({ scanning: false, scan_done: false, connected: false });
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Polling loop (every 3 seconds)
  useEffect(() => {
    const pollStatus = async () => {
      try {
        const res = await apiFetch('/status');
        const data = await res.json();
        setStatus(data);

        // If scan is done and we haven't fetched devices yet, or if we just finished scanning
        if (data.scan_done) {
          const devRes = await apiFetch('/devices');
          const devData = await devRes.json();
          setDevices(devData);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    const interval = setInterval(pollStatus, 3000);
    pollStatus(); // Initial call

    return () => clearInterval(interval);
  }, []);

  const handleScan = async () => {
    setLoading(true);
    try {
      await apiFetch('/scan', { method: 'POST' });
      setDevices([]); // Clear list while scanning
    } catch (err) {
      console.error("Scan failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (mac) => {
    try {
      await apiFetch(`/connect?mac=${mac}`, { method: 'POST' });
    } catch (err) {
      console.error("Connection failed:", err);
    }
  };

  const handleDisconnect = async () => {
    try {
      await apiFetch('/disconnect', { method: 'POST' });
    } catch (err) {
      console.error("Disconnect failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-sony-black text-sony-white font-sans selection:bg-sony-gold selection:text-sony-black">
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-sony-gold/5 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-sony-gold/3 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-lg mx-auto px-6 py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-black tracking-tighter uppercase italic gold-text-gradient">
              Audio Bridge
            </h1>
            <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase mt-1">High-Fidelity Wireless Control</p>
          </div>
          <div className="p-2 border border-white/10 rounded-full hover:bg-white/5 transition-colors cursor-pointer">
            <Settings2 className="w-5 h-5 text-gray-400" />
          </div>
        </header>

        {/* Status Section */}
        <StatusIndicator status={status} />

        {/* Action Controls */}
        <div className="flex gap-4 mb-10">
          <button 
            onClick={handleScan}
            disabled={status.scanning || loading}
            className="flex-1 gold-gradient hover:brightness-110 active:scale-[0.98] disabled:opacity-50 disabled:grayscale transition-all rounded-xl py-4 flex items-center justify-center gap-3 text-sony-black font-bold tracking-tight shadow-xl shadow-sony-gold/20"
          >
            <Search className="w-5 h-5" />
            {status.scanning ? 'Searching...' : 'Scan Devices'}
          </button>
          
          <button 
            onClick={handleDisconnect}
            className="px-6 glass hover:bg-red-500/10 hover:border-red-500/30 group transition-all rounded-xl flex items-center justify-center"
          >
            <WifiOff className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
          </button>
        </div>

        {/* Device List Section */}
        <section>
          <div className="flex items-center justify-between mb-6 px-1">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400">Available Nodes</h2>
            <span className="text-[10px] font-mono text-gray-600 tracking-tighter font-bold uppercase">
              {devices.length} Detected
            </span>
          </div>

          <div className="space-y-3">
            {devices.length > 0 ? (
              devices.map((dev) => (
                <DeviceCard 
                  key={dev.a} 
                  device={dev} 
                  onConnect={handleConnect} 
                />
              ))
            ) : status.scanning ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-sony-gold/20 blur-xl animate-pulse rounded-full" />
                  <Bluetooth className="w-12 h-12 text-sony-gold animate-bounce" />
                </div>
                <p className="text-gray-500 text-sm animate-pulse">Initializing frequency sweep...</p>
              </div>
            ) : (
              <div className="glass rounded-xl py-16 px-8 text-center">
                <p className="text-gray-500 text-sm">No devices found nearby.<br/>Ensure your speakers are in pairing mode.</p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 flex flex-col items-center gap-4">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest text-center">
            Designed for ESP32 Audio Bridge System v1.0
          </p>
          <div className="flex gap-4 opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-[9px] font-mono tracking-widest uppercase">Sony Inspired Aesthetics</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
