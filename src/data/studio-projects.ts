import type { MediaItem, Project } from "@/data/projects";

export const STUDIO_URL = "https://www.studiobetonika.com/";
export const STEAM_URL = "https://store.steampowered.com/app/4881830/Dvor/";
export const SOUNDTRACK_URL = "https://ditto.fm/dvor";
export const GAMEPLAY_URL = "https://www.youtube.com/watch?v=Vo2kRYIB-5U";

export const studioLogo = {
  type: "image",
  src: "/projects/studio-betonika/logo.png",
  alt: "Studio Betonika wordmark and a concrete façade with one lit window",
  width: 1432,
  height: 365,
} satisfies MediaItem;

export const studioMotion = {
  type: "video",
  src: "/projects/studio-betonika/logo-animation_4s.mp4",
  poster: "/projects/studio-betonika/logo-animation.png",
  alt: "Studio Betonika’s original logo animation on a dark grid, designed by Angelina Severino",
} satisfies MediaItem;

export const studioStacked = {
  type: "image",
  src: "/projects/studio-betonika/facade-study.png",
  alt: "Studio Betonika vertical lockup, with the window grid stacked above the wordmark",
  width: 2961,
  height: 1947,
} satisfies MediaItem;

export const studioHorizontal = {
  type: "image",
  src: "/projects/studio-betonika/studio-wordmark.png",
  alt: "The studio’s wide lockup, with the façade symbol aligned to two rows of lettering",
  width: 2863,
  height: 730,
} satisfies MediaItem;

export const studioDesktop = {
  type: "image",
  src: "/projects/studio-betonika/website-desktop-2x.png",
  alt: "Studio Betonika’s live desktop homepage featuring the animated studio logo and Dvor",
  width: 2880,
  height: 1920,
} satisfies MediaItem;

export const studioMobile = {
  type: "image",
  src: "/projects/studio-betonika/website-mobile-3x.png",
  alt: "Studio Betonika’s live website on a phone",
  width: 1170,
  height: 2532,
} satisfies MediaItem;

export const dvorCover = {
  type: "image",
  src: "/projects/dvor/press/key-art/dvor_horizontal.png",
  alt: "Dvor’s angular white wordmark over painted bands and a concrete panel grid",
  width: 3840,
  height: 2160,
} satisfies MediaItem;

export const dvorTrailer = {
  type: "video",
  src: "/projects/dvor/official-trailer.mp4",
  poster: "/projects/dvor/trailer-poster.png",
  alt: "Dvor official release trailer, with original music and in-game footage",
} satisfies MediaItem;

export const dvorWordmark = {
  type: "image",
  src: "/projects/dvor/press/logo/dvor_logo.svg",
  alt: "Dvor’s angular wordmark",
  width: 3464,
  height: 502,
} satisfies MediaItem;

export const dvorScreens = [
  { type: "image", src: "/projects/dvor/press/screenshots/01_dvor_mainmenu.png", alt: "Dvor’s main menu set into the courtyard scene" },
  { type: "image", src: "/projects/dvor/press/screenshots/02_dvor_pause.png", alt: "Dvor’s pause menu in a concrete frame" },
  { type: "image", src: "/projects/dvor/press/screenshots/03_dvor_winter.png", alt: "Dvor’s winter playfield and snowy courtyard" },
  { type: "image", src: "/projects/dvor/press/screenshots/04_dvor_settings.png", alt: "Gameplay, audio and visual settings in Dvor" },
  { type: "image", src: "/projects/dvor/press/screenshots/05_dvor_tutorial.png", alt: "Dvor’s illustrated tutorial for building a wall" },
  { type: "image", src: "/projects/dvor/press/screenshots/06_dvor_leaderboard.png", alt: "Dvor’s leaderboard interface" },
  { type: "image", src: "/projects/dvor/press/screenshots/07_dvor_controls.png", alt: "Dvor’s control mapping and rebind options" },
  { type: "image", src: "/projects/dvor/press/screenshots/08_dvor_gold.png", alt: "Dvor playfield during the Gold Transformation" },
  { type: "image", src: "/projects/dvor/press/screenshots/09_dvor_seasonselector.png", alt: "The season selection screen shown against Dvor’s summer courtyard" },
  { type: "image", src: "/projects/dvor/press/screenshots/10_dvor_autumn.png", alt: "Dvor’s autumn playfield built into the façade" },
] as const satisfies readonly MediaItem[];

export const studioBetonika: Project = {
  slug: "studio-betonika",
  folder: "studio-betonika",
  title: "Studio Betonika",
  description:
    "Naming, custom lettering, motion and website for an independent game studio. Angelina Severino built the identity around a concrete façade and one lit window.",
  roles: ["Naming", "Brand identity", "Custom lettering", "Motion", "Web design and development"],
  categories: ["BRANDING", "TYPOGRAPHY", "DIGITAL DESIGN"],
  link: { label: "Visit Studio Betonika", href: STUDIO_URL },
  rows: [],
};

export const dvor: Project = {
  slug: "dvor",
  folder: "dvor",
  title: "Dvor",
  description:
    "The art, game design, original soundtrack and Unity engineering behind Dvor, a falling-block game where players build a living concrete façade.",
  roles: ["Naming and art direction", "Game and interface design", "Unity development", "Original music"],
  categories: ["GAME DESIGN", "GAME DEVELOPMENT", "SOUND DESIGN"],
  link: { label: "Dvor on Steam", href: STEAM_URL },
  rows: [],
};
