import { api } from "@repo/backend/api";
import { Doc, Id } from "@repo/backend/dataModel";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";

interface MessagesProps {
  selectedChat: Id<"chat">;
}

export default function Messages({ selectedChat }: MessagesProps) {
  const messages = useQuery(api.messages.getMessagesForChat, {
    chatId: selectedChat,
  });
  const createMessage = useMutation(api.messages.createMessage);
  const [newChatMessage, setNewChatMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    void (async () => {
      const body = newChatMessage.trim();
      if (!body) {
        return;
      }

      await createMessage({
        body,
        chat: selectedChat,
      });
      setNewChatMessage("");
    })();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-96 md:h-auto md:min-h-96">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Messages</h2>
      <ul className="flex-1 overflow-y-auto space-y-3 mb-4 bg-gray-50 p-4 rounded-lg">
        {messages && messages.length > 0 ? (
          messages.map((message) => (
            <MessageItem key={message._id} message={message} />
          ))
        ) : (
          <li className="text-gray-500 text-center py-8">
            No messages yet. Start the conversation!
          </li>
        )}
      </ul>
      <form className="flex gap-2 mt-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newChatMessage}
          onChange={(e) => setNewChatMessage(e.target.value)}
          placeholder="New message"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-black"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition-colors whitespace-nowrap"
        >
          Send
        </button>
      </form>
    </div>
  );
}

function MessageItem({ message }: { message: Doc<"messages"> }) {
  return (
    <li className="bg-white p-3 rounded-lg shadow-sm">
      <p className="text-sm text-gray-600 font-medium mb-1">
        Author: {message.userId}
      </p>
      <p className="text-gray-900">{message.body}</p>
    </li>
  );
}
