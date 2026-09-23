import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Search,
  ChevronDown,
  Sparkles,
  Wand2,
  Languages,
  Mic2,
  Copy,
  Download,
  RefreshCw,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sliders,
  FileText,
  Lightbulb,
  Megaphone,
  Briefcase,
  Mail,
  MessageSquare,
  Hash,
  PenLine,
  Tag,
  BookOpen,
  Newspaper,
  ShoppingBag,
  HelpCircle,
  Sparkle,
  Loader2,
  Star,
} from "lucide-react";
import { toast } from "sonner";

// Drop-in Lucide-compatible SVG icons:
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><polygon points="10 15 15 12 10 9 10 15"/></svg>
);

const RivinityLoader = ({ size = 32, className = "" }: { size?: number; className?: string }) => (
  <div className={`flex items-center justify-center ${className}`}>
    <Loader2 className="animate-spin text-[#FF6B00]" style={{ width: size, height: size }} />
  </div>
);

interface UseCase {
  id: string;
  label: string;
  desc: string;
  icon: React.ComponentType<{ className?: string; [key: string]: any }>;
  tint: string;
  category: string;
}

const USE_CASES: UseCase[] = [
  { id: "blog-idea", label: "Blog Idea & Outline", desc: "Generate ideas and structured outlines", icon: Lightbulb, tint: "from-amber-400/30 to-orange-400/20", category: "Blog" },
  { id: "blog-section", label: "Blog Section Writing", desc: "Expand any section of your blog", icon: BookOpen, tint: "from-sky-400/30 to-blue-500/20", category: "Blog" },
  { id: "brand-name", label: "Brand Name", desc: "Create catchy, unique brand names", icon: Tag, tint: "from-emerald-400/30 to-green-500/20", category: "Business" },
  { id: "biz-pitch", label: "Business Idea Pitch", desc: "Pitch any startup idea in seconds", icon: Briefcase, tint: "from-violet-400/30 to-purple-500/20", category: "Business" },
  { id: "biz-ideas", label: "Business Ideas", desc: "Get fresh, validated business ideas", icon: Sparkle, tint: "from-yellow-400/30 to-amber-500/20", category: "Business" },
  { id: "cta", label: "Call To Action", desc: "Compelling CTAs that convert", icon: Megaphone, tint: "from-rose-400/30 to-pink-500/20", category: "Copy" },
  { id: "aida", label: "Copywriting: AIDA", desc: "Attention · Interest · Desire · Action", icon: PenLine, tint: "from-fuchsia-400/30 to-pink-500/20", category: "Copy" },
  { id: "pas", label: "Copywriting: PAS", desc: "Problem · Agitate · Solution", icon: PenLine, tint: "from-pink-400/30 to-rose-500/20", category: "Copy" },
  { id: "cover-letter", label: "Cover Letter", desc: "Stand-out personalized cover letters", icon: FileText, tint: "from-indigo-400/30 to-blue-500/20", category: "Career" },
  { id: "email", label: "Email Writing", desc: "Polished emails for any context", icon: Mail, tint: "from-cyan-400/30 to-sky-500/20", category: "Communication" },
  { id: "email-reply", label: "Email Reply", desc: "Quick, on-tone replies", icon: Mail, tint: "from-teal-400/30 to-cyan-500/20", category: "Communication" },
  { id: "facebook", label: "Facebook Post", desc: "Engaging FB posts that get reach", icon: FacebookIcon, tint: "from-blue-400/30 to-indigo-500/20", category: "Social" },
  { id: "twitter", label: "Twitter / X Post", desc: "Punchy tweets and threads", icon: TwitterIcon, tint: "from-sky-400/30 to-blue-500/20", category: "Social" },
  { id: "linkedin", label: "LinkedIn Post", desc: "Thought-leadership and updates", icon: LinkedinIcon, tint: "from-blue-500/30 to-indigo-600/20", category: "Social" },
  { id: "instagram", label: "Instagram Caption", desc: "Captions that stop the scroll", icon: InstagramIcon, tint: "from-pink-400/30 to-fuchsia-500/20", category: "Social" },
  { id: "youtube", label: "YouTube Description", desc: "SEO-rich video descriptions", icon: YoutubeIcon, tint: "from-red-400/30 to-rose-500/20", category: "Social" },
  { id: "product", label: "Product Description", desc: "Sell more with compelling copy", icon: ShoppingBag, tint: "from-orange-400/30 to-amber-500/20", category: "E-commerce" },
  { id: "seo-meta", label: "SEO Meta Tags", desc: "Title + description that rank", icon: Hash, tint: "from-lime-400/30 to-green-500/20", category: "SEO" },
  { id: "news", label: "News Article", desc: "Inverted-pyramid news writing", icon: Newspaper, tint: "from-slate-400/30 to-gray-500/20", category: "Editorial" },
  { id: "faq", label: "FAQ Generator", desc: "Anticipate and answer questions", icon: HelpCircle, tint: "from-purple-400/30 to-violet-500/20", category: "Support" },
  { id: "testimonial", label: "Testimonial Review", desc: "Authentic-sounding reviews", icon: Star, tint: "from-yellow-400/30 to-orange-500/20", category: "Copy" },
  { id: "story", label: "Story Plot", desc: "Imaginative story beats and plots", icon: BookOpen, tint: "from-violet-400/30 to-fuchsia-500/20", category: "Creative" },
];

const LANGUAGES = ["US English", "UK English", "Spanish", "French", "German", "Hindi", "Arabic", "Portuguese", "Japanese", "Chinese (Simplified)"];
const TONES = ["Convincing", "Casual", "Professional", "Friendly", "Witty", "Bold", "Empathetic", "Inspirational", "Formal", "Excited"];

const TOOLBAR_GROUPS = [
  [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: Strikethrough, label: "Strikethrough" },
  ],
  [
    { icon: Heading1, label: "H1" },
    { icon: Heading2, label: "H2" },
    { icon: Heading3, label: "H3" },
  ],
  [
    { icon: List, label: "Bullet list" },
    { icon: ListOrdered, label: "Numbered list" },
  ],
  [
    { icon: LinkIcon, label: "Link" },
    { icon: ImageIcon, label: "Image" },
    { icon: Quote, label: "Quote" },
  ],
  [
    { icon: AlignLeft, label: "Align left" },
    { icon: AlignCenter, label: "Align center" },
    { icon: AlignRight, label: "Align right" },
  ],
  [
    { icon: Undo2, label: "Undo" },
    { icon: Redo2, label: "Redo" },
  ],
];

const WriteAnythingStudio = () => {
  const [query, setQuery] = useState("");
  const [activeCase, setActiveCase] = useState<UseCase | null>(USE_CASES[6]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [language, setLanguage] = useState(LANGUAGES[0]);
  const [tone, setTone] = useState(TONES[0]);
  const [variants, setVariants] = useState(2);
  const [creativity, setCreativity] = useState(60);
  const [primaryInput, setPrimaryInput] = useState("");
  const [generating, setGenerating] = useState(false);
  const [output, setOutput] = useState("");

  const allCategories = useMemo(
    () => ["All", ...Array.from(new Set(USE_CASES.map((c) => c.category)))],
    []
  );

  const filteredCases = useMemo(() => {
    const q = query.trim().toLowerCase();
    return USE_CASES.filter((c) => {
      const matchesCat = activeCategory === "All" || c.category === activeCategory;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        c.label.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  const listRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.15, ease: "power1.out" }
    );
  }, [activeCategory, query]);

  const handleGenerate = () => {
    if (!activeCase) {
      toast.error("Pick a use case first");
      return;
    }
    if (!primaryInput.trim()) {
      toast.error("Tell Rivinity what to write about");
      return;
    }
    setGenerating(true);
    setOutput("");
    setTimeout(() => {
      const sample = `# ${activeCase.label}\n\n**Topic:** ${primaryInput}\n**Tone:** ${tone} · **Language:** ${language}\n\nAttention — Imagine unlocking ${primaryInput} without the usual headache.\n\nInterest — Rivinity blends ${tone.toLowerCase()} narrative craft with data-driven hooks, so every line earns its keep.\n\nDesire — Picture the conversions, the saved hours, the audience that finally feels seen. That is what a well-written ${activeCase.label.toLowerCase()} unlocks.\n\nAction — Hit generate again for more variants, or refine the brief above to steer the next draft.`;
      setOutput(sample);
      setGenerating(false);
    }, 1100);
  };

  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const charCount = output.length;

  return (
    <div className="flex-1 flex min-h-0 min-w-0 animate-float-in">
      {/* LEFT — controls */}
      <div className="w-[280px] lg:w-[320px] shrink-0 border-r border-glass/60 flex flex-col min-h-0">
        <div className="px-5 py-4 border-b border-glass/60 flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center shadow-glow-accent">
            <Wand2 className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <div className="text-[12.5px] font-semibold text-foreground/85 leading-none">Write Anything</div>
            <div className="text-[10.5px] text-muted-foreground/55 mt-1">Rivinity Composition Studio</div>
          </div>
        </div>

        <div className="px-5 pt-4 space-y-4 overflow-y-auto flex-1 pb-6">
          {/* Language + Tone */}
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <div className="text-[10.5px] font-medium text-muted-foreground/60 mb-1.5 flex items-center gap-1">
                <Languages className="w-3 h-3" /> Language
              </div>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full appearance-none glass border border-glass rounded-xl px-3 py-2 text-[12px] font-medium text-foreground/85 focus:outline-none focus:border-primary/40 pr-8"
                >
                  {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" />
              </div>
            </div>
            <div>
              <div className="text-[10.5px] font-medium text-muted-foreground/60 mb-1.5 flex items-center gap-1">
                <Mic2 className="w-3 h-3" /> Tone / Voice
              </div>
              <div className="relative">
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full appearance-none glass border border-glass rounded-xl px-3 py-2 text-[12px] font-medium text-foreground/85 focus:outline-none focus:border-primary/40 pr-8"
                >
                  {TONES.map((t) => <option key={t}>{t}</option>)}
                </select>
                <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Use case search */}
          <div>
            <div className="text-[10.5px] font-medium text-muted-foreground/60 mb-1.5">Choose use case</div>
            <div className="relative mb-2">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 50+ use cases..."
                className="w-full glass border border-glass rounded-xl pl-9 pr-3 py-2 text-[12px] text-foreground/85 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40"
              />
            </div>

            {/* Selected pill */}
            {activeCase && (
              <div className="mb-3 p-2.5 rounded-xl glass border border-primary/30 flex items-center gap-2.5 shadow-glow-accent/30">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${activeCase.tint} flex items-center justify-center`}>
                  <activeCase.icon className="w-4 h-4 text-foreground/75" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-semibold text-foreground/85 truncate">{activeCase.label}</div>
                  <div className="text-[10px] text-muted-foreground/55 truncate">{activeCase.desc}</div>
                </div>
              </div>
            )}

            {/* Category filter chips */}
            <div className="flex flex-wrap gap-1.5 mb-2.5">
              {allCategories.map((cat) => {
                const active = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[10.5px] font-medium transition-all duration-150 border ${
                      active
                        ? "bg-primary/15 border-primary/40 text-foreground"
                        : "glass border-glass text-muted-foreground/70 hover:text-foreground/85 hover:border-primary/25"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Use case list */}
            <div ref={listRef} className="space-y-1">
              {filteredCases.map((c) => {
                const active = activeCase?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCase(c)}
                    className={`w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-left transition-all duration-150 ${
                      active
                        ? "bg-primary/10 border border-primary/30"
                        : "border border-transparent hover:bg-accent/40 hover:border-glass"
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${c.tint} flex items-center justify-center shrink-0`}>
                      <c.icon className="w-3 h-3 text-foreground/75" />
                    </div>
                    <span className={`text-[11.5px] font-medium truncate ${active ? "text-foreground" : "text-foreground/75"}`}>
                      {c.label}
                    </span>
                  </button>
                );
              })}
              {filteredCases.length === 0 && (
                <div className="text-[11px] text-muted-foreground/45 text-center py-6">No matching use cases</div>
              )}
            </div>
          </div>

          {/* Variants + creativity */}
          <div className="space-y-3 pt-1">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[10.5px] font-medium text-muted-foreground/60 flex items-center gap-1">
                  <Sliders className="w-3 h-3" /> Variants
                </div>
                <span className="text-[10.5px] font-semibold text-foreground/75">{variants}</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((n) => (
                  <button
                    key={n}
                    onClick={() => setVariants(n)}
                    className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                      variants === n
                        ? "gradient-accent text-primary-foreground shadow-glow-accent"
                        : "glass border border-glass text-muted-foreground/65 hover:text-foreground/85"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <div className="text-[10.5px] font-medium text-muted-foreground/60 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Creativity
                </div>
                <span className="text-[10.5px] font-semibold text-foreground/75">{creativity}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={creativity}
                onChange={(e) => setCreativity(Number(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
          </div>

          {/* Primary brief */}
          <div>
            <div className="text-[10.5px] font-medium text-muted-foreground/60 mb-1.5">Brief / prompt</div>
            <textarea
              value={primaryInput}
              onChange={(e) => setPrimaryInput(e.target.value)}
              rows={4}
              placeholder={activeCase ? `Describe your ${activeCase.label.toLowerCase()}...` : "Pick a use case first..."}
              className="w-full glass border border-glass rounded-xl px-3 py-2.5 text-[12px] text-foreground/85 placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 resize-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full py-2.5 rounded-xl gradient-accent text-primary-foreground text-[12.5px] font-semibold shadow-glow-accent flex items-center justify-center gap-2 hover:opacity-95 transition-opacity disabled:opacity-60"
          >
            {generating ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating {variants} variant{variants > 1 ? "s" : ""}...</>
            ) : (
              <><Sparkles className="w-3.5 h-3.5" /> Generate</>
            )}
          </button>
        </div>
      </div>

      {/* RIGHT — editor */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        {/* Editor title bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-glass/60">
          <div className="flex items-center gap-2 min-w-0">
            <input
              defaultValue={activeCase?.label.toUpperCase() ?? "UNTITLED"}
              className="bg-transparent text-[14px] font-bold text-foreground/85 tracking-wide focus:outline-none min-w-0"
            />
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => { if (output) { navigator.clipboard.writeText(output); toast.success("Copied to clipboard"); } }}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/55 hover:text-foreground/80 hover:bg-accent/50 transition-all cursor-pointer"
              title="Copy"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/55 hover:text-foreground/80 hover:bg-accent/50 transition-all cursor-pointer"
              title="Download"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleGenerate}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground/55 hover:text-foreground/80 hover:bg-accent/50 transition-all cursor-pointer"
              title="Regenerate"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-1 px-4 py-2 border-b border-glass/60 overflow-x-auto">
          {TOOLBAR_GROUPS.map((group, gi) => (
            <div key={gi} className="flex items-center gap-0.5 pr-2 mr-1 border-r border-glass/40 last:border-r-0">
              {group.map((b) => (
                <button
                  key={b.label}
                  title={b.label}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground/55 hover:text-foreground/85 hover:bg-accent/50 transition-all cursor-pointer"
                >
                  <b.icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          ))}
          <div className="ml-auto flex items-center gap-3 text-[10.5px] text-muted-foreground/55 shrink-0 pl-2">
            <span><span className="text-foreground/70 font-semibold mr-1">{wordCount}</span>Words</span>
            <span><span className="text-foreground/70 font-semibold mr-1">{charCount}</span>Chars</span>
          </div>
        </div>

        {/* Editor canvas */}
        <div className="flex-1 overflow-y-auto p-8 min-h-0">
          {generating ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <RivinityLoader size={64} className="mb-4" />
              <div className="text-[13px] font-medium text-foreground/75">Rivinity is crafting your {activeCase?.label.toLowerCase()}...</div>
              <div className="text-[11px] text-muted-foreground/55 mt-1">Tone: {tone} · Language: {language}</div>
            </div>
          ) : output ? (
            <article className="max-w-[760px] mx-auto prose prose-sm prose-invert">
              <pre className="whitespace-pre-wrap font-sans text-[14px] leading-7 text-foreground/85 bg-transparent">{output}</pre>
            </article>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-[460px] mx-auto">
              <div className="w-14 h-14 rounded-2xl gradient-accent opacity-90 shadow-glow-accent flex items-center justify-center mb-5">
                <Wand2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="text-[18px] font-semibold text-foreground/85 mb-2">A blank canvas, infinite possibilities.</div>
              <div className="text-[12.5px] text-muted-foreground/65 leading-relaxed">
                Pick a use case on the left, describe what you need, and Rivinity will draft polished copy in your tone and language. From AIDA frameworks to LinkedIn posts — over 50 templates ready to go.
              </div>
              <div className="flex gap-2 mt-5 flex-wrap justify-center">
                {USE_CASES.slice(0, 5).map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCase(c)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-glass text-[11px] font-medium text-foreground/75 hover:border-primary/40 transition-all"
                  >
                    <c.icon className="w-3 h-3" />
                    {c.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteAnythingStudio;
