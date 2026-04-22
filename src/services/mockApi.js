// src/services/mockApi.js

// Internal state of our "fake" ESP32
let state = {
  scanning: false,
  scan_done: false,
  connected: false,
};

let devices = [
  { n: "Sony WH-1000XM5", a: "F4:4E:FC:22:9A:10" },
  { n: "Bose QuietComfort 45", a: "60:AB:D2:11:3C:99" },
  { n: "JBL Flip 6", a: "1C:52:16:88:AC:FF" },
  { n: "Marshall Emberton", a: "D8:63:75:4E:22:1B" }
];

export const mockFetch = async (url, options = {}) => {
  // Simulate network delay (500ms)
  await new Promise(resolve => setTimeout(resolve, 500));

  if (url === '/status') {
    return {
      ok: true,
      json: () => Promise.resolve({ ...state })
    };
  }

  if (url === '/devices') {
    return {
      ok: true,
      json: () => Promise.resolve(devices)
    };
  }

  if (url === '/scan' && options.method === 'POST') {
    // Reset state & start scanning
    state.scanning = true;
    state.scan_done = false;
    state.connected = false;
    
    // Simulate scan finishing after 4 seconds
    setTimeout(() => {
      state.scanning = false;
      state.scan_done = true;
    }, 4000);
    
    return { ok: true, json: () => Promise.resolve({ ok: true }) };
  }

  if (url.startsWith('/connect') && options.method === 'POST') {
    state.connected = true;
    return { ok: true, json: () => Promise.resolve({ ok: true }) };
  }

  if (url === '/disconnect' && options.method === 'POST') {
    state.connected = false;
    return { ok: true, json: () => Promise.resolve({ ok: true }) };
  }

  throw new Error("404 Not Found in Mock API");
};
