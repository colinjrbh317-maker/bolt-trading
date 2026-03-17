import { defineMiddleware } from "astro:middleware";

const COOKIE_NAME = "ab-variant";
const VARIANTS = ["a", "b", "c"] as const;

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Only apply split to the root path
  if (url.pathname !== "/") {
    return next();
  }

  // Check for existing variant cookie
  const cookies = context.cookies;
  let variant = cookies.get(COOKIE_NAME)?.value;

  // Assign variant if none exists
  if (!variant || !VARIANTS.includes(variant as (typeof VARIANTS)[number])) {
    const rand = Math.random();
    if (rand < 1 / 3) {
      variant = "a";
    } else if (rand < 2 / 3) {
      variant = "b";
    } else {
      variant = "c";
    }

    cookies.set(COOKIE_NAME, variant, {
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      httpOnly: true,
      sameSite: "lax",
    });
  }

  // Rewrite to the correct variant page (keeps URL as /)
  if (variant === "b") {
    return context.rewrite("/variant-b");
  }
  if (variant === "c") {
    return context.rewrite("/variant-c");
  }

  // Store variant in locals for Layout access
  context.locals.variant = variant;

  // Variant "a" serves the default index page
  return next();
});
