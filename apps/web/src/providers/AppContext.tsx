import { Id } from "@repo/backend/dataModel";
import { createContext } from "react";

export type ChatId = Id<"chat">;

export interface AppState {
  chatId: ChatId | null;
}

export interface AppContextValue extends AppState {
  setChatId: (chatId: ChatId | null) => void;
  resetAppState: () => void;
}

export const APP_STORAGE_KEY = "bug-convex:app-state";

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function readStoredAppState(): AppState {
  if (typeof window === "undefined") {
    return { chatId: null };
  }

  const rawValue = window.localStorage.getItem(APP_STORAGE_KEY);
  if (!rawValue) {
    return { chatId: null };
  }

  try {
    const parsed = JSON.parse(rawValue) as {
      chatId?: ChatId | null;
    };

    return {
      chatId: parsed.chatId ?? null,
    };
  } catch {
    return { chatId: null };
  }
}
