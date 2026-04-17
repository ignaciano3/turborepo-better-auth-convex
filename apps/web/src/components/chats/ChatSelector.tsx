"use client";

import { useAppContext } from "@/providers/useAppContext";
import { api } from "@repo/backend/api";
import { useMutation, useQuery } from "convex/react";
import CreateChat from "./CreateChat";

export default function ChatsSelector() {
  const { chatId, setChatId } = useAppContext();
  const joinChat = useMutation(api.chatMembers.joinChat);
  const allChats = useQuery(api.chat.getChats);
  const chats = useQuery(api.chat.getChatsForCurrentUser, {});

  const joinedChatIds = new Set(chats?.map((chat) => chat._id));
  const availableChats = allChats?.filter(
    (chat) => !joinedChatIds.has(chat._id),
  );

  return (
    <div className="md:col-span-1 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Chats</h2>
      <div className="space-y-6 mb-6">
        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Your chats
          </h3>
          <ul className="space-y-2">
            {chats?.map((chat) => (
              <li
                key={chat._id}
                onClick={() => setChatId(chat._id)}
                className={`p-3 rounded-lg transition-colors border-l-4 cursor-pointer ${
                  chatId === chat._id
                    ? "bg-indigo-100 border-indigo-600"
                    : "bg-indigo-50 hover:bg-indigo-100 border-indigo-500 hover:border-indigo-600"
                }`}
              >
                <span className="text-gray-900 font-medium">{chat.name}</span>
              </li>
            ))}
            {chats && chats.length === 0 && (
              <li className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                You are not in any chats yet.
              </li>
            )}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Available chats
          </h3>
          <ul className="space-y-2">
            {availableChats?.map((chat) => (
              <li
                key={chat._id}
                className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="text-gray-900 font-medium">{chat.name}</span>
                <button
                  onClick={() => {
                    void (async () => {
                      await joinChat({
                        chatId: chat._id,
                      });
                      setChatId(chat._id);
                    })();
                  }}
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors text-sm whitespace-nowrap"
                >
                  Join
                </button>
              </li>
            ))}
            {availableChats && availableChats.length === 0 && (
              <li className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3">
                No other chats are available.
              </li>
            )}
          </ul>
        </section>
      </div>
      <CreateChat />
    </div>
  );
}
