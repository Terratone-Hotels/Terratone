import { createClient as baseCreateClient } from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {import("@prismicio/client").Route[]}
 */
// TODO: Update the routes array to match your project's route structure.
const routes = [
  // Examples:
  { type: "homepage", path: "/" },
  { type: "dining", path: "/dine" },
  { type: "stays", path: "/stay" },
  { type: "discover", path: "/discover" },
  { type: "deluxesuite", path: "/stay/deluxe-suite" },
  { type: "deluxeking", path: "/stay/deluxe-king" },
  { type: "deluxetwin", path: "/stay/deluxe-twin" },
  { type: "meet", path: "/meet" },
  { type: "meetingroom", path: "/meet/media-room" },
  { type: "conference_room", path: "/meet/conference-room" },
  { type: "banquet_hall", path: "/meet/banquet-hall" },
  { type: "our_story", path: "/our-story" },
  // { type: "page", path: "/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param {import("@prismicio/client").ClientConfig} config - Configuration for the Prismic client.
 */
export const createClient = (config = {}) => {
  const client = baseCreateClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  enableAutoPreviews({ client });

  return client;
};
