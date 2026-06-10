/**
 * Pandey Corporation — Global Tech News Aggregator
 * Sources: Official company blogs + top tech journalism + Google News RSS
 * Zero API keys needed — all public RSS feeds
 * Runs every 30 minutes
 */

const Parser = require("rss-parser");
const axios  = require("axios");
const cron   = require("node-cron");
const fs     = require("fs");
const path   = require("path");

// ─── Colors ───────────────────────────────────────────────────────────────────
const C = {
  reset:   "\x1b[0m",   bold:    "\x1b[1m",
  gold:    "\x1b[33m",  green:   "\x1b[32m",
  red:     "\x1b[31m",  cyan:    "\x1b[36m",
  dim:     "\x1b[2m",   magenta: "\x1b[35m",
  white:   "\x1b[37m",  blue:    "\x1b[34m",
};
const divider = (char = "─") => console.log(`${C.dim}${char.repeat(72)}${C.reset}`);

// ─── RSS Parser setup ─────────────────────────────────────────────────────────
const parser = new Parser({
  timeout: 12000,
  headers: {
    "User-Agent": "Mozilla/5.0 (compatible; TechNewsBot/1.0; +https://pandeycorp.com)",
    "Accept": "application/rss+xml, application/xml, text/xml, */*",
  },
});

// ─── OUTPUT FILE ──────────────────────────────────────────────────────────────
const OUTPUT = path.join(__dirname, "news_feed.json");

// ═══════════════════════════════════════════════════════════════════════════════
//  SOURCES — grouped by category
//  All are public RSS feeds. Zero accounts, zero API keys.
// ═══════════════════════════════════════════════════════════════════════════════

const SOURCES = {

  // ── 1. AI COMPANY OFFICIAL BLOGS ────────────────────────────────────────────
  //    Primary source: you hear it when the company announces it
  "AI Companies": [
    { name: "OpenAI Blog",        url: "https://openai.com/blog/rss.xml" },
    { name: "Anthropic News",     url: "https://www.anthropic.com/news/rss.xml" },
    { name: "Google DeepMind",    url: "https://deepmind.google/blog/rss.xml" },
    { name: "Google AI Blog",     url: "https://blog.google/technology/ai/rss/" },
    { name: "Meta AI Blog",       url: "https://ai.meta.com/blog/rss/" },
    { name: "Mistral AI",         url: "https://mistral.ai/news/rss.xml" },
    { name: "Hugging Face Blog",  url: "https://huggingface.co/blog/feed.xml" },
    { name: "Stability AI",       url: "https://stability.ai/news/rss.xml" },
    { name: "Cohere Blog",        url: "https://cohere.com/blog/rss.xml" },
  ],

  // ── 2. BIG TECH OFFICIAL NEWSROOMS ──────────────────────────────────────────
  //    Direct from the company — product launches, announcements, updates
  "Big Tech Newsrooms": [
    { name: "Apple Newsroom",     url: "https://www.apple.com/newsroom/rss-feed.rss" },
    { name: "Microsoft Blog",     url: "https://blogs.microsoft.com/feed/" },
    { name: "Google Blog",        url: "https://blog.google/rss/" },
    { name: "NVIDIA Blog",        url: "https://blogs.nvidia.com/feed/" },
    { name: "AWS (Amazon)",       url: "https://aws.amazon.com/blogs/aws/feed/" },
    { name: "GitHub Blog",        url: "https://github.blog/feed/" },
    { name: "Meta Newsroom",      url: "https://about.fb.com/news/feed/" },
    { name: "IBM Research",       url: "https://research.ibm.com/blog/rss" },
    { name: "Intel Newsroom",     url: "https://www.intel.com/content/www/us/en/newsroom/resources/newsroom-rss.html" },
    { name: "Samsung Newsroom",   url: "https://news.samsung.com/global/rss" },
  ],

  // ── 3. STARTUP & VENTURE CAPITAL ────────────────────────────────────────────
  //    Where you learn about new companies, funding rounds, next big things
  "Startups & VC": [
    { name: "Y Combinator Blog",  url: "https://www.ycombinator.com/blog/rss" },
    { name: "a16z Blog",          url: "https://a16z.com/feed/" },
    { name: "Sequoia Blog",       url: "https://www.sequoiacap.com/feed/" },
    { name: "First Round Review", url: "https://review.firstround.com/feed.xml" },
    { name: "Product Hunt",       url: "https://www.producthunt.com/feed" },
    { name: "Crunchbase News",    url: "https://news.crunchbase.com/feed/" },
    { name: "Andreessen Blog",    url: "https://pmarca.substack.com/feed" },
  ],

  // ── 4. TOP TECH JOURNALISM ──────────────────────────────────────────────────
  //    The most respected tech publications in the world
  "Tech Journalism": [
    { name: "TechCrunch",         url: "https://techcrunch.com/feed/" },
    { name: "The Verge",          url: "https://www.theverge.com/rss/index.xml" },
    { name: "Wired",              url: "https://www.wired.com/feed/rss" },
    { name: "Ars Technica",       url: "https://feeds.arstechnica.com/arstechnica/index" },
    { name: "MIT Tech Review",    url: "https://www.technologyreview.com/feed/" },
    { name: "VentureBeat",        url: "https://venturebeat.com/feed/" },
    { name: "Engadget",           url: "https://www.engadget.com/rss.xml" },
    { name: "9to5Mac",            url: "https://9to5mac.com/feed/" },
    { name: "9to5Google",         url: "https://9to5google.com/feed/" },
    { name: "Android Authority",  url: "https://www.androidauthority.com/feed/" },
    { name: "Tom's Hardware",     url: "https://www.tomshardware.com/feeds/all" },
    { name: "ZDNet",              url: "https://www.zdnet.com/news/rss.xml" },
    { name: "SiliconANGLE",       url: "https://siliconangle.com/feed/" },
  ],

  // ── 5. GOOGLE NEWS RSS — Keyword searches ───────────────────────────────────
  //    Google aggregates every major publication — search by topic, get latest
  "Google News": [
    { name: "GNews: AI Launch",       url: "https://news.google.com/rss/search?q=AI+model+launch+announced&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: Startup Funding", url: "https://news.google.com/rss/search?q=startup+raises+funding+million&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: Tech Product",    url: "https://news.google.com/rss/search?q=new+tech+product+release+2025&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: AI Breakthrough", url: "https://news.google.com/rss/search?q=artificial+intelligence+breakthrough&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: Chip/Hardware",   url: "https://news.google.com/rss/search?q=new+chip+processor+GPU+launch&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: Tech Acquisition",url: "https://news.google.com/rss/search?q=tech+company+acquisition+billion&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: EV Launch",       url: "https://news.google.com/rss/search?q=electric+vehicle+launch+2025&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: Space Tech",      url: "https://news.google.com/rss/search?q=SpaceX+NASA+space+technology+launch&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: Open Source",     url: "https://news.google.com/rss/search?q=open+source+model+released&hl=en-US&gl=US&ceid=US:en" },
    { name: "GNews: Robotics",        url: "https://news.google.com/rss/search?q=robot+humanoid+robotics+unveiled&hl=en-US&gl=US&ceid=US:en" },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════════
//  RELEVANCE SCORING
// ═══════════════════════════════════════════════════════════════════════════════

const KEYWORDS = {
  high: [                             // +3 each
    "launch", "launches", "launched", "release", "released", "releases",
    "announces", "announced", "unveils", "unveiled", "introduces", "debuts",
    "raises", "funding", "series a", "series b", "series c", "raised",
    "breakthrough", "invention", "revolutionary", "first ever", "world first",
    "gpt", "gemini", "claude", "llama", "mistral", "new model", "llm",
    "artificial intelligence", "machine learning", "deep learning", "generative ai",
    "quantum", "chip", "semiconductor", "gpu", "processor", "neural",
    "robot", "robotics", "autonomous", "self-driving", "humanoid",
    "unicorn", "valuation", "acquisition", "acquires", "merger", "ipo",
    "open source", "open-source",
  ],
  medium: [                           // +2 each
    "ai", "ml", "api", "saas", "cloud", "software", "hardware", "device",
    "startup", "venture", "invest", "billion", "million", "funding",
    "update", "version", "upgrade", "beta", "preview",
    "electric", "battery", "space", "satellite", "rocket",
    "cybersecurity", "data", "privacy", "encryption",
    "metaverse", "vr", "ar", "headset", "wearable",
    "app", "platform", "framework", "developer",
  ],
  low: [                              // +1 each
    "technology", "tech", "digital", "internet", "mobile", "smartphone",
    "company", "ceo", "founder", "product", "feature", "tool",
    "market", "revenue", "growth", "innovation",
  ],
};

function scoreTechRelevance(title, description) {
  const text = `${title} ${description || ""}`.toLowerCase();
  let score = 0;
  KEYWORDS.high.forEach(kw   => { if (text.includes(kw)) score += 3; });
  KEYWORDS.medium.forEach(kw => { if (text.includes(kw)) score += 2; });
  KEYWORDS.low.forEach(kw    => { if (text.includes(kw)) score += 1; });
  return Math.min(score, 20);
}

function tagArticle(title, description) {
  const t = `${title} ${description || ""}`.toLowerCase();
  const tags = [];
  if (/\b(ai|artificial intelligence|llm|gpt|gemini|claude|llama|deep.?learning|machine.?learning|generative)\b/.test(t)) tags.push("🤖 AI");
  if (/\b(startup|unicorn|series [abc]|funding|raised|venture|vc|ipo)\b/.test(t)) tags.push("🚀 Startup");
  if (/\b(launch|launched|unveiled|debut|release|introduces|announces)\b/.test(t)) tags.push("📦 Launch");
  if (/\b(robot|robotics|humanoid|autonomous|self.?driv)\b/.test(t)) tags.push("🦾 Robotics");
  if (/\b(chip|gpu|semiconductor|processor|nvidia|amd|intel|qualcomm)\b/.test(t)) tags.push("⚙️ Hardware");
  if (/\b(space|rocket|satellite|spacex|nasa|mars|orbit)\b/.test(t)) tags.push("🛸 Space");
  if (/\b(ev|electric.vehicle|battery|tesla|clean.energy|solar)\b/.test(t)) tags.push("⚡ CleanTech");
  if (/\b(cybersecurity|breach|hack|malware|ransomware|vulnerability)\b/.test(t)) tags.push("🔒 Security");
  if (/\b(acquisition|acquires|merger|deal|billion|buys)\b/.test(t)) tags.push("💰 M&A");
  if (/\b(open.source|github|developer|framework|sdk|api)\b/.test(t)) tags.push("💻 Dev");
  return tags.length ? tags : ["📰 Tech"];
}

function getFreshness(pubDate) {
  if (!pubDate) return { label: "unknown", score: 0 };
  const ageMin = (Date.now() - new Date(pubDate).getTime()) / 60000;
  if (ageMin < 30)   return { label: "🔴 LIVE",      score: 10 };
  if (ageMin < 60)   return { label: "🟠 1h ago",    score: 8  };
  if (ageMin < 180)  return { label: "🟡 3h ago",    score: 6  };
  if (ageMin < 360)  return { label: "⚪ 6h ago",    score: 4  };
  if (ageMin < 720)  return { label: "⚫ 12h ago",   score: 2  };
  return               { label: "⚫ 24h+ ago",       score: 1  };
}

// ═══════════════════════════════════════════════════════════════════════════════
//  FETCH ONE RSS FEED
// ═══════════════════════════════════════════════════════════════════════════════

async function fetchFeed(source, category) {
  try {
    const feed = await parser.parseURL(source.url);
    const articles = [];

    for (const item of (feed.items || []).slice(0, 12)) {
      if (!item.title || item.title.length < 10) continue;

      const title       = item.title.trim();
      const description = (item.contentSnippet || item.summary || "").replace(/<[^>]*>/g, "").slice(0, 200).trim();
      const pubDate     = item.isoDate || item.pubDate || null;
      const url         = item.link || item.guid || "";

      const relevance   = scoreTechRelevance(title, description);
      const freshness   = getFreshness(pubDate);
      const totalScore  = relevance + freshness.score;
      const tags        = tagArticle(title, description);

      articles.push({
        title,
        source:       source.name,
        category,
        url,
        description,
        published_at: pubDate || new Date().toISOString(),
        freshness:    freshness.label,
        scores: {
          relevance,
          freshness: freshness.score,
          total:     totalScore,
        },
        tags,
        fits: relevance >= 5 && totalScore >= 10,
      });
    }
    return articles;
  } catch (err) {
    // Silently skip broken feeds — don't pollute the console
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  DEDUPLICATE
// ═══════════════════════════════════════════════════════════════════════════════

function deduplicate(articles) {
  const seen = new Set();
  return articles.filter(a => {
    const key = a.title.toLowerCase().replace(/\s+/g, " ").slice(0, 65);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
//  MAIN RUN
// ═══════════════════════════════════════════════════════════════════════════════

let runCount = 0;

async function runAggregator() {
  runCount++;
  const now     = new Date();
  const nextRun = new Date(now.getTime() + 30 * 60 * 1000);

  console.clear();
  console.log("");
  divider("═");
  console.log(`${C.gold}${C.bold}   PANDEY CORPORATION — GLOBAL TECH INTELLIGENCE FEED${C.reset}`);
  console.log(`${C.dim}   Run #${runCount}   |   ${now.toLocaleString("en-US", { weekday:"long", hour:"2-digit", minute:"2-digit" })}   |   Next update: ${nextRun.toLocaleTimeString()}${C.reset}`);
  divider("═");

  // ── Build flat list of all feeds ──
  const allFeeds = [];
  for (const [category, sources] of Object.entries(SOURCES)) {
    sources.forEach(src => allFeeds.push({ ...src, category }));
  }

  console.log(`\n${C.cyan}   Fetching from ${allFeeds.length} sources across ${Object.keys(SOURCES).length} categories...${C.reset}\n`);

  // ── Fetch all in parallel ──
  const results = await Promise.all(allFeeds.map(f => fetchFeed(f, f.category)));
  const raw     = results.flat();
  const all     = deduplicate(raw).sort((a, b) => b.scores.total - a.scores.total);
  const fits    = all.filter(a => a.fits);

  // ── Category summary ──
  const catStats = {};
  all.forEach(a => {
    catStats[a.category] = catStats[a.category] || { total: 0, fits: 0 };
    catStats[a.category].total++;
    if (a.fits) catStats[a.category].fits++;
  });

  console.log(`${C.bold}   SOURCE SUMMARY${C.reset}`);
  divider();
  Object.entries(catStats).forEach(([cat, s]) => {
    const bar = "▪".repeat(Math.min(s.fits, 25));
    console.log(`   ${C.gold}${cat.padEnd(24)}${C.reset}  ${C.green}${String(s.fits).padStart(3)} relevant${C.reset}  ${C.dim}/ ${s.total} total${C.reset}  ${C.cyan}${bar}${C.reset}`);
  });

  divider();
  console.log(`   ${C.bold}Total articles:${C.reset}  ${raw.length} fetched  →  ${all.length} unique  →  ${C.green}${C.bold}${fits.length} highly relevant${C.reset}`);

  // ── Tag breakdown ──
  const tagCount = {};
  fits.forEach(a => a.tags.forEach(t => { tagCount[t] = (tagCount[t] || 0) + 1; }));
  const topTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]).slice(0, 8);

  if (topTags.length) {
    console.log(`\n${C.bold}   WHAT'S TRENDING NOW${C.reset}`);
    divider();
    const row = topTags.map(([tag, n]) => `${tag} ${C.gold}(${n})${C.reset}`).join("   ");
    console.log(`   ${row}`);
  }

  // ── Top articles by section ──
  const sections = ["🤖 AI", "🚀 Startup", "📦 Launch", "⚙️ Hardware", "🦾 Robotics", "🛸 Space", "⚡ CleanTech", "💰 M&A"];

  for (const tag of sections) {
    const tagged = fits.filter(a => a.tags.includes(tag)).slice(0, 4);
    if (!tagged.length) continue;

    console.log(`\n${C.bold}${C.magenta}   ${tag}${C.reset}`);
    divider();
    tagged.forEach((a, i) => {
      console.log(`   ${C.bold}${i + 1}.${C.reset} ${C.white}${a.title.slice(0, 75)}${C.reset}`);
      console.log(`      ${C.dim}${a.source.padEnd(26)}${C.reset}  ${a.freshness}  ${C.dim}Score: ${a.scores.total}/30${C.reset}`);
      if (a.description) {
        console.log(`      ${C.dim}${a.description.slice(0, 110)}${C.reset}`);
      }
      console.log(`      ${C.blue}${a.url.slice(0, 80)}${C.reset}`);
      console.log("");
    });
  }

  // Anything relevant not caught by the above tags
  const others = fits
    .filter(a => !sections.some(tag => a.tags.includes(tag)))
    .slice(0, 5);

  if (others.length) {
    console.log(`\n${C.bold}${C.magenta}   📰 Other Tech${C.reset}`);
    divider();
    others.forEach((a, i) => {
      console.log(`   ${i + 1}. ${C.white}${a.title.slice(0, 75)}${C.reset}`);
      console.log(`      ${C.dim}${a.source}   ${a.freshness}${C.reset}`);
      console.log(`      ${C.blue}${a.url.slice(0, 80)}${C.reset}\n`);
    });
  }

  // ── Save JSON ──
  const output = {
    last_run:   now.toISOString(),
    next_run:   nextRun.toISOString(),
    run_number: runCount,
    stats: {
      sources:        allFeeds.length,
      fetched:        raw.length,
      unique:         all.length,
      relevant:       fits.length,
      category_stats: catStats,
      trending_tags:  tagCount,
    },
    relevant_articles: fits.slice(0, 60),
    all_articles:      all.slice(0, 120),
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));

  divider("═");
  console.log(`${C.green}   ✔ news_feed.json updated  (${fits.length} relevant articles saved)${C.reset}`);
  console.log(`${C.dim}   Next refresh at ${nextRun.toLocaleTimeString()} — keep this terminal open${C.reset}`);
  divider("═");
  console.log("");
}

// ─── START ────────────────────────────────────────────────────────────────────
console.log(`\n${C.gold}${C.bold}   Starting Tech Intelligence Feed...${C.reset}`);
console.log(`${C.dim}   Sources: ${Object.values(SOURCES).flat().length} feeds across ${Object.keys(SOURCES).length} categories${C.reset}`);
console.log(`${C.dim}   Schedule: every 30 minutes — zero API keys needed${C.reset}\n`);

runAggregator(); // run immediately

cron.schedule("*/30 * * * *", runAggregator); // then every 30 min
