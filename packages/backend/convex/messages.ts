import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMessage = mutation({
  args: {
    body: v.string(),
    chat: v.id("chat"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    await ctx.db.insert("messages", {
      userId: userId,
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
