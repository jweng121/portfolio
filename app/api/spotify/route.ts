type SpotifyImage = {
  url: string;
};

type SpotifyArtist = {
  name: string;
};

type SpotifyTrack = {
  name: string;
  duration_ms: number;
  external_urls?: {
    spotify?: string;
  };
  album?: {
    name: string;
    images?: SpotifyImage[];
  };
  artists?: SpotifyArtist[];
};

type SpotifyCurrentlyPlaying = {
  is_playing?: boolean;
  progress_ms?: number;
  item?: SpotifyTrack | null;
};

const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_ENDPOINT = "https://api.spotify.com/v1/me/player/currently-playing";

export const dynamic = "force-dynamic";

function missingConfigResponse() {
  return Response.json(
    {
      isPlaying: false,
      error: "Missing Spotify environment variables.",
    },
    { status: 200 },
  );
}

async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return null;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as { access_token?: string };
  return data.access_token ?? null;
}

export async function GET() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return missingConfigResponse();
  }

  const response = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status === 204) {
    return Response.json({ isPlaying: false });
  }

  if (!response.ok) {
    return Response.json({ isPlaying: false }, { status: 200 });
  }

  const data = (await response.json()) as SpotifyCurrentlyPlaying;
  const track = data.item;

  if (!track) {
    return Response.json({ isPlaying: false });
  }

  return Response.json({
    isPlaying: Boolean(data.is_playing),
    title: track.name,
    artist: track.artists?.map((artist) => artist.name).join(", ") ?? "",
    album: track.album?.name ?? "",
    albumImageUrl: track.album?.images?.[0]?.url ?? null,
    songUrl: track.external_urls?.spotify ?? null,
    progressMs: data.progress_ms ?? 0,
    durationMs: track.duration_ms,
  });
}
