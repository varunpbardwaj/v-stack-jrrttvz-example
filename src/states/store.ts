import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

type State = {
  theme: boolean;
  setTheme: (payload: boolean) => void;
};

const blacklist = [""];

const useStore = create<State>()(
  devtools(
    persist(
      immer((set) => ({
        theme: true,
        setTheme: (payload: boolean) =>
          set(
            (state: State) => {
              state.theme = payload;
            },
            false,
            "SET_THEME"
          ),
      })),
      {
        name: "zustand:app",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(([key]) => !blacklist.includes(key))
          ),
      }
    )
  )
);

export default useStore;
