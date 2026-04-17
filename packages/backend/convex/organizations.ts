// convex/organizations.ts
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { createAuth, authComponent } from "./betterAuth/auth";
import { components } from "./_generated/api";

export const createOrganization = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const { auth, headers } = await authComponent.getAuth(createAuth, ctx);

    const org = await auth.api.createOrganization({
      body: {
        name: args.name,
        slug: args.slug,
      },
      headers,
    });

    return org;
  },
});

export const listUserOrganizations = query({
  args: {},
  handler: async (ctx) => {
    const { auth, headers } = await authComponent.getAuth(createAuth, ctx);

    const organizations = await auth.api.listOrganizations({
      headers,
    });

    return organizations;
  },
});

// Forma alternativa usando directamente el adapter de BetterAuth para acceder a la base de datos de organizaciones
export const getAllOrganizations = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.runQuery(components.betterAuth.adapter.findMany, {
      model: "organization",
      paginationOpts: { cursor: null, numItems: 100 },
    });
  },
});
