import { createRouteHandler } from "uploadthing/next";
 
import { ourFileRouter } from "@/app/lib/uploadThing/core";
 
// Export routes for Next App Router
export const { GET, POST, PUT, DELETE } = createRouteHandler({
  router: ourFileRouter,
 
  // Apply an (optional) custom config:
  // config: { ... },
});