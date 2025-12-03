import { create } from 'zustand';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,

  login: async (email: string, _password: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call - replace with actual authentication logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful login
      const user: User = {
        id: '1',
        email,
        name: email.split('@')[0],
      };

      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  signup: async (email: string, _password: string, name: string) => {
    set({ isLoading: true });
    try {
      // Simulate API call - replace with actual signup logic
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful signup
      const user: User = {
        id: '1',
        email,
        name,
      };

      set({ isAuthenticated: true, user, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },

  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },
}));
