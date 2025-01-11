import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";
import { initialLevelData } from "../utils/data";


interface Level {
  id: number;
  unlocked: boolean;
  completed: boolean;
  highScore: number;
}

interface LevelStore {
  levels: Level[];
  unlockLevel: (id: number) => void;
  completedLevel: (id: number, collectedCandies: number) => void;
}

const useLevelStore = create<LevelStore>()(
  persist(
    (set, get) => ({
      levels: initialLevelData,
      unlockLevel: (id: number) => {
        set((state) => {
          const updatedLevels = state.levels.map((level) =>
            level.id === id ? { ...level, unlocked: true } : level
          )
          return { levels: updatedLevels }
        })
      },
      completedLevel: (id: number, collectedCandies: number) => {
        set((state) => {
          const updatedLevels = state.levels.map((level) =>
            level.id === id
              ? { ...level, completed: true, highScore: Math.max(level.highScore, collectedCandies) }
              : level
          )
          return { levels: updatedLevels }
        })
      }
    }),
    {
      name: "level-storage",
      storage: createJSONStorage(() => mmkvStorage),
    }
  )
)

export default useLevelStore;

