import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent, createAuth } from "./betterAuth/auth";

export const addMember = mutation({
  args: {
    chatId: v.id("chat"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingMember = await ctx.db
      .query("chatMembers")
      .withIndex("by_chat_user", (q) =>
        q.eq("chat", args.chatId).eq("user", args.userId),
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

export const joinChat = mutation({
  args: {
    chatId: v.id("chat"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const userId = identity.subject;

    const existingMember = await ctx.db
      .query("chatMembers")
      .withIndex("by_chat_user", (q) =>
        q.eq("chat", args.chatId).eq("user", userId),
      )
      .take(1);

    if (existingMember.length > 0) {
      return existingMember[0]._id;
    }

    await ctx.db.insert("chatMembers", {
      chat: args.chatId,
      user: userId,
    });
  },
});

export const removeMember = mutation({
  args: {
    chatId: v.id("chat"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const member = await ctx.db
      .query("chatMembers")
      .withIndex("by_chat_user", (q) =>
        q.eq("chat", args.chatId).eq("user", args.userId),
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
    const { auth, headers } = await authComponent.getAuth(createAuth, ctx);
    
    const members = await ctx.db
      .query("chatMembers")
      .withIndex("by_chat", (q) => q.eq("chat", args.chatId))
      .collect();

    const membersWithDetails = await Promise.all(
      members.map(async (member) => {
        const user = await auth.api.getUser({
          headers,
          query: { id: member.user },
        });

        return {
          ...member,
          name: user?.name,
          email: user?.email,
        };
      }),
    );

    return membersWithDetails;
  },
});
