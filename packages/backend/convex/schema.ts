import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  chat: defineTable({
    name: v.string(),
  }),
  messages: defineTable({
    userId: v.string(),
    body: v.string(),
    chat: v.id("chat"),
  }).index("by_chat", ["chat"]),
  chatMembers: defineTable({
    chat: v.id("chat"),
    user: v.string(),
  })
    .index("by_user", ["user"])
    .index("by_chat", ["chat"])
    .index("by_chat_user", ["chat", "user"]),
});
