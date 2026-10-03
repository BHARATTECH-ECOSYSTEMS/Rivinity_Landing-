import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import React, { useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { safeUrl } from "@/lib/security";
import "highlight.js/styles/github-dark.css";

function CodeBlock({ children, className }: { children: ReactNode; className?: string }) {
  const [copied, setCopied] = useState(false);
  const lang = className?.replace("language-", "") ?? "";
  const text = String(children ?? "");
  const onCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="relative group/code my-3 rounded-xl overflow-hidden border border-glass bg-[#0b1020]/90">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/5 text-[10.5px] uppercase tracking-widest text-white/50">
        <span>{lang || "code"}</span>
        <button
          onClick={onCopy}
          className="inline-flex items-center gap-1 text-white/50 hover:text-white/90 transition-colors"
          title="Copy code"
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="overflow-x-auto text-[12.5px] leading-relaxed p-3.5 m-0 [scrollbar-width:thin]">
        <code className={className}>{text}</code>
      </pre>
    </div>
  );
}

function ChatMarkdownComponent({ content }: { content: string }) {
  return (
    <div className="chat-md text-[14px] sm:text-[14.5px] leading-relaxed text-foreground/85 break-words">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        urlTransform={safeUrl}
        components={{
          h1: (p) => <div className="text-[19px] sm:text-[21px] font-semibold tracking-tight mt-5 mb-2.5 first:mt-0" {...p} />,
          h2: (p) => <div className="text-[16px] sm:text-[18px] font-semibold tracking-tight mt-5 mb-2 first:mt-0" {...p} />,
          h3: (p) => <div className="text-[14.5px] sm:text-[16px] font-semibold mt-4 mb-1.5 first:mt-0" {...p} />,
          h4: (p) => <div className="text-[13.5px] sm:text-[14.5px] font-semibold mt-3 mb-1 first:mt-0" {...p} />,
          p: (p) => <div className="my-2.5 first:mt-0 last:mb-0" {...p} />,
          strong: (p) => <strong className="font-semibold text-foreground" {...p} />,
          em: (p) => <em className="italic" {...p} />,
          a: ({ href, children }) => (
            <a
              href={safeUrl(href)}
              target="_blank"
              rel="noreferrer noopener"
              className="text-primary underline underline-offset-2 hover:text-primary/80 break-all"
            >
              {children}
            </a>
          ),
          ul: (p) => <ul className="my-2.5 pl-5 space-y-1.5 list-disc marker:text-foreground/40" {...p} />,
          ol: (p) => <ol className="my-2.5 pl-5 space-y-1.5 list-decimal marker:text-foreground/50" {...p} />,
          li: (p) => <li className="pl-1 leading-relaxed" {...p} />,
          blockquote: (p) => (
            <blockquote className="my-3 pl-3 border-l-2 border-primary/40 text-foreground/70 italic" {...p} />
          ),
          hr: () => <hr className="my-4 border-glass" />,
          table: (p) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-glass max-w-full">
              <table className="w-full text-[12.5px] sm:text-[13px] border-collapse" {...p} />
            </div>
          ),
          thead: (p) => <thead className="bg-foreground/[0.04]" {...p} />,
          th: (p) => (
            <th className="text-left font-semibold px-3 py-2 border-b border-glass text-foreground/80" {...p} />
          ),
          td: (p) => <td className="px-3 py-2 border-b border-glass/60 align-top" {...p} />,
          code: ({ className, children }) => {
            const text = String(children ?? "").replace(/\n$/, "");
            if (!className && !text.includes("\n")) {
              return (
                <code className="px-1.5 py-0.5 rounded-md bg-foreground/[0.06] border border-glass text-[12px] sm:text-[12.5px] font-mono text-foreground/90 break-all">
                  {text}
                </code>
              );
            }
            return (
              <CodeBlock className={className}>
                {text}
              </CodeBlock>
            );
          },
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

const ChatMarkdown = React.memo(ChatMarkdownComponent);
export default ChatMarkdown;
