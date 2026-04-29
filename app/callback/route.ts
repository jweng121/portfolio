const REDIRECT_URI = "http://127.0.0.1:3000/callback";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

function html(body: string, status = 200) {
  return new Response(
    `<!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Spotify Refresh Token</title>
        <style>
          body { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; padding: 32px; color: #18181b; }
          code, textarea { font: inherit; }
          textarea { width: min(900px, 100%); height: 180px; margin-top: 12px; padding: 12px; }
          .line { margin-top: 16px; }
        </style>
      </head>
      <body>${body}</body>
    </html>`,
    {
      status,
      headers: { "Content-Type": "text/html; charset=utf-8" },
    },
  );
}

export async function GET(request: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const code = new URL(request.url).searchParams.get("code");

  if (!clientId || !clientSecret) {
    return html("<h1>Missing Spotify env vars</h1><p>Add SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET to .env.local, then restart npm run dev.</p>", 500);
  }

  if (!code) {
    return html("<h1>Missing code</h1><p>Open <code>/api/spotify/login</code> first.</p>", 400);
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
    cache: "no-store",
  });

  const data = await response.json();

  if (!response.ok || !data.refresh_token) {
    return html(
      `<h1>Spotify token exchange failed</h1><p>Make sure your dashboard redirect URI is exactly <code>${REDIRECT_URI}</code>.</p><pre>${JSON.stringify(data, null, 2)}</pre>`,
      500,
    );
  }

  return html(`
    <h1>Spotify refresh token</h1>
    <p>Paste this into <code>.env.local</code> as <code>SPOTIFY_REFRESH_TOKEN</code>.</p>
    <textarea readonly>SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</textarea>
    <p class="line">After saving it, restart <code>npm run dev</code>.</p>
  `);
}
