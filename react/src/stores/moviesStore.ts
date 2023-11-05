import { create } from 'zustand'
import { createJSONStorage, persist } from "zustand/middleware";

type MovieStore = {
    favorites: number[]
    add: (id: number) => void
}

export const useMoviesStore = create<MovieStore>()(
    persist(
        (set, get) => ({
            favorites: [],
            add: (id) => set({ favorites: [...get().favorites, id] }),
        }),
        {
            name: 'favorites',
            storage: createJSONStorage(() => localStorage)
        }
    )
)