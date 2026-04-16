import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
  }),
  chat: defineTable({
    name: v.string(),
  }),
  messages: defineTable({
    author: v.id("users"),
    body: v.string(),
    chat: v.id("chat"),
  }).index("by_chat", ["chat"]),
  chatMembers: defineTable({
    chat: v.id("chat"),
    user: v.id("users"),
  })
    .index("by_user", ["user"])
    .index("by_chat", ["chat"])
    .index("by_chat_user", ["chat", "user"]),
});
