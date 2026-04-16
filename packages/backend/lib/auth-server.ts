import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_SITE_URL;

if (!CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
}

if (!CONVEX_SITE_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_SITE_URL is not defined");
}

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction,
} = convexBetterAuthNextJs({
  convexUrl: CONVEX_URL,
  convexSiteUrl: CONVEX_SITE_URL,
});