/**
 * Harvest Framer project pages: scroll, collect media rows, download images.
 * Usage: node scripts/harvest-framer.mjs
 * Note: this script documents the mapping; actual browser harvest is done via MCP.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const PROJECTS = [
  { slug: 'giclee-club-ecommerce', folder: 'giclee_club_ecommerce', url: 'https://familiar-motivation-494888.framer.app/work/giclee-club-ecomm', title: 'Giclée Club: E-comm' },
  { slug: 'giclee-club-branding', folder: 'giclee_club_branding', url: 'https://familiar-motivation-494888.framer.app/work/giclee-club-branding', title: 'Giclée Club: Branding' },
  { slug: 'alex-de-alma', folder: 'alexdealma', url: 'https://familiar-motivation-494888.framer.app/work/velvet-horizon', title: 'Velvet Horizon' },
  { slug: 'art-workers-united', folder: 'artworkersunited', url: 'https://familiar-motivation-494888.framer.app/work/awu', title: 'Art Workers United' },
  { slug: 'crowdy-house', folder: 'crowdyhouse', url: 'https://familiar-motivation-494888.framer.app/work/crowdyhouse', title: 'Crowdy House' },
  { slug: 'designwise', folder: 'designwise', url: 'https://familiar-motivation-494888.framer.app/work/designwise', title: 'DesignWise' },
  { slug: 'digitangels', folder: 'digitangels', url: 'https://familiar-motivation-494888.framer.app/work/digitangels', title: 'Digitangels' },
  { slug: 'hypernode', folder: 'hypernode', url: 'https://familiar-motivation-494888.framer.app/work/hypernode', title: 'Hypernode' },
];

writeFileSync(join(process.cwd(), 'tmp/framer-harvest/projects.json'), JSON.stringify(PROJECTS, null, 2));
console.log('Wrote project list');
