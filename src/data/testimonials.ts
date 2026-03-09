// All testimonials scraped from Discord #testimonials channel (2026-03-07)
// Bolt cleaned older testimonials from the channel — these are all that remain.

export interface Testimonial {
  username: string;
  quote: string;
  date: string;
  hasImage: boolean;
  imagePath?: string;
  rank: number; // 1 = best
}

export const allTestimonials: Testimonial[] = [
  {
    username: "AlvinT11",
    quote:
      "I joined this discord about 1-2 months ago. I'm 18 years old and I had started day trading at a young age but made the most progress here. I want to give a huge shoutout to tech, bolts, and the community. I was able to buy my dream car thanks to the earnings I gained. I'm excited for more to come.",
    date: "January 2026",
    hasImage: true,
    imagePath: "/testimonial-alvin.jpg",
    rank: 1,
  },
  {
    username: "UnluckyTimmy",
    quote:
      "I randomly came across Bolt's stream and decided to watch for a little bit. I was intrigued by the methodology towards stock plays, so I told him I would give him a month to show me what the discord was about. I haven't seen more #1 movers caught or overall performances of stock plays anywhere else, which is also backed up by an amazing group of active participants through the channels. It's great to have a green day, but sharing the W is even better.",
    date: "March 2026",
    hasImage: false,
    rank: 2,
  },
  {
    username: "silenso_",
    quote:
      "My friend Ollie put me on to this server and I was skeptical at first, seeing how half the trading stuff on the internet is just somebody who copies strategies and wants to make a quick buck off their customers — not here. I've easily made 3x my investment to join and it's just wins from here.",
    date: "March 2026",
    hasImage: false,
    rank: 3,
  },
  {
    username: "unfrigid",
    quote:
      "Best server ever! Consistent profits, and from my experience nearly 80% win rate for official alerts! Good community too with some experienced traders on our hands.",
    date: "March 2026",
    hasImage: false,
    rank: 4,
  },
  {
    username: "GARRY CLAN LEADER",
    quote:
      "This is the first course / something I've paid for from someone where I'm actually happy with the product. Thank you for creating a real system!",
    date: "January 2026",
    hasImage: false,
    rank: 5,
  },
  {
    username: "HutchDaddy79",
    quote:
      "Shout out to Bolt and Oli for giving us a great affordable server to engage and learn and grow on this journey together! Much appreciated guys, and thank you all mods as well!",
    date: "March 2026",
    hasImage: false,
    rank: 6,
  },
  {
    username: "armyvet8693",
    quote: "God moves water and Bolt moves candles.",
    date: "March 2026",
    hasImage: false,
    rank: 7,
  },
  {
    username: "Mortarandpesto",
    quote: "",
    date: "January 2026",
    hasImage: true,
    imagePath: "/testimonial-mortarandpesto.png",
    rank: 8,
  },
];

// Top 5 for display on the landing page
export const topTestimonials = allTestimonials
  .filter((t) => t.quote.length > 0)
  .slice(0, 5);
