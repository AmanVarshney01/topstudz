/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as auth from "../auth.js";
import type * as groups from "../groups.js";
import type * as http from "../http.js";
import type * as leaderboards from "../leaderboards.js";
import type * as messages from "../messages.js";
import type * as onboarding from "../onboarding.js";
import type * as study from "../study.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  auth: typeof auth;
  groups: typeof groups;
  http: typeof http;
  leaderboards: typeof leaderboards;
  messages: typeof messages;
  onboarding: typeof onboarding;
  study: typeof study;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
