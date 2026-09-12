import albumDiamondDre from "@/assets/album-diamond-dre.jpg.asset.json";
import albumAlt from "@/assets/album-alt.jpg.asset.json";
import merchHoodie from "@/assets/merch-hoodie.jpg.asset.json";
import merchTshirt from "@/assets/merch-tshirt.jpg.asset.json";
import merchCaps from "@/assets/merch-caps.jpg.asset.json";
import beats from "@/assets/beats.jpg.asset.json";
import ticket from "@/assets/ticket.jpg.asset.json";
import festival from "@/assets/festival.jpg.asset.json";
import heroPortrait from "@/assets/hero-portrait.jpg.asset.json";
import bioPortrait from "@/assets/bio-portrait.jpg.asset.json";
import bioSquare from "@/assets/bio-square.jpg.asset.json";
import katAlt from "@/assets/kat-alt.jpg.asset.json";
import studioSession from "@/assets/studio-session.jpg.asset.json";
import cookingUp from "@/assets/cooking-up.jpg.asset.json";
import collab from "@/assets/collab.jpg.asset.json";
import videoYouWrong from "@/assets/video-you-wrong.jpg.asset.json";
import artFlowrocious from "@/assets/Flowrocious.webp.asset.json";
import artFoolish from "@/assets/Foolish.webp.asset.json";
import artForever from "@/assets/Forever.webp.asset.json";
import artGunSmoke from "@/assets/Gun_Smoke.webp.asset.json";
import artHeavyweight from "@/assets/Heavyweight.webp.asset.json";
import artMobManuscript from "@/assets/Mob_Manuscript.webp.asset.json";
import artOG from "@/assets/OG.webp.asset.json";
import artRememberMe from "@/assets/Remember_Me.webp.asset.json";
import artRideLikeTheWind from "@/assets/Ride_Like_The_Wind.webp.asset.json";
import artTakeover from "@/assets/Takeover.webp.asset.json";
import audioTheReturn from "@/assets/THE_RETURN.mp3.asset.json";
import audioForever from "@/assets/Forever.mp3.asset.json";
import audioOG from "@/assets/OG_feat._Flea_the_Boss_Dog.mp3.asset.json";
import audioRememberMe from "@/assets/REMEMBER_ME_feat._Krino.mp3.asset.json";
import audioTheTakeover from "@/assets/THE_TAKEOVER.mp3.asset.json";
import audioHeavyweight from "@/assets/HEAVY_WEIGHT.mp3.asset.json";
import audioFoolish from "@/assets/FOOLISH.mp3.asset.json";
import audioFlowrocious from "@/assets/FLOWROCIOUS_feat_Joy_the_Explorer.mp3.asset.json";
import audioGunSmoke from "@/assets/GUN_SMOKE.mp3.asset.json";
import artWeShallReign from "@/assets/We_Shall_Reign.webp.asset.json";
import audioWeShallReign from "@/assets/WE_SHALL_REIGN_feat_Krino.mp3.asset.json";
import coverBiographyOfAMadeMan from "@/assets/Biography_of_a_Made_Man.png.asset.json";
import coverMobbinMuzikMelodies from "@/assets/Mobbin_Muzik_Melodies.png.asset.json";
import coverTheLyricalLion from "@/assets/The_Lyrical_Lion.png.asset.json";

export const site = {
  name: "Klondike Kat",
  tagline: "The Lyrical Lion",
  city: "South Park, Houston, TX",
  bookingEmail: "klondikekatbooking@gmail.com",
  legacyStore: "https://www.klondikekat.com",
};

export const images = {
  hero: heroPortrait.url,
  bioPortrait: bioPortrait.url,
  bioSquare: bioSquare.url,
  katAlt: katAlt.url,
  studioSession: studioSession.url,
  cookingUp: cookingUp.url,
  collab: collab.url,
  videoYouWrong: videoYouWrong.url,
};

export type Product = {
  handle: string;
  title: string;
  price: number;
  compareAt?: number;
  image: string;
  category: "Singles" | "Albums" | "Merch" | "Tickets" | "Production";
  blurb: string;
  externalUrl: string;
  options?: { name: string; values: string[] };
};

const P = "https://www.klondikekat.com/product-page";

export type BundleTrack = {
  title: string;
  externalUrl: string;
  audioUrl?: string;
};

export const diamondDre = {
  handle: "diamond-dre",
  title: "Exclusive Diamond Dre Album",
  image: albumDiamondDre.url,
  cdImage: albumAlt.url,
  blurb:
    "The Diamond Dre project in one place — grab the physical CD, download the full album, or pick up songs one at a time.",
  cdPrice: 23.99,
  cdCompareAt: 29.99,
  albumPrice: 19.99,
  singlePrice: 1.99,
  cdUrl: `${P}/country-vibes-ep`,
  albumUrl: `${P}/exclusive-diamond-dre-album`,
  bundleUrl: `${P}/vip-meet-greet`,
  bundlePrice: 23.99,
  tracks: [
    { title: "Hold You Down", externalUrl: `${P}/hold-you-down-exclusive-single-from-diamond-dre-album` },
    { title: "Back On The Block", externalUrl: `${P}/back-on-the-block-exclusive-single-from-diamond-dre-album` },
    { title: "Sex Ed", externalUrl: `${P}/copy-of-copy-of-copy-of-copy-of-copy-of-exclusive-diamond-dre-album` },
    { title: "Who Kat", externalUrl: `${P}/copy-of-copy-of-copy-of-copy-of-exclusive-diamond-dre-album` },
    { title: "Slippin'", externalUrl: `${P}/copy-of-copy-of-copy-of-exclusive-diamond-dre-album` },
    { title: "Don't Cha", externalUrl: `${P}/copy-of-copy-of-exclusive-diamond-dre-album` },
    { title: "Everything", externalUrl: `${P}/copy-of-exclusive-diamond-dre-album` },
  ] as BundleTrack[],
};

/** Retired listings now folded into the Diamond Dre bundle page. */
export const productAliases: Record<string, string> = Object.fromEntries(
  [
    "hold-you-down",
    "back-on-the-block",
    "sex-ed",
    "who-kat",
    "slippin",
    "dont-cha",
    "everything",
    "exclusive-diamond-dre-album",
    "diamond-dre-album-physical",
    "albums-and-singles",
  ].map((h) => [h, diamondDre.handle]),
);

export const products: Product[] = [
  {
    handle: diamondDre.handle,
    title: diamondDre.title,
    price: diamondDre.singlePrice,
    image: diamondDre.image,
    category: "Albums",
    blurb: diamondDre.blurb,
    externalUrl: diamondDre.albumUrl,
  },
  {
    handle: "the-lyrical-lion-cd",
    title: "The Lyrical Lion — Physical CD",
    price: 19.99,
    image: coverTheLyricalLion.url,
    category: "Albums",
    blurb: "Physical CD of the 1993 debut EP. Home of the classic S.P.C. click record.",
    externalUrl: `${P}/the-lyrical-lion-cd`,
  },
  {
    handle: "mobbin-muzik-melodies-cd",
    title: "Mobbin' Muzik Melodies — Physical CD",
    price: 19.99,
    image: coverMobbinMuzikMelodies.url,
    category: "Albums",
    blurb: "Physical CD of the 1997 Beatbox Records release.",
    externalUrl: `${P}/mobbin-muzik-melodies-cd`,
  },
  {
    handle: "biography-of-a-made-man-cd",
    title: "Biography Of A Made Man — Physical CD",
    price: 19.99,
    image: coverBiographyOfAMadeMan.url,
    category: "Albums",
    blurb: "Physical CD of the Biography Of A Made Man album.",
    externalUrl: `${P}/biography-of-a-made-man-cd`,
  },
  {
    handle: "signature-hoodie",
    title: "Signature Hoodie",
    price: 40,
    image: merchHoodie.url,
    category: "Merch",
    blurb: "Heavyweight hoodie with the Klondike Kat signature mark.",
    externalUrl: `${P}/signature-hoodie`,
    options: { name: "Size", values: ["S", "M", "L", "XL", "2XL"] },
  },
  {
    handle: "klondike-kat-t-shirt",
    title: "Klondike Kat T-Shirt",
    price: 20,
    image: merchTshirt.url,
    category: "Merch",
    blurb: "Classic tee repping the Lyrical Lion.",
    externalUrl: `${P}/klondike-kat-t-shirt`,
    options: { name: "Size", values: ["S", "M", "L", "XL", "2XL"] },
  },
  {
    handle: "limited-edition-cap",
    title: "Limited Edition Caps",
    price: 25,
    image: merchCaps.url,
    category: "Merch",
    blurb: "Limited run caps. Once they're gone, they're gone.",
    externalUrl: `${P}/limited-edition-cap`,
  },
  {
    handle: "concert-ticket",
    title: "Concert Ticket",
    price: 50,
    image: ticket.url,
    category: "Tickets",
    blurb: "General admission to a Klondike Kat live show.",
    externalUrl: `${P}/concert-ticket`,
  },
  {
    handle: "festival-pass",
    title: "Festival Pass",
    price: 75,
    image: festival.url,
    category: "Tickets",
    blurb: "Full festival access pass.",
    externalUrl: `${P}/festival-pass`,
  },
  {
    handle: "beats-for-days",
    title: "Beats for Days",
    price: 250,
    image: beats.url,
    category: "Production",
    blurb: "Beat pack produced by Klondike Kat.",
    externalUrl: `${P}/beats-for-days`,
  },
];

export const productCategories = [
  "All",
  
  "Albums",
  "Merch",
  "Tickets",
  "Production",
] as const;

export type Release = {
  title: string;
  year?: string;
  kind: "Album" | "EP" | "Single";
  image: string;
  note: string;
  shopHandle: string;
  cdPrice: number;
};

export const releases: Release[] = [
  {
    title: "Exclusive Diamond Dre Album",
    kind: "Album",
    image: albumDiamondDre.url,
    note: `The current project. ${diamondDre.tracks.length} exclusive singles available individually or as the full album.`,
    shopHandle: diamondDre.handle,
    cdPrice: 23.99,
  },
  {
    title: "The Lyrical Lion",
    year: "1993",
    kind: "EP",
    image: coverTheLyricalLion.url,
    note: "The debut. Home of the classic S.P.C. click record \u201cMurder Script.\u201d",
    shopHandle: "the-lyrical-lion-cd",
    cdPrice: 19.99,
  },
  {
    title: "Mobbin' Muzik Melodies",
    year: "1997",
    kind: "Album",
    image: coverMobbinMuzikMelodies.url,
    note: "Released on Beatbox Records. Production from Icey Hott, Mo' Dangerous, Stro, Richard Johnson and Klondike Kat.",
    shopHandle: "mobbin-muzik-melodies-cd",
    cdPrice: 19.99,
  },
  {
    title: "Biography Of A Made Man",
    kind: "Album",
    image: coverBiographyOfAMadeMan.url,
    note: "Another entry in a catalog spanning three decades of Houston underground rap.",
    shopHandle: "biography-of-a-made-man-cd",
    cdPrice: 19.99,
  },
];

export const singles = [
  "Hold You Down",
  "Back On The Block",
  "Sex Ed",
  "Who Kat",
  "Slippin'",
  "Don't Cha",
  "Everything",
];

export type NewSingle = {
  title: string;
  image: string;
  credit?: string;
  audioUrl?: string;
};

export const newSingles: NewSingle[] = [
  { title: "Mob Manuscript: The Return", image: artMobManuscript.url, audioUrl: audioTheReturn.url },
  { title: "Heavyweight", image: artHeavyweight.url, audioUrl: audioHeavyweight.url },
  { title: "OG", image: artOG.url, credit: "Klondike Kat x Lil Flea", audioUrl: audioOG.url },
  { title: "Remember Me", image: artRememberMe.url, credit: "Klondike Kat x K-Rino", audioUrl: audioRememberMe.url },
  { title: "Flowrocious", image: artFlowrocious.url, credit: "feat. Joy, The MF Explorer", audioUrl: audioFlowrocious.url },
  { title: "Forever", image: artForever.url, audioUrl: audioForever.url },
  { title: "Gun Smoke", image: artGunSmoke.url, audioUrl: audioGunSmoke.url },
  { title: "Ride Like The Wind", image: artRideLikeTheWind.url },
  { title: "Takeover", image: artTakeover.url, credit: "Big Boss Kill 'Em All vs BG Capone", audioUrl: audioTheTakeover.url },
  { title: "Foolish", image: artFoolish.url, credit: "Klondike KT", audioUrl: audioFoolish.url },
  { title: "We Shall Reign", image: artWeShallReign.url, credit: "Klondike Kat feat. K-Rino", audioUrl: audioWeShallReign.url },
];

export type VideoItem = {
  title: string;
  image: string;
  description: string;
};

export const videos: VideoItem[] = [
  {
    title: "You Wrong — Main Edit",
    image: videoYouWrong.url,
    description: "The official main edit visual for \u201cYou Wrong.\u201d",
  },
];

export type ServiceItem = {
  title: string;
  from: number;
  image: string;
  description: string;
};

export const services: ServiceItem[] = [
  {
    title: "Custom Beat Production",
    from: 200,
    image: cookingUp.url,
    description:
      "An original beat built to your direction \u2014 tempo, key, reference records and all. Twangy guitars, heavy bass and forceful synths are the house sound.",
  },
  {
    title: "Mixing & Mastering",
    from: 150,
    image: studioSession.url,
    description:
      "Full mix and master on your record, handled by an engineer with a thirty-year catalog behind him.",
  },
  {
    title: "Collaboration Session",
    from: 200,
    image: collab.url,
    description:
      "Book studio time with Kat. Verses, hooks, writing, or a full session start to finish.",
  },
];

export type EventItem = {
  title: string;
  venue?: string;
  city?: string;
  detail: string;
  url: string;
};

export const events: EventItem[] = [
  {
    title: "Klondike Kat Live In Concert",
    detail:
      "Registration is open through the official event page. Dates and venue announced there.",
    url: "https://www.klondikekat.com/event-details-registration/klondike-kat-live-in-concert",
  },
];

export const bio = {
  intro:
    "Klondike Kat is a multi-talented artist from the neighborhood of South Park in Houston, TX. He's a genuine lyricist, a marvelous producer and an excellent singer. He has been in the business for over twenty years and is very well respected. He also holds membership in the legendary South Park Coalition as well as the infamous Killa Klan.",
  paragraphs: [
    "He debuted in 1993 with the album \u201cThe Lyrical Lion.\u201d Mobbin' Muzik Melodies is his sophomore effort and it was released in 1997 on Beatbox Records. Production on the album is managed by Icey Hott of Street Military, Mo' Dangerous, Stro, Richard Johnson and Klondike Kat. The beats are assembled with twangy guitars, an ample amount of bass and forceful synths. The array of tracks are soundly mixed and they carry the album especially well.",
    "Kat can deliver his rhymes with an approximate sense of ease. His style is unique and his verses flourish with broad subjects. He possesses a vivid vocabulary and leisurely displays it on every ballad. Along with that, he boldly sings most of the hooks and choruses. Guest appearances are made by members of the Killa Klan and the South Park Coalition, including Pharoah, Icey Hott, Lil' Flea, Burton Boyz, Fakkulty, K-Rino, Dope-E, Point Blank, Ganksta NIP, Ice Lord, PSK-13, A.C. Chill, Blunt, Jam, Big 20 and Felony.",
    "The album also contains two of the most notorious cuts that have ever graced a record. One is an eight minute long anthem of the superior Killa Klan known as \u201cLoc'ed Out Drop Top.\u201d The other is a nine minute long S.P.C. tribute, the next installment to the original \u201cMurder Script.\u201d",
    "All in all the record can simply be justified as a melodic classic. Klondike Kat showcases his capability as a pure artist and he certainly provides the underground with a complete masterpiece.",
    "Klondike Kat is one of the rap pioneers in H-Town and one of the rap legends in Houston. He joined the S.P.C. in 1992, but he was a well respected artist long before that. He is also a member of the Killa Klan alongside Street Military, The Fakkulty, Bam, G-Rapp and Z-Ro. Kat recently became the fourth member of the almighty Wreckless Klan and will be releasing two solo albums, \u201cThe Ultimate Underground\u201d and \u201cThe Takeover.\u201d",
  ],
  closing:
    "With a passion for music that transcends unlimited boundaries, Klondike Kat is on a mission to share his unique sounds with the world. Associated with pioneer underground hip-hop groups Street Military and the South Park Coalition, and having worked with DJ Screw, he continues to showcase his skills as a solo artist.",
};

export const affiliations = [
  "South Park Coalition",
  "Killa Klan",
  "Wreckless Klan",
  "Street Military",
  "DJ Screw",
  "Beatbox Records",
];
