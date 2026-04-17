import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createChat = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const user = identity.subject;

    const chatId = await ctx.db.insert("chat", { name: args.name });

    await ctx.db.insert("chatMembers", {
      chat: chatId,
      user: user,
    });

    return chatId;
  },
});

export const getChats = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("chat").collect();
  },
});

export const getChatsForCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;
    const memberships = await ctx.db
      .query("chatMembers")
      .withIndex("by_user", (q) => q.eq("user", userId))
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
