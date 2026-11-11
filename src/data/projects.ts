export type MediaItem = {
  type: "image" | "video";
  src: string;
};

export type MediaRow = MediaItem[];

export type ProjectBlock =
  | {
      kind: "band";
      background: string;
      media: MediaItem;
      inset?: boolean;
      caption?: string;
      captionColor?: string;
    }
  | {
      kind: "media";
      items: MediaItem[];
      inset?: boolean;
    }
  | {
      kind: "split";
      background?: string;
      mediaSide: "left" | "right";
      media: MediaItem;
      title: string;
      body: string;
      textColor?: string;
    }
  | {
      kind: "split-stack";
      background?: string;
      mediaSide: "left" | "right";
      primary: MediaItem;
      secondary?: MediaItem[];
      title: string;
      body: string;
      textColor?: string;
    };

export type Project = {
  slug: string;
  folder: string;
  title: string;
  description: string;
  link?: { label: string; href: string };
  roles: string[];
  categories: string[];
  rows: MediaRow[];
  /** Rich layout sections after the intro (AWU, Designwise, etc.) */
  blocks?: ProjectBlock[];
  /** When set, intro aside shows Team credits instead of roles list */
  team?: string;
  asideLabel?: string;
};

export const projects: Project[] = [
  {
    "slug": "giclee-club-ecommerce",
    "folder": "giclee_club_ecommerce",
    "title": "Giclée Club: E-comm",
    "description": "Digitangels shaped Giclée Club into a leading e-commerce destination for visual artists. We aligned every aspect of the platform with the brand strategy, so artists can print and sell their work as Fine Art prints with ease. The team led the design from start to finish, creating a user experience that reflected the high standards of Giclée printing. The goal was to make the platform intuitive and visually appealing, meeting the needs of artists who care about quality and presentation. The main challenge was balancing aesthetics with functionality, creating a space where art and technology come together effortlessly. The result is an e-commerce platform that artists can trust to print and sell their work, all while maintaining the highest level of quality.",
    "link": {
      "label": "GICLEECLUB.COM",
      "href": "https://gicleeclub.com"
    },
    "roles": [
      "NAMING",
      "CREATIVE STRATEGY",
      "BRAND DESIGN",
      "VISUAL DESIGN",
      "PRODUCT, UX/UI DESIGN",
      "ART DIRECTION",
      "PROJECT MANAGEMENT"
    ],
    "categories": [
      "BRANDING",
      "CREATIVE STRATEGY",
      "DIGITAL DESIGN",
      "VISUAL DESIGN",
      "PRODUCT DESIGN",
      "PROJECT MANAGEMENT"
    ],
    "rows": [
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/01.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/work/thumbnails/giclee-club-ecommerce.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/03.1.png"
        },
        {
          "type": "video",
          "src": "/projects/giclee_club_ecommerce/03.2.mp4"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/giclee_club_ecommerce/04.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/05.1.jpg"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/05.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/06.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/giclee_club_ecommerce/07.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/08.1.png"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/08.2.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/giclee_club_ecommerce/09.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/10.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/11.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_ecommerce/12.png"
        }
      ]
    ]
  },
  {
    "slug": "giclee-club-branding",
    "folder": "giclee_club_branding",
    "title": "Giclée Club: Branding",
    "description": "Giclée Club is a platform for visual artists looking to print and sell Fine Art prints of their work. Inspired by the term \"Giclée,\" synonymous with the highest museum-quality printing, we created a brand identity that resonates with visual artists seeking excellence. Digitangels drew inspiration from the classical test print page to create a cohesive visual identity, where every design element was thoughtfully derived from the Giclée Club logo. The acute accent on the é became a key symbol, representing the brand’s French roots and commitment to refinement. We also developed a broad, gradient-rich color palette that captures the endless possibilities of Giclée printing, ensuring that both artists and art lovers experience a visually satisfying journey on the platform. This work emphasised the importance of cohesive product branding, where the e-commerce platform was meticulously designed to align with and enhance the overall brand identity.",
    "link": {
      "label": "GICLEECLUB.COM",
      "href": "https://gicleeclub.com"
    },
    "roles": [
      "NAMING",
      "CREATIVE STRATEGY",
      "BRAND DESIGN",
      "VISUAL DESIGN",
      "PRODUCT, UX/UI DESIGN",
      "ART DIRECTION",
      "PROJECT MANAGEMENT"
    ],
    "categories": [
      "BRANDING",
      "CREATIVE STRATEGY",
      "DIGITAL DESIGN",
      "VISUAL DESIGN",
      "PRODUCT DESIGN",
      "PROJECT MANAGEMENT"
    ],
    "rows": [
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/01.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/02.1.png"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/02.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/03.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/04.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/05.1.png"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/05.2.jpg"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/06.1.jpg"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/06.2.jpg"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/07.1.jpg"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/07.2.jpg"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/giclee_club_branding/08.1.mp4"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/08.2.jpg"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/09.jpg"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/10.1.png"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/10.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/11.1.jpg"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/11.2.jpg"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/12.1.png"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/12.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/13.1.png"
        },
        {
          "type": "image",
          "src": "/projects/giclee_club_branding/13.2.jpg"
        }
      ]
    ]
  },
  {
    "slug": "velvet-horizon",
    "folder": "alexdealma",
    "title": "Velvet Horizon",
    "description": "Digitangels crafted a brand identity for Velvet Horizon – a one-man music band exploring love, fears, dreams, and societal expectations. The visual motif centres on the contrast between the clear and blurred horizon, symbolising the album's thematic ambiguity. To amplify the disruptive nature of the music artist, we used bold, explosive colours traditionally associated with femininity. This design approach captures the album’s essence, blending clarity with obscurity to mirror the complex emotions and societal boundaries the artist explores.",
    "roles": [
      "CREATIVE STRATEGY",
      "BRAND DESIGN",
      "VISUAL DESIGN",
      "TYPOGRAPHY",
      "ART DIRECTION",
      "ANIMATION",
      "PROJECT MANAGEMENT"
    ],
    "categories": [
      "BRANDING",
      "ART DIRECTION",
      "DIGITAL DESIGN",
      "VISUAL DESIGN",
      "TYPOGRAPHY",
      "PROJECT MANAGEMENT"
    ],
    "rows": [
      [
        {
          "type": "video",
          "src": "/projects/alexdealma/01.mp4"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/alexdealma/02.1.mp4"
        },
        {
          "type": "image",
          "src": "/projects/alexdealma/02.2.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/alexdealma/03.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/04.1.png"
        },
        {
          "type": "image",
          "src": "/projects/alexdealma/04.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/05.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/06.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/alexdealma/07.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/08.1.png"
        },
        {
          "type": "image",
          "src": "/projects/alexdealma/08.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/09.1.png"
        },
        {
          "type": "image",
          "src": "/projects/alexdealma/09.2.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/alexdealma/10.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/11.1.png"
        },
        {
          "type": "image",
          "src": "/projects/alexdealma/11.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/12.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/13.1.png"
        },
        {
          "type": "image",
          "src": "/projects/alexdealma/13.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/14.1.png"
        },
        {
          "type": "image",
          "src": "/projects/alexdealma/14.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/alexdealma/15.png"
        }
      ]
    ]
  },
  {
    "slug": "art-workers-united",
    "folder": "artworkersunited",
    "title": "Arts Workers United",
    "description": "Arts Workers United (AWU) is dedicated to empowering and advocating for arts workers across the United States. Their mission is to educate, organise, and mobilise individuals to advance the interests of the Creative Economy through visible advocacy, grassroots efforts, and impactful lobbying. Digitangels was entrusted with creating a web platform that would serve as the central hub for their mission. AWU needed an online space that would inform, inspire and unite their community. We designed a platform to facilitate donations, allowing supporters to directly contribute to AWU’s advocacy efforts, and to offer membership options that fostered a strong, interconnected community. The site provides essential resources and real-time updates on legislative actions, empowering grassroots efforts and amplifying the voice of the Arts & Culture sector. Our design work aimed to make the platform a powerful tool in the national conversation, ensuring that arts workers had the visibility and support they needed.",
    "link": {
      "label": "ARTSWORKERSUNITED.COM",
      "href": "https://www.artsworkersunited.com/"
    },
    "asideLabel": "Team",
    "team": "AWU: Nhi Corcoran, Jenny Grace Makholm, Carson Elrod\nDESIGN DIRECTOR: Angelina Severino\nWEB DESIGNER: Lucie van Baaren aka Summerthyme\nWEBFLOW DEVELOPER: Irina Zaman\nBRANDING: One Design Company",
    "roles": [
      "digital branding",
      "ART DIRECTION",
      "digital design",
      "STAKEHOLDER MANAGEMENT",
      "DESIGN MANAGEMENT",
      "IMPLEMENTATION MANAGEMENT"
    ],
    "categories": [
      "WEB DESIGN",
      "ART DIRECTION",
      "WEBFLOW",
      "NON-PROFIT",
      "STAKEHOLDER MANAGEMENT",
      "DESIGN MANAGEMENT",
      "IMPLEMENTATION MANAGEMENT"
    ],
    "rows": [
      [
        {
          "type": "video",
          "src": "/projects/artworkersunited/01.mp4"
        }
      ]
    ],
    "blocks": [
      {
        "kind": "split",
        "background": "#e5c4e4",
        "mediaSide": "left",
        "media": {
          "type": "video",
          "src": "/projects/artworkersunited/02.mp4"
        },
        "title": "Power of Branding",
        "body": "AWU’s award-winning branding is a masterful storytelling tool that brings their mission to life. AWU's mark – a modern interpretation of a traditional union seal – was a natural choice for animation in the homepage header, instantly drawing users into the narrative of solidarity and empowerment.\n\nThe powerful ligatures create a palpable sense of unity, which we expanded upon by incorporating custom ligatures into every header's title. This consistent, cohesive design language reinforces AWU’s message of collective strength and purpose."
      },
      {
        "kind": "split",
        "mediaSide": "right",
        "media": {
          "type": "image",
          "src": "/projects/artworkersunited/03.png"
        },
        "title": "Ligatures",
        "body": "Creating custom ligatures for AWU’s website was both an artistic and technical challenge. The process involved carefully integrating these new ligatures into the existing font file, ensuring that all text remained SEO-friendly and recognisable by Google. This required meticulous attention to detail, particularly when activating the ligatures in Webflow by assigning a custom “ligature” class.\n\nTo ensure a seamless client hand-off, we thoroughly documented each step of the process, providing clear instructions for future use and updates, guaranteeing that the brand's unique visual identity remains consistent and functional."
      },
      {
        "kind": "band",
        "background": "#8e37ff",
        "inset": true,
        "media": {
          "type": "video",
          "src": "/projects/artworkersunited/04.mp4"
        }
      },
      {
        "kind": "split",
        "background": "#e5c4e4",
        "mediaSide": "left",
        "media": {
          "type": "video",
          "src": "/projects/artworkersunited/05.mp4"
        },
        "title": "Attention to detail",
        "body": "We paid great attention to detail in the design of AWU's website, ensuring that every aspect contributed to a cohesive and engaging user experience. Micro-interactions were carefully crafted to provide subtle, responsive feedback, making navigation feel intuitive and rewarding. On-scroll animations were thoughtfully implemented to guide the user's journey, highlighting key content and enhancing the storytelling experience. These elements, combined, create a dynamic and immersive website that not only captures attention but also keeps users deeply engaged with the content."
      },
      {
        "kind": "band",
        "background": "#bb92f7",
        "inset": true,
        "media": {
          "type": "video",
          "src": "/projects/artworkersunited/06.mp4"
        }
      },
      {
        "kind": "band",
        "background": "#c8ebf1",
        "inset": true,
        "media": {
          "type": "video",
          "src": "/projects/artworkersunited/07.mp4"
        },
        "caption": "We created playful interactive elements that allow users to almost \"physically\" interact with the brand, making the digital experience feel tactile and engaging"
      },
      {
        "kind": "band",
        "background": "#000000",
        "inset": true,
        "media": {
          "type": "video",
          "src": "/projects/artworkersunited/08.mp4"
        }
      },
      {
        "kind": "band",
        "background": "#5062ff",
        "inset": true,
        "media": {
          "type": "video",
          "src": "/projects/artworkersunited/09.mp4"
        },
        "caption": "We crafted a cogwheel animation using AWU's marks (seals) to symbolise arts workers as a powerful, interconnected mechanism driving the creative sector, visually reinforcing their crucial role in the economy",
        "captionColor": "#ffffff"
      },
      {
        "kind": "split-stack",
        "background": "#e5c4e4",
        "mediaSide": "left",
        "primary": {
          "type": "image",
          "src": "/projects/artworkersunited/10.png"
        },
        "secondary": [
          {
            "type": "video",
            "src": "/projects/artworkersunited/11.1.mp4"
          },
          {
            "type": "video",
            "src": "/projects/artworkersunited/11.2.mp4"
          }
        ],
        "title": "Responsiveness",
        "body": "And of course, we made sure that the website is responsive on all devices, ensuring a seamless experience whether users are browsing on a desktop, tablet, or smartphone. The design adapts fluidly to different screen sizes, maintaining the integrity of the visuals and the functionality of interactive elements."
      },
      {
        "kind": "split",
        "background": "#000000",
        "mediaSide": "right",
        "media": {
          "type": "image",
          "src": "/projects/artworkersunited/12.png"
        },
        "title": "Style guide",
        "body": "As part of the hand-off, we created a comprehensive website style guide to ensure consistency in AWU's branding across all digital platforms. The guide includes detailed specifications for typography, outlining the fonts, sizes, and spacing to be used throughout the site. It also covers UI elements and the colour palette, ensuring that the brand's visual identity remains strong and consistent in all future updates and iterations.",
        "textColor": "#ffffff"
      },
      {
        "kind": "media",
        "items": [
          {
            "type": "video",
            "src": "/projects/artworkersunited/13.mp4"
          }
        ]
      }
    ]
  },
  {
    "slug": "crowdy-house",
    "folder": "crowdyhouse",
    "title": "Crowdyhouse",
    "description": "For CrowdyHouse, Digitangels led brand and product design, shaping the identity of this e-commerce platform as a launchpad and marketplace for designers and makers. The mission was to democratise the design industry by enabling creatives, whether new or established, to sell directly to design enthusiasts worldwide. We created a brand that reflected this mission of empowerment, and a product design that streamlined the process, allowing designers to maximise their profits while bringing diverse, high-quality design to a global audience.",
    "roles": [
      "CREATIVE STRATEGY",
      "BRAND DESIGN",
      "VISUAL DESIGN",
      "web and app design",
      "ART DIRECTION"
    ],
    "categories": [
      "BRANDING",
      "ART DIRECTION",
      "DIGITAL DESIGN",
      "VISUAL DESIGN",
      "MVP DESIGN",
      "CREATIVE STRATEGY"
    ],
    "rows": [
      [
        {
          "type": "video",
          "src": "/projects/crowdyhouse/01.mp4"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/crowdyhouse/02.mp4"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/crowdyhouse/03.mp4"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/crowdyhouse/04.mp4"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/crowdyhouse/05.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/crowdyhouse/06.jpg"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/crowdyhouse/07.mp4"
        }
      ]
    ]
  },
  {
    "slug": "designwise",
    "folder": "designwise",
    "title": "Designwise",
    "description": "Designwise is the educational wing of Digitangels, dedicated to elevating the understanding and impact of design on the business world. They champion the importance of quality design across the tech industry and beyond, helping businesses recognise and harness the power of strategic design. We shaped Designwise’s creative vision and brand strategy, designed the branding elements, crafted a cohesive web presence, and aligned every visual component with their strategic goals. The team focused on creating a compelling and consistent brand experience, enhancing Designwise’s ability to engage and inspire their audience.",
    "roles": [
      "NAMING",
      "CREATIVE STRATEGY",
      "BRAND DESIGN",
      "VISUAL DESIGN",
      "WEB DESIGN",
      "ART DIRECTION",
      "PROJECT MANAGEMENT"
    ],
    "categories": [
      "DESIGN STRATEGY",
      "BRAND STRATEGY",
      "WEB DESIGN",
      "VISUAL DESIGN",
      "ART DIRECTION",
      "DESIGN MANAGEMENT",
      "IMPLEMENTATION MANAGEMENT"
    ],
    "rows": [
      [
        {
          "type": "image",
          "src": "/projects/designwise/01.png"
        }
      ]
    ],
    "blocks": [
      {
        "kind": "band",
        "background": "#cff63a",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/02.mp4" }
      },
      {
        "kind": "band",
        "background": "#e3e3e3",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/03.mp4" }
      },
      {
        "kind": "band",
        "background": "#121814",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/04.mp4" }
      },
      {
        "kind": "band",
        "background": "#cff63a",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/05.mp4" }
      },
      {
        "kind": "band",
        "background": "#cff63a",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/06.mp4" }
      },
      {
        "kind": "band",
        "background": "#c1cdc4",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/07.mp4" }
      },
      {
        "kind": "band",
        "background": "#c1cdc4",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/08.mp4" }
      },
      {
        "kind": "band",
        "background": "#cff63a",
        "inset": true,
        "media": { "type": "video", "src": "/projects/designwise/09.mp4" }
      }
    ]
  },
  {
    "slug": "digitangels",
    "folder": "digitangels",
    "title": "Digitangels",
    "description": "Digitangels is a Design Transformation advisory that integrates creativity and technology across digital innovation. We developed a branding strategy and visual identity that reflects our mission to guide businesses, start-ups, and entrepreneurs through the complexities of digital and product design, management, and marketing. The name \"Digitangels\" inspired a theme of angelic digital assistance, brought to life with a halo as the central branding element. Our design features monochromatic, futuristic patterns and floating abstract shapes, symbolising the challenging, ever-evolving digital landscape that Digitangels helps clients navigate and conquer.",
    "roles": [
      "NAMING",
      "CREATIVE STRATEGY",
      "BRAND DESIGN",
      "VISUAL DESIGN",
      "ART DIRECTION",
      "ANIMATION",
      "PROJECT MANAGEMENT"
    ],
    "categories": [
      "BRANDING",
      "CREATIVE STRATEGY",
      "DIGITAL DESIGN",
      "VISUAL DESIGN",
      "ART DIRECTION",
      "PROJECT MANAGEMENT"
    ],
    "rows": [
      [
        {
          "type": "video",
          "src": "/projects/digitangels/01.mp4"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/digitangels/02.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/03.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/04.1.png"
        },
        {
          "type": "image",
          "src": "/projects/digitangels/04.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/05.1.png"
        },
        {
          "type": "video",
          "src": "/projects/digitangels/05.2.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/06.1.jpg"
        },
        {
          "type": "image",
          "src": "/projects/digitangels/06.2.jpg"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/07.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/08.1.png"
        },
        {
          "type": "image",
          "src": "/projects/digitangels/08.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/09.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/10.1.png"
        },
        {
          "type": "image",
          "src": "/projects/digitangels/10.2.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/digitangels/11.mp4"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/12.1.png"
        },
        {
          "type": "image",
          "src": "/projects/digitangels/12.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/13.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/14.1.png"
        },
        {
          "type": "image",
          "src": "/projects/digitangels/14.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/digitangels/15.png"
        }
      ]
    ]
  },
  {
    "slug": "hypernode",
    "folder": "hypernode",
    "title": "Hypernode",
    "description": "Digitangels led UX/UI design and user research for Hypernode, shaping a platform that offers a robust and scalable hosting solution tailored for e-commerce businesses. We focused on understanding user needs and behaviours, which informed the design of an intuitive and efficient user interface. Through in-depth user research, the team ensured that the platform not only meets the technical requirements of developers and businesses but also provides a seamless experience that enhances productivity and satisfaction.",
    "link": {
      "label": "HYPERNODE.COM",
      "href": "https://www.hypernode.com/en/"
    },
    "roles": [
      "USER RESEARCH",
      "USABILITY TESTING",
      "UX/UI DESIGN",
      "DIGITAL ILLUSTRATION"
    ],
    "categories": [
      "USER RESEARCH",
      "UX/UI DESIGN",
      "PRODUCT DESIGN",
      "VISUAL DESIGN",
      "USABILITY TESTING",
      "DIGITAL ILLUSTRATION"
    ],
    "rows": [
      [
        {
          "type": "image",
          "src": "/projects/hypernode/01.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/hypernode/02.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/hypernode/03.1.png"
        },
        {
          "type": "image",
          "src": "/projects/hypernode/03.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/hypernode/04.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/hypernode/05.1.png"
        },
        {
          "type": "image",
          "src": "/projects/hypernode/05.2.png"
        }
      ],
      [
        {
          "type": "image",
          "src": "/projects/hypernode/06.png"
        }
      ],
      [
        {
          "type": "video",
          "src": "/projects/hypernode/07.mp4"
        }
      ]
    ]
  }
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
