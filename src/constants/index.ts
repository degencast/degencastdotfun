//url path
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// api key
export const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "";

// links
export const TG_LINK = "https://t.me/castcabal";
export const X_LINK = "https://x.com/degencastdotfun";
export const WARPCAST_LINK = "https://warpcast.com/degencast.eth";
export const PARAGRAPH_LINK = "https://paragraph.xyz/@dgcast";

// CAST TOKEN
export const CAST_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_CAST_TOKEN_ADDRESS;

export const DEGENCAST_APP = process.env.NEXT_PUBLIC_DEGENCAST_APP || "";
export const DEGENCAST_APP_LANDING_PAGE = DEGENCAST_APP === "landing-page";
export const DEGENCAST_APP_ONCHAIN_FUTURES =
  DEGENCAST_APP === "onchain-futures";
