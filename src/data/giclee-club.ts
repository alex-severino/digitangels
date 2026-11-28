import type { MediaItem, MediaRow, Project } from "@/data/projects";

export const preflightFilm = {
  type: "video",
  src: "/projects/giclee-club/preflight.mp4",
  poster: "/projects/giclee-club/preflight.lossless.webp",
  alt: "Illustration of artwork inspection, print calculations and the studio hand-off",
} satisfies MediaItem;

export const printTest: MediaItem = {
  type: "image",
  src: "/projects/giclee_club_branding/02.1.png",
  alt: "Giclée Club print test sheet with colour gradients, patterns and registration marks",
  width: 2048,
  height: 1365,
};

export const identityVisuals: MediaRow[] = [
  [
    { type: "image", src: "/projects/giclee_club_branding/02.2.png", alt: "Giclée Club wordmark, graphic elements and colour palette" },
    { type: "image", src: "/projects/giclee_club_branding/03.png", alt: "Giclée Club campaign poster on an easel in a gallery" },
  ],
  [
    { type: "image", src: "/projects/giclee_club_branding/07.1.jpg", alt: "The accent mark on a sign outside the print house" },
    { type: "image", src: "/projects/giclee_club_branding/11.2.jpg", alt: "Giclée Club wordmark rendered in relief" },
  ],
  [
    { type: "image", src: "/projects/giclee_club_branding/11.1.jpg", alt: "Giclée Club street poster" },
    { type: "image", src: "/projects/giclee_club_branding/10.1.png", alt: "Colour studies and printed artwork above a studio desk" },
  ],
  [{ type: "image", src: "/projects/giclee_club_branding/07.2.jpg", alt: "Two framed Giclée Club test prints displayed on a wall" }],
];

export const serviceVisuals: MediaRow[] = [
  [
    { type: "image", src: "/projects/giclee_club_branding/01.png" },
    { type: "image", src: "/projects/giclee_club_branding/05.1.png" },
  ],
  [
    { type: "image", src: "/projects/giclee_club_branding/12.1.png" },
    { type: "image", src: "/projects/giclee_club_branding/10.2.png" },
  ],
  [
    { type: "video", src: "/projects/giclee_club_branding/08.1.mp4" },
    { type: "image", src: "/projects/giclee_club_ecommerce/05.2.png" },
  ],
];

export const filePreparationVisuals: MediaRow[] = [
  [{ type: "video", src: "/projects/giclee_club_ecommerce/04.mp4" }],
  [
    { type: "image", src: "/projects/giclee_club_ecommerce/05.1.jpg" },
    { type: "image", src: "/projects/giclee_club_ecommerce/06.png" },
  ],
  [{ type: "video", src: "/projects/giclee_club_ecommerce/07.mp4" }],
];

export const serviceContactSheet: MediaItem = {
  type: "image",
  src: "/projects/giclee_club_ecommerce/12.png",
  alt: "Earlier studies for the layout and typography of the print service pages",
};

export const printVisuals: MediaRow[] = [
  [
    { type: "image", src: "/projects/giclee_club_branding/06.1.jpg", alt: "Branded end cap of a print mailing tube" },
    { type: "image", src: "/projects/giclee_club_branding/06.2.jpg", alt: "Giclée Club’s branded paper wrapping for fine art prints" },
  ],
  [
    { type: "image", src: "/projects/giclee_club_branding/05.2.jpg", alt: "Print proofing and packaging materials on a studio desk" },
    { type: "image", src: "/projects/giclee_club_branding/12.2.png", alt: "Giclée Club’s studio stamp and certificate" },
  ],
  [
    { type: "image", src: "/projects/giclee_club_branding/08.2.jpg" },
    { type: "image", src: "/projects/giclee_club_branding/09.jpg" },
  ],
  [
    { type: "image", src: "/projects/giclee_club_branding/13.1.png", alt: "Giclée Club premium print portfolio packaging" },
    { type: "image", src: "/projects/giclee_club_branding/13.2.jpg", alt: "Giclée Club’s patterned packing tape on print boxes" },
  ],
];

export const gicleeClub: Project = {
  slug: "giclee-club",
  folder: "giclee-club",
  title: "Giclée Club",
  description:
    "Brand identity and an agentic AI product for a London fine art print house. We designed the path from preparing an artwork file to the finished print.",
  link: { label: "Visit the print house", href: "https://www.gicleeclub.com" },
  roles: ["Brand identity", "Product design", "Agentic AI engineering"],
  categories: ["BRANDING", "PRODUCT DESIGN", "AGENTIC AI"],
  rows: [],
};
