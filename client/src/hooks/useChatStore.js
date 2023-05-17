import { create } from "zustand";

const useChatStore = create((set, get) => ({
  showChat: false,
  selectedNavItem: false,
  isUserLoggedIn: false,
  showSelectedUserProfile: false,
  
  currentUser: {},
  recentChats: [],
  selectedUser: {},
  socket: null,

  refreshRecentChats: () => {},
  setShowSelectedUserProfile: (by) =>
    set(() => ({ showSelectedUserProfile: by })),
  setRefreshRecentChats: (cb) => set(() => ({ refreshRecentChats: cb })),
  setSocket: (socket) => set(() => ({ socket })),
  chatDisplayState: () => set(() => Object.keys(get().selectedUser).length > 0),
  setCurrentUser: (currentUser) => set(() => ({ currentUser })),
  setSelectedUser: (selectedUser) => set(() => ({ selectedUser })),
  setRecentChats: (recentChats) => set(() => ({ recentChats })),
  setIsUserLoggedIn: (isUserLoggedIn) => set(() => ({ isUserLoggedIn })),
}));

export default useChatStore;
