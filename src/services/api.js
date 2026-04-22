// src/services/api.js
import { mockFetch } from './mockApi';

// Set to true to use the mock API (e.g., for web demos)
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'; 

export const apiFetch = async (url, options = {}) => {
  if (USE_MOCK) {
    console.info(`[MOCK API] ${options.method || 'GET'} ${url}`);
    return mockFetch(url, options);
  }
  
  // Real fetch for ESP32
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
