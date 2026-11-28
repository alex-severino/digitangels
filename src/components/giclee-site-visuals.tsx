import type { ReactNode } from "react";
import { Media } from "@/components/project-media";
import { SiteScroll } from "@/components/giclee-site-scroll";
import styles from "./giclee-site-visuals.module.css";

export type SiteCapture = {
  src: string;
  width: number;
  height: number;
  viewportHeight: number;
  alt: string;
};

const HOME_DESKTOP: SiteCapture = {
  src: "/projects/giclee-club/current-site/home-desktop.png",
  width: 1440,
  height: 2551,
  viewportHeight: 900,
  alt: "Giclée Club’s current home page, beginning with Art into print and continuing through papers and file approval",
};

const HOME_TABLET: SiteCapture = {
  src: "/projects/giclee-club/current-site/home-tablet.png",
  width: 820,
  height: 2180,
  viewportHeight: 1040,
  alt: "Giclée Club’s current home page on a tablet, from the studio proofs to the preflight engine",
};

const HOME_PHONE: SiteCapture = {
  src: "/projects/giclee-club/current-site/home-phone.png",
  width: 390,
  height: 844,
  viewportHeight: 844,
  alt: "The Giclée Club home page on a phone",
};

const LONDON_STUDIO: SiteCapture = {
  src: "/projects/giclee-club/current-site/studio-tablet.png",
  width: 820,
  height: 1040,
  viewportHeight: 1040,
  alt: "The Print Studio page with an illustration of the London skyline",
};

const WHO_WE_ARE: SiteCapture = {
  src: "/projects/giclee-club/current-site/artists-tablet.png",
  width: 1024,
  height: 768,
  viewportHeight: 768,
  alt: "The current Giclée Club about page, A print studio for the arts",
};

function Device({
  capture,
  className,
  children,
}: {
  capture: SiteCapture;
  className: string;
  children?: ReactNode;
}) {
  const { src, width, height, viewportHeight, alt } = capture;

  return (
    <div className={`${styles.device} ${className}`}>
      <div className={styles.viewport} style={{ aspectRatio: `${width} / ${viewportHeight}` }}>
        {children ?? (
          <Media
            item={{ type: "image", src, width, height, alt }}
            className={styles.capture}
          />
        )}
      </div>
    </div>
  );
}

export function ResponsiveSiteVisual() {
  return (
    <figure className={`${styles.stage} ${styles.responsive}`} data-site-visual="responsive">
      <Device capture={HOME_DESKTOP} className={styles.monitor} />
      <Device capture={HOME_TABLET} className={styles.tablet} />
      <Device capture={HOME_PHONE} className={styles.phone} />
    </figure>
  );
}

export function TabletSiteVisual() {
  return (
    <figure className={`${styles.stage} ${styles.tabletScene}`} data-site-visual="tablet">
      <Device capture={HOME_TABLET} className={styles.tablet}>
        <SiteScroll capture={HOME_TABLET} label="tablet homepage" />
      </Device>
      <Device capture={HOME_PHONE} className={styles.phone} />
    </figure>
  );
}

export function LondonStudioVisual() {
  return (
    <figure className={`${styles.stage} ${styles.studio}`} data-site-visual="studio">
      <Device capture={LONDON_STUDIO} className={styles.tablet} />
      <Device capture={WHO_WE_ARE} className={styles.landscape} />
    </figure>
  );
}

export function HomepageScrollVisual() {
  return (
    <figure className={`${styles.stage} ${styles.homepage}`} data-site-visual="homepage">
      <Device capture={HOME_DESKTOP} className={styles.window}>
        <SiteScroll capture={HOME_DESKTOP} label="desktop homepage" />
      </Device>
    </figure>
  );
}
