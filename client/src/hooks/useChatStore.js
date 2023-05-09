import { create } from "zustand";

const useChatStore = create((set, get) => ({
  showChat: false,
  selectedNavItem: false,
  isUserLoggedIn: false,
  currentUser: {},
  recentChats: [],
  selectedUser: {},

  sendChatMessage: () => {},
  refreshRecentChats: () => {},

  setRefreshRecentChats: (cb) => set(() => ({ refreshRecentChats: cb })),
  setSendMessage: (cb) => set(() => ({ sendChatMessage: cb })),
  chatDisplayState: () => set(() => Object.keys(get().selectedUser).length > 0),
  setCurrentUser: (currentUser) => set(() => ({ currentUser })),
  setSelectedUser: (selectedUser) => set(() => ({ selectedUser })),
  setRecentChats: (recentChats) => set(() => ({ recentChats })),
  setIsUserLoggedIn: (isUserLoggedIn) => set(() => ({ isUserLoggedIn })),
}));

export default useChatStore;
