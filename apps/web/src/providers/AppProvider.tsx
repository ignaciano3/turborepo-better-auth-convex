"use client";

import { useEffect, useMemo, useState } from "react";
import {
  APP_STORAGE_KEY,
  AppContext,
  ChatId,
  readStoredAppState,
} from "./AppContext";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const storedState = readStoredAppState();
  const [chatId, setChatId] = useState<ChatId | null>(storedState.chatId);

  useEffect(() => {
    window.localStorage.setItem(APP_STORAGE_KEY, JSON.stringify({ chatId }));
  }, [chatId]);

  const resetAppState = () => {
    setChatId(null);
  };

  const value = useMemo(
    () => ({
      chatId,
      setChatId,
      resetAppState,
    }),
    [chatId],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
