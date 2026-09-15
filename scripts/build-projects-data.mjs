import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";

const ROOT = process.cwd();
const HARVEST = join(ROOT, "tmp/framer-harvest");
const PROJECTS_DIR = join(ROOT, "public/projects");

function padRow(n) {
  return String(n).padStart(2, "0");
}

function extFromUrl(url, tag) {
  if (tag === "video") return ".mp4";
  const clean = url.split("?")[0].toLowerCase();
  if (clean.endsWith(".jpg") || clean.endsWith(".jpeg")) return ".jpg";
  if (clean.endsWith(".webp")) return ".webp";
  if (clean.endsWith(".gif")) return ".gif";
  return ".png";
}

function download(url, dest) {
  if (existsSync(dest)) {
    const size = execSync(`stat -f%z "${dest}"`).toString().trim();
    if (Number(size) > 1000) {
      console.log("skip", dest);
      return;
    }
  }
  console.log("get", dest);
  execSync(`curl -fsSL --retry 3 "${url}" -o "${dest}"`, { stdio: "inherit" });
}

function buildRows(folder, rows) {
  const out = [];
  rows.forEach((row, rowIndex) => {
    const rowNum = rowIndex + 1;
    const items = row.items || [];
    const built = [];
    items.forEach((item, itemIndex) => {
      const multi = items.length > 1;
      const suffix = multi ? `.${itemIndex + 1}` : "";
      const ext = extFromUrl(item.fullSrc || item.src, item.tag);
      const filename = `${padRow(rowNum)}${suffix}${ext}`;
      const abs = join(PROJECTS_DIR, folder, filename);
      const url =
        item.tag === "video"
          ? item.fullSrc || item.src
          : (item.fullSrc || item.src).includes("scale-down-to=")
            ? item.fullSrc || item.src
            : `${item.src}?scale-down-to=2048`;
      // Prefer existing numbered image; always ensure video exists from Framer for fidelity
      if (item.tag === "video" || !existsSync(abs)) {
        try {
          download(url, abs);
        } catch (e) {
          console.error("FAIL", abs, e.message);
        }
      }
      if (existsSync(abs)) {
        built.push({
          type: item.tag === "video" ? "video" : "image",
          src: `/projects/${folder}/${encodeURIComponent(filename)}`,
        });
      }
    });
    if (built.length) out.push(built);
  });
  return out;
}

function loadHarvest(slug) {
  return JSON.parse(readFileSync(join(HARVEST, `${slug}.json`), "utf8"));
}

const ecommerce = {
  slug: "giclee-club-ecommerce",
  folder: "giclee_club_ecommerce",
  title: "Giclée Club: E-Commerce Platform",
  description:
    "As the Design Director and Product Designer for Giclée Club, I shaped the platform into a leading e-commerce destination for visual artists. My role was to ensure that every aspect of the platform was aligned with the brand strategy, and worked seamlessly making it easy for artists to print and sell their work as Fine Art prints. I led the design efforts from start to finish, creating a user experience that reflected the high standards of Giclée printing. My goal was to make the platform intuitive and visually appealing, ensuring it met the needs of artists who care about quality and presentation. The main challenge was balancing aesthetics with functionality, creating a space where art and technology come together effortlessly. The result is an e-commerce platform that artists can trust to print and sell their work, all while maintaining the highest level of quality.",
  link: { label: "GICLEECLUB.COM", href: "https://gicleeclub.com" },
  roles: [
    "NAMING",
    "CREATIVE STRATEGY",
    "BRAND DESIGN",
    "VISUAL DESIGN",
    "PRODUCT, UX/UI DESIGN",
    "ART DIRECTION",
    "PROJECT MANAGEMENT",
  ],
  categories: [
    "BRANDING",
    "CREATIVE STRATEGY",
    "DIGITAL DESIGN",
    "VISUAL DESIGN",
    "PRODUCT DESIGN",
    "PROJECT MANAGEMENT",
  ],
  rows: [
    [{ type: "image", src: "/projects/giclee_club_ecommerce/01.png" }],
    [{ type: "video", src: "/projects/giclee_club_ecommerce/02.mp4" }],
    [
      { type: "image", src: "/projects/giclee_club_ecommerce/03.1.png" },
      { type: "video", src: "/projects/giclee_club_ecommerce/03.2.mp4" },
    ],
    [{ type: "video", src: "/projects/giclee_club_ecommerce/04.mp4" }],
    [
      { type: "image", src: "/projects/giclee_club_ecommerce/05.1.jpg" },
      { type: "image", src: "/projects/giclee_club_ecommerce/05.2.png" },
    ],
    [{ type: "image", src: "/projects/giclee_club_ecommerce/06.png" }],
    [{ type: "video", src: "/projects/giclee_club_ecommerce/07.mp4" }],
    [
      { type: "image", src: "/projects/giclee_club_ecommerce/08.1.png" },
      { type: "image", src: "/projects/giclee_club_ecommerce/08.2.png" },
    ],
    [{ type: "video", src: "/projects/giclee_club_ecommerce/09.mp4" }],
    [{ type: "image", src: "/projects/giclee_club_ecommerce/10.png" }],
    [{ type: "image", src: "/projects/giclee_club_ecommerce/11.png" }],
    [{ type: "image", src: "/projects/giclee_club_ecommerce/12.png" }],
  ],
};

const slugs = [
  "giclee-club-branding",
  "alex-de-alma",
  "art-workers-united",
  "crowdy-house",
  "designwise",
  "digitangels",
  "hypernode",
];

const projects = [ecommerce];

for (const slug of slugs) {
  const data = loadHarvest(slug);
  const title =
    slug === "alex-de-alma" ? "Velvet Horizon" : data.title;
  projects.push({
    slug: data.slug,
    folder: data.folder,
    title,
    description: data.description,
    link: data.link || undefined,
    roles: data.roles || [],
    categories: data.categories || [],
    rows: buildRows(data.folder, data.rows || []),
  });
}

function serialize(value) {
  return JSON.stringify(value, null, 2)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/"/g, '"');
}

const ts = `export type MediaItem = {
  type: "image" | "video";
  src: string;
};

export type MediaRow = MediaItem[];

export type Project = {
  slug: string;
  folder: string;
  title: string;
  description: string;
  link?: { label: string; href: string };
  roles: string[];
  categories: string[];
  rows: MediaRow[];
};

export const projects: Project[] = ${JSON.stringify(projects, null, 2)};

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
`;

writeFileSync(join(ROOT, "src/data/projects.ts"), ts);
console.log("Wrote src/data/projects.ts with", projects.length, "projects");
for (const p of projects) {
  console.log(`- ${p.slug}: ${p.rows.length} rows`);
}
