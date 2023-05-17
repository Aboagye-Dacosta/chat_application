import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const useChatStore = create(
  persist(
    (set, get) => ({
      showChat: false,
      selectedNavItem: false,
      isUserLoggedIn: false,
      showSelectedUserProfile: false,

      currentUser: {},
      recentChats: [],
      selectedUser: {},
      socket: null,

      refreshRecentChats: () => {},
      setShowChat: (by) => set(() => ({ showChat: by })),
      setShowSelectedUserProfile: (by) =>
        set(() => ({ showSelectedUserProfile: by })),
      setRefreshRecentChats: (cb) => set(() => ({ refreshRecentChats: cb })),
      setSocket: (socket) => set(() => ({ socket })),
      chatDisplayState: () =>
        set(() => Object.keys(get().selectedUser).length > 0),
      setCurrentUser: (currentUser) => set(() => ({ currentUser })),
      setSelectedUser: (selectedUser) => set(() => ({ selectedUser })),
      setRecentChats: (recentChats) => set(() => ({ recentChats })),
      setIsUserLoggedIn: (isUserLoggedIn) => set(() => ({ isUserLoggedIn })),
    }),
    {
      name: "chat-store",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) =>
        Object.entries(state).filter(([key]) => !["recentChats","socket"].includes(key)),
      onRehydrateStorage: (state) => {
        console.log("hydration started");
        return (state, error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("hydration successful");
          }
        };
      },
    }
  )
);

export default useChatStore;
