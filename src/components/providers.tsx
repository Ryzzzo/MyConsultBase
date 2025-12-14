'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { User } from '@/lib/types';
import { PlanProvider } from '@/lib/plan-context';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginAsTestUser: () => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (type: Toast['type'], message: string) => void;
  removeToast: (id: string) => void;
}

interface ModalContextType {
  activeModal: string | null;
  modalData: Record<string, unknown>;
  openModal: (modalId: string, data?: Record<string, unknown>) => void;
  closeModal: () => void;
}

interface SlideOverContextType {
  isOpen: boolean;
  selectedClientId: string | null;
  openSlideOver: (clientId: string) => void;
  closeSlideOver: () => void;
}

interface SidebarContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);
const ToastContext = createContext<ToastContextType | undefined>(undefined);
const ModalContext = createContext<ModalContextType | undefined>(undefined);
const SlideOverContext = createContext<SlideOverContextType | undefined>(undefined);
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const TEST_USER: User = {
  id: 'test-user-1',
  name: 'Ryan Stacy',
  email: 'contact@vertexapps.dev',
  businessName: 'Vertex Business Solutions',
  tagline: 'Strategic Consulting for Modern Businesses',
  brandColor: '#1B4D3E',
  createdAt: new Date('2024-01-01'),
  plan: 'team',
  role: 'owner',
  teamId: 'team-1',
};

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within Providers');
  return context;
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within Providers');
  return context;
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within Providers');
  return context;
}

export function useSlideOver() {
  const context = useContext(SlideOverContext);
  if (!context) throw new Error('useSlideOver must be used within Providers');
  return context;
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) throw new Error('useSidebar must be used within Providers');
  return context;
}

function getStoredUser(): User | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('consultbase_user');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      parsed.createdAt = new Date(parsed.createdAt);
      return parsed;
    } catch {
      return null;
    }
  }
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<Record<string, unknown>>({});
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      const userWithDefaults = {
        ...TEST_USER,
        ...storedUser,
        plan: storedUser.plan || TEST_USER.plan,
        role: storedUser.role || TEST_USER.role,
        teamId: storedUser.teamId || TEST_USER.teamId,
      };
      setUser(userWithDefaults);
      localStorage.setItem('consultbase_user', JSON.stringify(userWithDefaults));
    } else {
      setUser(TEST_USER);
      localStorage.setItem('consultbase_user', JSON.stringify(TEST_USER));
    }
    setIsHydrated(true);
  }, []);

  const loginAsTestUser = useCallback(() => {
    setUser(TEST_USER);
    localStorage.setItem('consultbase_user', JSON.stringify(TEST_USER));
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email && password) {
      const loggedInUser: User = {
        ...TEST_USER,
        email,
        name: TEST_USER.name,
      };
      setUser(loggedInUser);
      localStorage.setItem('consultbase_user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('consultbase_user');
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('consultbase_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addToast = useCallback((type: Toast['type'], message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const openModal = useCallback((modalId: string, data?: Record<string, unknown>) => {
    setActiveModal(modalId);
    setModalData(data || {});
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setModalData({});
  }, []);

  const openSlideOver = useCallback((clientId: string) => {
    setSelectedClientId(clientId);
    setSlideOverOpen(true);
  }, []);

  const closeSlideOver = useCallback(() => {
    setSlideOverOpen(false);
    setTimeout(() => setSelectedClientId(null), 300);
  }, []);

  const openSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, isAuthenticated: !!user, login, loginAsTestUser, logout, updateUser }}>
      <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
        <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
          <SlideOverContext.Provider value={{ isOpen: slideOverOpen, selectedClientId, openSlideOver, closeSlideOver }}>
            <SidebarContext.Provider value={{ isSidebarOpen: sidebarOpen, openSidebar, closeSidebar, toggleSidebar }}>
              <PlanProvider initialPlan={user?.plan || 'team'} userRole={user?.role || 'owner'}>
                {children}
              </PlanProvider>
            </SidebarContext.Provider>
          </SlideOverContext.Provider>
        </ModalContext.Provider>
      </ToastContext.Provider>
    </UserContext.Provider>
  );
}
