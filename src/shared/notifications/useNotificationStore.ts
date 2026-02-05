import { create } from 'zustand';

interface NotificationState {
  count: number;
  notifications: any[];
  addNotification: (notification: any) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  count: 0,
  notifications: [],
  addNotification: (notification) => 
    set((state) => ({ 
      notifications: [notification, ...state.notifications],
      count: state.count + 1 
    })),
  clearNotifications: () => set({ count: 0, notifications: [] }),
}));