const REDIRECT_URI = "http://127.0.0.1:3000/callback";
const SCOPES = ["user-read-currently-playing"];

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return Response.json(
      { error: "Missing SPOTIFY_CLIENT_ID in .env.local" },
      { status: 500 },
    );
  }

  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("scope", SCOPES.join(" "));

  return Response.redirect(url);
}
