export type WorkCard = {
  slug: string;
  title: string;
  thumbnail: string;
  tags: string[];
  contain?: boolean;
};

export function projectHref(slug: string) {
  return slug === "digitangels" ? "/digitangels" : `/projects/${slug}`;
}

export const WORK_INTRO =
  "I am a CAPITAL D DESIGN advocate emphasising the power of design as a strategic, holistic, and human-centred approach to solving complex problems, shaping experiences, creating meaningful change, and driving business success. Through the profound understanding of users’ needs, flawless user journeys, thoughtful branding and compelling aesthetics, design transcends utility to build trust, loyalty, and a lasting relationship with users, which consequently leads to revenue boosts and increased market shares for successful products.";

export const ART_INTRO =
  "My art project POSTERESS was born out of my big love for graphic design and typography. In my work, I strive to distill complex ideas into their purest form, stripping away the unnecessary to reveal the essence of design. POSTERESS has become part of Grafik.Editions, a curated collection of the world's most exciting graphic designers, illustrators and typographers. I am also a member of People of Print, the world’s largest online directory of independent designers working with print.";

export const ART_COLLAB =
  "POSTERESS collaborated on an apparel line with Fildesign, a design house and manufacturer for ZARA Man, Massimo Dutti, Pull and Bear, Reserved, etc.";

export const ADVERTISING_INTRO =
  "Before entering Tech I had a 10+ years design career in advertising as an award-winning Brand and Art Director in such renowned international agencies as TBWA, DDB and Starcom, working with clients like Coca-Cola, Nestle, Finlandia, Yamaha, among others. I led the end-to-end visual strategy from concept to execution, art-directed photo / video shoots and post-production, and managed large global design and production teams.";

export const workCards: WorkCard[] = [
  {
    slug: "art-workers-united",
    title: "Arts Workers United",
    thumbnail: "/work/thumbnails/art-workers-united.mp4",
    tags: ["digital branding", "digital design", "no code development"],
    contain: true,
  },
  {
    slug: "velvet-horizon",
    title: "Velvet Horizon",
    thumbnail: "/work/thumbnails/alex-de-alma.mp4",
    tags: ["naming, branding", "VISUAL DESIGN", "DIGITAL DESIGN"],
  },
  {
    slug: "giclee-club-branding",
    title: "Giclée Club: Branding",
    thumbnail: "/work/thumbnails/giclee-club-branding.mp4",
    tags: ["naming, branding", "PRODUCT BRANDING", "BRANDING IN UX"],
  },
  {
    slug: "giclee-club-ecommerce",
    title: "Giclée Club: E-comm",
    thumbnail: "/work/thumbnails/giclee-club-ecommerce.mp4",
    tags: ["e-commerce platform", "digital branding", "service design and CX"],
  },
  {
    slug: "crowdy-house",
    title: "CrowdyHouse",
    thumbnail: "/work/thumbnails/crowdy-house.mp4",
    tags: ["branding", "e-commerce platform", "app design"],
  },
  {
    slug: "hypernode",
    title: "Hypernode",
    thumbnail: "/work/thumbnails/hypernode.mp4",
    tags: ["B2B e-commerce platform", "user research", "internal tools"],
    contain: true,
  },
  {
    slug: "digitangels",
    title: "Digitangels",
    thumbnail: "/work/thumbnails/digitangels.mp4",
    tags: ["BRANDING", "DIGITAL DESIGN", "VISUAL DESIGN"],
  },
  {
    slug: "designwise",
    title: "Designwise",
    thumbnail: "/work/thumbnails/designwise.mp4",
    tags: ["WEB DESIGN", "VISUAL DESIGN", "RESPONSIVE DESIGN"],
  },
];

export const artTags = [
  "DIGITAL ART",
  "ART OF DESIGN",
  "POSTER ART",
  "POSTER AS AN ART FORM",
  "TYPOGRAPHY",
  "GRAPHIC DESIGN",
  "DIGITAL DESIGN",
];

export const artLinks = [
  { label: "POSTERESS.COM", href: "https://posteress.com/" },
  {
    label: "POSTERESS ON GRAFIK.EDITIONS",
    href: "https://shop.grafik.net/collections/fine-art-prints/products/angelina-severino",
  },
  {
    label: "INTERVIEW FOR PEOPLE OF PRINT",
    href: "https://www.peopleofprint.com/solo-artist/posteress/",
  },
];

export const artImages = {
  row1: ["/art/01.1.png", "/art/01.2.png", "/art/01.3.png", "/art/01.4.png"],
  hero: "/art/02.png",
  row3: ["/art/03.1.png", "/art/03.2.png", "/art/03.3.png", "/art/03.4.png"],
  row4: ["/art/04.1.png", "/art/04.2.png", "/art/04.3.png", "/art/04.4.png"],
};

export const advertisingTags = [
  "ART DIRECTION",
  "GRAPHIC DESIGN",
  "BRANDING",
  "PHOTOSHOOT PRODUCTION",
  "DESIGN MANAGEMENT",
  "PRINT DESIGN",
  "DIGITAL DESIGN",
];

export const advertisingItems = [
  {
    title: "Coca-Cola bottle: 100 years celebration",
    src: "/advertising/01.png",
  },
  { title: "Coca-Cola: Christmas campaign", src: "/advertising/02.png" },
  { title: "Coca-Cola: CCooking", src: "/advertising/03.png" },
  { title: "Fanta: STRAWberry", src: "/advertising/04.png" },
  { title: "Nescafe: 75 years celebration", src: "/advertising/05.png" },
  { title: "Nestlé: Nesquik Studios", src: "/advertising/06.png" },
  { title: "Volkswagen Tiguan: Roads into Floors", src: "/advertising/07.png" },
  { title: "Kia: The Power to Surprise", src: "/advertising/08.png" },
  { title: "Adidas x 5: World Cup collaboration", src: "/advertising/09.png" },
  { title: "Yamaha: Niken Tour", src: "/advertising/10.png" },
  {
    title: "Finlandia: 1000 Years of Less Ordinary",
    src: "/advertising/11.png",
  },
  { title: "Jameson: Eco campaign", src: "/advertising/12.png" },
];
