import { createFileRoute } from "@tanstack/react-router";
import resumeAsset from "@/assets/resume.pdf.asset.json";

const FILENAME = "zidan-ahammed-resume.pdf";

async function fetchAsset(request: Request) {
  const origin = new URL(request.url).origin;
  return fetch(new URL(resumeAsset.url, origin).toString());
}

export const Route = createFileRoute("/api/resume")({
  server: {
    handlers: {
      HEAD: async ({ request }) => {
        const upstream = await fetchAsset(request);
        return new Response(null, {
          status: upstream.ok ? 200 : 404,
          headers: {
            "content-type": "application/pdf",
            "content-length": String(resumeAsset.size),
          },
        });
      },
      GET: async ({ request }) => {
        const upstream = await fetchAsset(request);
        if (!upstream.ok || !upstream.body) {
          return new Response("Resume file is unavailable", { status: 404 });
        }
        return new Response(upstream.body, {
          status: 200,
          headers: {
            "content-type": "application/pdf",
            "content-disposition": `attachment; filename="${FILENAME}"`,
            "cache-control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
