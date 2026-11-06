export type Area = {
  /** Two-letter "periodic table" symbol. */
  symbol: string;
  title: string;
  icon: string;
  body: string;
  comingSoon?: boolean;
};

const icon = (name: string) => `/designwise/images/areas/${name}.png`;

export const AREAS: Area[] = [
  {
    symbol: "Br",
    title: "Product Branding",
    icon: icon("branding"),
    body: "Branding is all about creating a real connection with people. It's not only a logo, color palette or even the product anymore – it's about a whole experience. Branding gives tech products a personality – something we can relate to, and trust. It's what sets one app apart from another in our minds.\n\nIn a world where we're bombarded with choices, that connection can make all the difference. Branding is the heart and soul of why we choose one tech product over another.",
  },
  {
    symbol: "Ds",
    title: "Design Systems",
    icon: icon("systems"),
    body: "Design System for product designs serves as a foundational framework, ensuring consistency, efficiency, and scalability across all the design tokens such as color, typography, spacing, components, patterns, etc.\n\nWe teach teams to build Design Systems on Figma Variables – and to pair them with AI. The result is a system your designers can prompt, accelerating delivery while keeping every interface coherent and on-brand.",
  },
  {
    symbol: "Pd",
    title: "Product Design",
    icon: icon("product"),
    body: "Product Design in Tech is a digital solution crafted with heart, purpose, and business goals in mind. Collaborating closely with our diverse team, we will show how to bring ideas to life, one iteration at a time. It's a journey of discovery and innovation, where every click, swipe, and tap is infused with purpose and meaning.\n\nWe teach how to listen, research, learn, and adapt, staying grounded in the real world while embracing the ever-changing landscape of business and user needs.",
  },
  {
    symbol: "Ux",
    title: "UX/UI Design",
    icon: icon("uxui"),
    body: "Every pixel tells a story, and every interaction is an opportunity to delight. We teach how to create interfaces, by crafting experiences that resonate with users on a deep, emotional level. It's about understanding the human behind the screen – what they need, what they love, what brings them joy.\n\nWe will show you how to sketch, wireframe, prototype, and test the designs until they feel just right for the users. Our amazing UX/UI educational team creates pathways that feel intuitive, seamless, and downright magical.",
  },
  {
    symbol: "Dg",
    title: "Digital Design",
    icon: icon("digital"),
    body: "Digital design is a special field where functionality meets artistry. Be it web or app design, illustrations, animations, marketing and social media materials for tech products – our diverse team of talented creators will pour their minds and souls to teach you how to bring your ideas to life with passion and precision.\n\nIt's a continuous exploration of new techniques, trends, and possibilities. We're always learning, always growing, always striving to push the boundaries of what's possible to achieve with digital design.",
  },
  {
    symbol: "Dm",
    title: "Design Management",
    icon: icon("management"),
    body: "The biggest win from design management done right, is when creativity and strategy intertwine to shape the future of product. How we see it, it's much more than just overseeing design projects. It's mainly about inspiring a culture of innovation, collaboration, and integration of design in all areas of product development.\n\nWe will work closely with design and development teams in your company, ensuring that design isn't just a box to tick – it's a driving force with clear roadmaps and strategies.",
  },
];

export const SUPPORT: Area[] = [
  {
    symbol: "Au",
    title: "Design Audit",
    icon: icon("audit"),
    body: "Sometimes, to unlock the full potential of your product team, you need a fresh expert look at their design assets and design processes – design audit.\n\nWe'll work closely with your team to understand your goals, challenges, and aspirations, then roll up our sleeves to identify areas for improvement and innovation. From refining your visual identity to optimising user experiences, or internal workflows, our goal is simple: to elevate your design to new heights and drive tangible results for your business.",
  },
  {
    symbol: "Sp",
    title: "Design Sprints Facilitation",
    icon: icon("sprints"),
    body: "Ready to turbocharge your design process? In just a few days we will orchestrate dynamic design sprints to ignite innovation and drive results.\n\nIt is a four-day process steeped in design methodology and fueled by the principles of design thinking, and it is your team's ticket to validating ideas and solving complex problems with clarity and efficiency. From understanding the end-user's pain points to prototyping realistic solutions and gathering real-time feedback, this design sprint will propel your team closer to innovative breakthroughs.",
  },
  {
    symbol: "Tr",
    title: "Educational Trainings",
    icon: icon("trainings"),
    body: "Our educational hub offers custom-made design trainings tailored to your team's specific needs, covering Design Maturity, Design Systems, Accessibility, Branding in Product, Design Thinking principles and Design Processes.\n\nOur programs empower your team to elevate their design capabilities and drive impactful innovation. Whether they are seasoned designers or new to the field, our trainings provide the tools and insights needed to thrive in today's dynamic design landscape.",
  },
  {
    symbol: "Ws",
    title: "Workshops",
    icon: icon("workshops"),
    body: "During our immersive design workshops, hands-on learning meets most relevant expertise. We offer a wide range of topics, from levelling up Design Maturity and mastering Design Systems to exploring Diversity, Equity, and Inclusion (DEI) in design, refining Branding strategies in product design, and harnessing the power of Design Thinking principles.\n\nIn our workshops, participants engage in dynamic activities, collaborative exercises, and real-world case studies to deepen their understanding and practical application of key design concepts.",
  },
  {
    symbol: "Mt",
    title: "Mentorship",
    icon: icon("mentorship"),
    body: "Our design mentorship program is tailored specifically for tech companies seeking to elevate their design capabilities. Whether you're a burgeoning startup or an established tech giant, our experienced mentors are here to provide personalised guidance and support to your design teams or individuals. We bring years of industry experience and expertise to the table, offering insights into best practices, emerging trends, and strategies for success.\n\nWe'll work closely with your team to identify areas for growth, overcome challenges, and unlock the full potential of your design talent.",
  },
  {
    symbol: "Ex",
    title: "Executive Training",
    icon: "/designwise/images/areas/executive.svg",
    body: "Design is a business driver. Our executive training equips C-level leaders with a clear understanding of the business value of design – how it elevates products, strengthens brands, and fuels sustainable growth.\n\nThrough focused sessions led by seasoned Design Leaders, executives learn to set design strategy and policy from the top down, measure its impact, and build organisations where design is a shared priority. The result is a company that is healthy on the design front, from the boardroom to the product team.",
  },
];

export const LOGOS = [
  ["logo-01.png", "Coca-Cola"],
  ["logo-02.png", "Yamaha"],
  ["logo-03.png", "Mastercard"],
  ["logo-04.png", "Adidas"],
  ["logo-05.png", "Nestlé"],
  ["logo-06.png", "Kia"],
  ["logo-07.png", "Partner"],
  ["logo-08.png", "Volkswagen"],
  ["logo-09.png", "Duracell"],
  ["logo-10.png", "Diverse Leaders in Tech"],
  ["logo-11.png", "Hyundai"],
  ["logo-12.png", "ADPList"],
] as const;

export const DISCIPLINES = [
  "Branding",
  "Product",
  "UX/UI",
  "User Research",
  "Web Design",
  "Illustration",
  "Animation",
  "Design Systems",
  "Design Management",
] as const;

export const MENU = [
  { href: "#mission", label: "Our Mission", icon: icon("management") },
  { href: "#about", label: "About", icon: icon("branding") },
  { href: "#reason-1", label: "Design Education", icon: icon("trainings") },
  { href: "#reason-2", label: "Expert Support", icon: icon("workshops") },
  { href: "#contact", label: "Contact", icon: icon("uxui") },
] as const;

export const EMAIL = "designwise@digitangels.com";
