import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMessage = mutation({
  args: {
    author: v.id("users"),
    body: v.string(),
    chat: v.id("chat"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", {
      author: args.author,
      body: args.body,
      chat: args.chat,
    });
  },
});

export const getMessagesForChat = query({
  args: { chatId: v.id("chat") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_chat", (q) => q.eq("chat", args.chatId))
      .collect();
  },
});