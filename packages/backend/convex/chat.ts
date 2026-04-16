import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createChat = mutation({
  args: {
    participants: v.array(v.id("users")),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const chatId = await ctx.db.insert("chat", { name: args.name });
    for (const user of args.participants) {
      await ctx.db.insert("chatMembers", {
        chat: chatId,
        user: user,
      });
    }
    return chatId;
  },
});

export const getChats = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("chat").collect();
  },
});

export const getChatsForUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("chatMembers")
      .withIndex("by_user", (q) => q.eq("user", args.userId))
      .collect();

    const chatIds = memberships.map((m) => m.chat);

    const chats = [];
    for (const chatId of chatIds) {
      const chat = await ctx.db.get("chat", chatId);
      if (chat) {
        chats.push(chat);
      }
    }
    return chats;
  },
});