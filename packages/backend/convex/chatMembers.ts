import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const addMember = mutation({
  args: {
    chatId: v.id("chat"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existingMember = await ctx.db
      .query("chatMembers")
      .withIndex("by_chat_user", (q) =>
        q.eq("chat", args.chatId).eq("user", args.userId)
      )
      .take(1);

    if (existingMember.length > 0) {
      return existingMember[0]._id;
    }

    await ctx.db.insert("chatMembers", {
      chat: args.chatId,
      user: args.userId,
    });
  },
});

export const removeMember = mutation({
  args: {
    chatId: v.id("chat"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("chatMembers")
      .withIndex("by_chat_user", (q) =>
        q.eq("chat", args.chatId).eq("user", args.userId)
      )
      .unique();

    if (member) {
      await ctx.db.delete("chatMembers", member._id);
    }
  },
});

export const getMembers = query({
  args: { chatId: v.id("chat") },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("chatMembers")
      .withIndex("by_chat", (q) => q.eq("chat", args.chatId))
      .collect();

    const users = [];
    for (const member of members) {
      const user = await ctx.db.get("users", member.user);
      if (user) {
        users.push(user);
      }
    }
    return users;
  },
});