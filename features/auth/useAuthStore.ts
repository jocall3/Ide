// features/auth/useAuthStore.ts
import { create } from 'zustand';

interface User {
  username: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (username: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  
  login: async (username: string) => {
    set({ isLoading: true });
    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 500));
    set({ 
      isAuthenticated: true, 
      user: { username },
      isLoading: false 
    });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));
