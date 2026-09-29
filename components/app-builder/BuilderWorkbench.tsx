"use client";

import { useState, useEffect } from "react";
import {
  Code2,
  GitCompare,
  Eye,
  Terminal as TerminalIcon,
  RefreshCw,
  X,
  Users,
  Gamepad2,
  Music,
  CreditCard,
  FileCode,
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Search,
  Lock,
  ArrowUpRight,
  Paperclip,
  Mic,
  Sparkles,
  CheckCircle2,
  Loader2,
  Copy,
  Check,
  Monitor,
  Smartphone,
  RotateCw,
  ExternalLink,
  UploadCloud,
  CheckSquare,
  ShoppingBag,
  LayoutDashboard,
  FileText,
  Boxes,
  Zap,
  Globe,
  Server,
  Cloud,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

interface Props {
  projectName: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onExit: () => void;
}

type FileNode = {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  language?: string;
};

// Universal Smart Dynamic Badge
const ProjectBadge = ({ name }: { name: string }) => {
  const lower = (name || "").toLowerCase();

  if (
    lower.includes("todo") ||
    lower.includes("task") ||
    lower.includes("list")
  ) {
    return <CheckSquare className="w-3.5 h-3.5 text-[#FF6B00]" />;
  }
  if (
    lower.includes("shop") ||
    lower.includes("store") ||
    lower.includes("cart") ||
    lower.includes("ecom")
  ) {
    return <ShoppingBag className="w-3.5 h-3.5 text-[#FF6B00]" />;
  }
  if (
    lower.includes("dash") ||
    lower.includes("admin") ||
    lower.includes("stat") ||
    lower.includes("metric")
  ) {
    return <LayoutDashboard className="w-3.5 h-3.5 text-[#FF6B00]" />;
  }
  if (
    lower.includes("blog") ||
    lower.includes("post") ||
    lower.includes("doc") ||
    lower.includes("news")
  ) {
    return <FileText className="w-3.5 h-3.5 text-[#FF6B00]" />;
  }
  if (
    lower.includes("ai") ||
    lower.includes("bot") ||
    lower.includes("chat") ||
    lower.includes("agent")
  ) {
    return <Zap className="w-3.5 h-3.5 text-[#FF6B00]" />;
  }

  const clean = (name || "").trim().replace(/[^a-zA-Z0-9\s]/g, "");
  const words = clean.split(/\s+/).filter(Boolean);
  const initials =
    words.length >= 2
      ? (words[0][0] + words[1][0]).toUpperCase()
      : clean.slice(0, 2).toUpperCase() || "RV";

  return (
    <span className="text-[10px] font-black tracking-tight text-[#FF6B00] select-none font-mono">
      {initials}
    </span>
  );
};

const fileContents: Record<string, string> = {
  "App.tsx": `import { useState } from "react";
import { TodoList } from "./components/TodoList";
import { AddTodo } from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text: string) => {
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <main className="min-h-screen bg-white p-8 font-sans">
      <div className="text-3xl font-bold text-zinc-900 mb-6">Todo App</div>
      <AddTodo onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} />
    </main>
  );
}`,
  "TodoList.tsx": `export const TodoList = ({ todos, onToggle }) => {
  return (
    <ul className="space-y-2 mt-4 font-sans">
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => onToggle(todo.id)}
          className="p-3 border border-zinc-200 rounded-xl flex items-center gap-3 cursor-pointer hover:bg-zinc-50 transition-colors"
        >
          <input type="checkbox" checked={todo.completed} readOnly className="accent-[#FF6B00]" />
          <span className={todo.completed ? "line-through text-zinc-400" : "text-zinc-800"}>
            {todo.text}
          </span>
        </li>
      ))}
    </ul>
  );
};`,
  "AddTodo.tsx": `import { useState } from "react";

export const AddTodo = ({ onAdd }) => {
  const [val, setVal] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!val.trim()) return;
        onAdd(val);
        setVal("");
      }}
      className="flex gap-2 font-sans"
    >
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Add new task..."
        className="flex-1 px-4 py-2 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:border-[#FF6B00]"
      />
      <button className="bg-[#FF6B00] hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all">
        Add
      </button>
    </form>
  );
};`,
  "main.tsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
  "index.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: Inter, system-ui, -apple-system, sans-serif;
  color: #18181b;
  background-color: #ffffff;
}`,
  "package.json": `{
  "name": "todo-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  }
}`,
  "README.md": `# Todo App
Built automatically with Rivinity UI Builder.`,
};

const fileTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "TodoItem.tsx", type: "file", language: "tsx" },
          { name: "TodoList.tsx", type: "file", language: "tsx" },
          { name: "AddTodo.tsx", type: "file", language: "tsx" },
        ],
      },
      { name: "App.tsx", type: "file", language: "tsx" },
      { name: "main.tsx", type: "file", language: "tsx" },
      { name: "index.css", type: "file", language: "css" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [{ name: "favicon.svg", type: "file", language: "svg" }],
  },
  { name: "package.json", type: "file", language: "json" },
  { name: "vite.config.ts", type: "file", language: "ts" },
  { name: "tsconfig.json", type: "file", language: "json" },
  { name: "README.md", type: "file", language: "md" },
];

const terminalLines = [
  {
    type: "cmd",
    text: "npm create vite@latest todo-app -- --template react-ts",
  },
  { type: "out", text: "✔ Scaffolding project in ~/project/todo-app..." },
  { type: "cmd", text: "cd todo-app && npm install" },
  { type: "out", text: "added 247 packages in 4s" },
  { type: "cmd", text: "npm run dev" },
  { type: "out", text: "VITE v5.4.0  ready in 312 ms" },
  { type: "link", text: "➜  Local:   http://localhost:5173/" },
];

const buildSteps = [
  { label: "Scaffold project structure", status: "done" as const },
  { label: "Install dependencies", status: "done" as const },
  { label: "Generate components", status: "done" as const },
  { label: "Wire up state management", status: "running" as const },
  { label: "Apply styling & polish", status: "pending" as const },
];

const FileTreeNode = ({
  node,
  depth = 0,
  selected,
  onSelect,
}: {
  node: FileNode;
  depth?: number;
  selected: string;
  onSelect: (n: string) => void;
}) => {
  const [open, setOpen] = useState(true);

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-zinc-100/70 text-[12px] font-medium text-zinc-600 transition-colors bg-transparent border-0 outline-none"
          style={{ paddingLeft: 8 + depth * 12 }}
        >
          {open ? (
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          ) : (
            <ChevronRight className="w-3 h-3 text-zinc-400" />
          )}
          {open ? (
            <FolderOpen className="w-3.5 h-3.5 text-[#FF6B00]" />
          ) : (
            <Folder className="w-3.5 h-3.5 text-[#FF6B00]" />
          )}
          <span className="truncate">{node.name}</span>
        </button>
        {open &&
          node.children?.map((c) => (
            <FileTreeNode
              key={c.name}
              node={c}
              depth={depth + 1}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
      </div>
    );
  }

  const isSelected = selected === node.name;
  return (
    <button
      onClick={() => onSelect(node.name)}
      className={`w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] transition-all my-0.5 border-0 outline-none ${
        isSelected
          ? "bg-[#FF6B00]/10 text-[#FF6B00] font-semibold"
          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70 bg-transparent"
      }`}
      style={{ paddingLeft: 8 + depth * 12 + 14 }}
    >
      <FileCode
        className={`w-3.5 h-3.5 ${isSelected ? "text-[#FF6B00]" : "text-zinc-400"}`}
      />
      <span className="truncate">{node.name}</span>
    </button>
  );
};

const BuilderWorkbench = ({
  projectName,
  messages,
  onSendMessage,
  onExit,
}: Props) => {
  const [tab, setTab] = useState<"code" | "diff" | "preview">("preview");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [leftTab, setLeftTab] = useState<"files" | "search" | "locks">("files");

  const [openTabs, setOpenTabs] = useState<string[]>([
    "App.tsx",
    "TodoList.tsx",
  ]);
  const [selectedFile, setSelectedFile] = useState("App.tsx");
  const [searchQuery, setSearchQuery] = useState("");

  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [previewRefreshing, setPreviewRefreshing] = useState(false);

  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [cmdCopied, setCmdCopied] = useState(false);

  const [publishModalOpen, setPublishModalOpen] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  const [fileWidth, setFileWidth] = useState(210);
  const [terminalHeight, setTerminalHeight] = useState(170);

  useEffect(() => {
    if (tab === "preview") {
      setTerminalOpen(false);
    } else {
      setTerminalOpen(true);
    }
  }, [tab]);

  const handleSelectFile = (fileName: string) => {
    setSelectedFile(fileName);
    if (!openTabs.includes(fileName)) {
      setOpenTabs((prev) => [...prev, fileName]);
    }
  };

  const handleCloseTab = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (openTabs.length <= 1) return;
    const nextTabs = openTabs.filter((t) => t !== fileName);
    setOpenTabs(nextTabs);
    if (selectedFile === fileName) {
      setSelectedFile(nextTabs[nextTabs.length - 1]);
    }
  };

  const handleFileResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = fileWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      setFileWidth(Math.min(Math.max(startWidth + deltaX, 140), 450));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const handleTerminalResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = terminalHeight;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = startY - moveEvent.clientY;
      setTerminalHeight(Math.min(Math.max(startHeight + deltaY, 80), 450));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    document.body.style.cursor = "row-resize";
    document.body.style.userSelect = "none";
  };

  const send = () => {
    if (!input.trim()) return;
    onSendMessage(input);
    setInput("");
  };

  const currentCode =
    fileContents[selectedFile] ||
    `// Content for ${selectedFile}\nexport default function Module() {\n  return null;\n}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const triggerPreviewRefresh = () => {
    setPreviewRefreshing(true);
    setTimeout(() => setPreviewRefreshing(false), 500);
  };

  const confirmPublish = () => {
    setPublishing(true);
    setTimeout(() => {
      setPublishing(false);
      setPublishedSuccess(true);
      setTimeout(() => {
        setPublishedSuccess(false);
        setPublishModalOpen(false);
      }, 1800);
    }, 1200);
  };

  return (
    <div className="flex-1 flex h-full w-full min-h-0 min-w-0 bg-white text-zinc-800 antialiased font-sans overflow-hidden select-none relative">
      {/* Publish Modal Popup */}
      {publishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
                  <UploadCloud className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-zinc-900">
                    Publish Project
                  </div>
                  <div className="text-[11.5px] text-zinc-500">
                    Deploy your app instantly to the web
                  </div>
                </div>
              </div>
              <button
                onClick={() => setPublishModalOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors border-0 outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold text-zinc-700 uppercase tracking-wider">
                  Target Environment
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl border-2 border-[#FF6B00] bg-orange-50/30 flex flex-col gap-1 cursor-pointer">
                    <div className="flex items-center justify-between">
                      <Cloud className="w-4 h-4 text-[#FF6B00]" />
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FF6B00] text-white">
                        Recommended
                      </span>
                    </div>
                    <span className="text-xs font-bold text-zinc-900 mt-1">
                      Rivinity Cloud
                    </span>
                    <span className="text-[10.5px] text-zinc-500">
                      Instant global edge deployment
                    </span>
                  </div>

                  <div className="p-3 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 flex flex-col gap-1 cursor-pointer transition-all">
                    <Server className="w-4 h-4 text-zinc-400" />
                    <span className="text-xs font-bold text-zinc-900 mt-1">
                      Custom Export
                    </span>
                    <span className="text-[10.5px] text-zinc-500">
                      Download static build files
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11.5px] font-semibold text-zinc-700 uppercase tracking-wider">
                  Subdomain URL
                </label>
                <div className="flex items-center rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs text-zinc-600 font-mono">
                  <span>https://</span>
                  <span className="text-zinc-900 font-bold mx-0.5">
                    {projectName.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                  </span>
                  <span className="text-zinc-400">.rivinity.app</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-zinc-50 border-t border-zinc-100 flex items-center justify-end gap-2.5">
              <button
                onClick={() => setPublishModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 hover:bg-zinc-200/60 transition-colors border-0 outline-none"
              >
                Cancel
              </button>
              <button
                onClick={confirmPublish}
                disabled={publishing || publishedSuccess}
                className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#FF6B00] text-white shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border-0 outline-none"
              >
                {publishing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deploying...</span>
                  </>
                ) : publishedSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Successfully Published!</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5" />
                    <span>Publish Now</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left: Chat Thread Panel */}
      <div className="shrink-0 w-full md:w-[340px] lg:w-[370px] border-r border-zinc-200 bg-white flex flex-col z-10 overflow-hidden">
        <div className="h-full w-full flex flex-col min-h-0">
          <div className="px-4 py-3 border-b border-zinc-200 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center shrink-0">
                <ProjectBadge name={projectName} />
              </div>
              <div className="text-[13px] font-bold text-zinc-800 truncate tracking-tight">
                {projectName}
              </div>
            </div>
            <button
              onClick={onExit}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors border-0 outline-none"
              title="Back to landing"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 h-0 min-h-0 overflow-y-auto px-4 py-4 space-y-4 bg-zinc-50/50 [scrollbar-width:thin]">
            {messages.map((m) => (
              <div key={m.id} className="space-y-2.5">
                {m.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-tr-xs bg-zinc-900 text-zinc-100 text-[12.5px] leading-relaxed shadow-sm border border-zinc-800">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-[12.5px] text-zinc-700 leading-relaxed font-normal">
                      {m.content}
                    </div>

                    <div className="rounded-xl border border-zinc-200/80 bg-white shadow-xs overflow-hidden">
                      <div className="px-3.5 py-2 flex items-center justify-between border-b border-zinc-100 bg-zinc-50/60">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                          <span className="text-[11.5px] font-semibold text-zinc-800">
                            {projectName}
                          </span>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
                      </div>

                      <div className="p-3 space-y-1.5">
                        {buildSteps.map((s) => {
                          const isRunning = s.status === "running";
                          return (
                            <div
                              key={s.label}
                              className={`flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-[11.5px] transition-colors ${
                                isRunning
                                  ? "bg-[#FF6B00]/5 text-[#FF6B00] font-medium"
                                  : "text-zinc-600"
                              }`}
                            >
                              {s.status === "done" && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              )}
                              {isRunning && (
                                <Loader2 className="w-3.5 h-3.5 text-[#FF6B00] animate-spin shrink-0" />
                              )}
                              {s.status === "pending" && (
                                <div className="w-3.5 h-3.5 rounded-full border border-zinc-300 shrink-0" />
                              )}
                              <span
                                className={
                                  s.status === "pending" ? "text-zinc-400" : ""
                                }
                              >
                                {s.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      <div className="px-3.5 py-2.5 border-t border-zinc-100 bg-zinc-50/40">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                            Execution Command
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(
                                "npm create vite@latest todo-app",
                              );
                              setCmdCopied(true);
                              setTimeout(() => setCmdCopied(false), 1200);
                            }}
                            className="flex items-center gap-1 text-[10.5px] text-zinc-500 hover:text-[#FF6B00] transition-colors cursor-pointer border-0 outline-none bg-transparent"
                          >
                            {cmdCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-500" />
                                <span className="text-emerald-500 font-medium">
                                  Copied
                                </span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <code className="block text-[11px] font-mono text-zinc-800 bg-white border border-zinc-200/80 px-2.5 py-1.5 rounded-lg shadow-2xs truncate select-all">
                          npm create vite@latest todo-app
                        </code>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-zinc-200 bg-white shrink-0">
            <div className="rounded-xl border border-zinc-200 focus-within:border-[#FF6B00] focus-within:ring-2 focus-within:ring-[#FF6B00]/15 transition-all bg-white shadow-2xs relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={2}
                placeholder="Ask Rivinity to edit or build..."
                className="w-full bg-transparent text-[12.5px] text-zinc-800 placeholder:text-zinc-400 focus:outline-none px-3.5 pt-2.5 pb-1 resize-none leading-relaxed font-normal border-0"
              />
              <div className="flex items-center justify-between px-2.5 pb-2 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 transition-all cursor-pointer border-0 outline-none bg-transparent"
                  >
                    <Paperclip className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-medium text-zinc-600 bg-zinc-100 hover:bg-[#FF6B00]/10 hover:text-[#FF6B00] transition-all ml-0.5 border border-zinc-200/60 cursor-pointer">
                    <span className="w-3 h-3 rounded-full bg-[#FF6B00] flex items-center justify-center text-white shrink-0">
                      <Sparkles className="w-1.5 h-1.5" />
                    </span>
                    <span className="font-semibold text-zinc-700">
                      Rivinity
                    </span>
                    <span className="text-[9px] text-zinc-400">1.8</span>
                    <ChevronDown className="w-2.5 h-2.5 opacity-60 ml-0.5" />
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="w-7 h-7 rounded-full flex items-center justify-center text-zinc-400 hover:text-[#FF6B00] hover:bg-[#FF6B00]/10 transition-all cursor-pointer border-0 outline-none bg-transparent"
                  >
                    <Mic className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={send}
                    disabled={!input.trim()}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 border-0 outline-none ${
                      input.trim()
                        ? "bg-[#FF6B00] text-white shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                        : "bg-zinc-100 text-zinc-300 cursor-not-allowed"
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Main IDE Workspace Panel */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full p-2.5 bg-zinc-50/70 overflow-hidden">
        <div className="flex-1 rounded-xl border border-zinc-200 shadow-xs overflow-hidden flex flex-col bg-white min-h-0 h-full">
          {/* Top Workbench Toolbar */}
          <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-200 bg-white shrink-0 gap-3 overflow-x-auto [scrollbar-width:none]">
            <div className="flex items-center p-0.5 rounded-lg bg-zinc-100/60 border border-zinc-200/60 shrink-0">
              {[
                { key: "preview" as const, icon: Eye, label: "Preview" },
                { key: "code" as const, icon: Code2, label: "Code" },
                { key: "diff" as const, icon: GitCompare, label: "Diff" },
              ].map((t) => {
                const isActive = tab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setTab(t.key)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11.5px] font-medium transition-all cursor-pointer border-0 outline-none ${
                      isActive
                        ? "bg-white text-[#FF6B00] shadow-2xs font-semibold border border-zinc-200/80"
                        : "bg-transparent text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <t.icon
                      className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6B00]" : "text-zinc-400"}`}
                    />
                    {t.label}
                  </button>
                );
              })}
            </div>

            {tab === "preview" && (
              <div className="flex-1 flex items-center justify-center max-w-md mx-auto gap-2">
                <button
                  onClick={triggerPreviewRefresh}
                  className={`p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded transition-colors cursor-pointer border-0 outline-none bg-transparent ${previewRefreshing ? "animate-spin text-[#FF6B00]" : ""}`}
                  title="Reload preview"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <div className="flex-1 px-3 py-1 rounded-full bg-zinc-50 border border-zinc-200/80 text-[11px] text-zinc-600 font-mono flex items-center justify-between shadow-2xs">
                  <span className="truncate">http://localhost:5173/</span>
                  <ExternalLink className="w-3 h-3 text-zinc-400 shrink-0" />
                </div>
                <div className="flex items-center p-0.5 rounded-lg bg-zinc-100/60 border border-zinc-200/60 shrink-0">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`p-1 rounded cursor-pointer border-0 outline-none ${previewDevice === "desktop" ? "bg-white text-zinc-900 shadow-2xs" : "bg-transparent text-zinc-400 hover:text-zinc-700"}`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`p-1 rounded cursor-pointer border-0 outline-none ${previewDevice === "mobile" ? "bg-white text-zinc-900 shadow-2xs" : "bg-transparent text-zinc-400 hover:text-zinc-700"}`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-zinc-500 ml-auto shrink-0">
              <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600 transition-colors cursor-pointer outline-none">
                <RefreshCw className="w-3 h-3" /> Sync
              </button>

              <button
                onClick={() => setPublishModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-md text-[11.5px] font-semibold bg-[#FF6B00] text-white shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer border-0 outline-none"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Publish</span>
              </button>

              <div className="w-px h-3.5 bg-zinc-200 mx-0.5" />

              <button
                onClick={onExit}
                className="p-1.5 rounded-md text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer border-0 outline-none bg-transparent"
                title="Close editor"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Workbench Body */}
          <div className="flex-1 flex min-h-0 h-0 overflow-hidden">
            {tab !== "preview" && (
              <>
                <div
                  className="shrink-0 flex flex-col bg-white border-r border-zinc-200 min-h-0 h-full overflow-hidden select-none"
                  style={{ width: fileWidth }}
                >
                  <div className="flex items-center justify-around px-2 py-1.5 border-b border-zinc-100 text-[11px] font-medium shrink-0 bg-white">
                    {[
                      { key: "files" as const, label: "Files" },
                      { key: "search" as const, label: "Search" },
                      { key: "locks" as const, label: "Locks" },
                    ].map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setLeftTab(t.key)}
                        className={`px-2 py-0.5 rounded transition-colors cursor-pointer border-0 outline-none bg-transparent ${
                          leftTab === t.key
                            ? "text-[#FF6B00] font-bold"
                            : "text-zinc-400 hover:text-zinc-700"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1 h-0 min-h-0 overflow-y-auto p-1.5 bg-white [scrollbar-width:thin]">
                    {leftTab === "files" &&
                      fileTree.map((n) => (
                        <FileTreeNode
                          key={n.name}
                          node={n}
                          selected={selectedFile}
                          onSelect={handleSelectFile}
                        />
                      ))}
                    {leftTab === "search" && (
                      <div className="p-1 space-y-1.5">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 shadow-2xs focus-within:border-[#FF6B00] focus-within:bg-white transition-all">
                          <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                          <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search files..."
                            className="bg-transparent text-[11px] outline-none border-none focus:outline-none focus:ring-0 flex-1 text-zinc-700 placeholder:text-zinc-400 p-0"
                          />
                        </div>
                      </div>
                    )}
                    {leftTab === "locks" && (
                      <div className="text-[11px] text-zinc-400 text-center py-4">
                        No locked files
                      </div>
                    )}
                  </div>

                  <div className="p-2 border-t border-zinc-100 bg-white shrink-0">
                    <button
                      type="button"
                      onClick={() => setTerminalOpen((prev) => !prev)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11.5px] font-medium transition-all cursor-pointer border-0 outline-none ${
                        terminalOpen
                          ? "bg-[#FF6B00]/10 text-[#FF6B00] border border-[#FF6B00]/20 font-semibold"
                          : "bg-zinc-50 text-zinc-600 border border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <TerminalIcon
                          className={`w-3.5 h-3.5 ${terminalOpen ? "text-[#FF6B00]" : "text-zinc-500"}`}
                        />
                        <span>Terminal</span>
                      </div>
                      <span
                        className={`w-2 h-2 rounded-full ${terminalOpen ? "bg-[#FF6B00]" : "bg-zinc-300"}`}
                      />
                    </button>
                  </div>
                </div>

                <div
                  onMouseDown={handleFileResizeStart}
                  className="w-2 -mx-1 shrink-0 z-30 cursor-col-resize hover:bg-[#FF6B00]/20 active:bg-[#FF6B00]/40 transition-colors group flex items-center justify-center select-none"
                >
                  <div className="w-[1px] h-full bg-zinc-200 group-hover:bg-[#FF6B00] group-hover:w-[2px] transition-all" />
                </div>
              </>
            )}

            <div className="flex-1 flex flex-col min-w-0 min-h-0 h-full bg-white overflow-hidden">
              {tab !== "preview" && (
                <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50/50 px-2 shrink-0">
                  <div className="flex items-center overflow-x-auto [scrollbar-width:none]">
                    {openTabs.map((filename) => {
                      const isActive = selectedFile === filename;
                      return (
                        <div
                          key={filename}
                          onClick={() => setSelectedFile(filename)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-[11.5px] cursor-pointer border-r border-zinc-200 transition-all ${
                            isActive
                              ? "bg-white text-zinc-900 shadow-2xs font-semibold border-t-2 border-[#FF6B00]"
                              : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100/60"
                          }`}
                        >
                          <FileCode
                            className={`w-3.5 h-3.5 ${isActive ? "text-[#FF6B00]" : "text-zinc-400"}`}
                          />
                          {filename}
                          {openTabs.length > 1 && (
                            <X
                              onClick={(e) => handleCloseTab(filename, e)}
                              className="w-3 h-3 ml-1 text-zinc-400 hover:text-zinc-800 cursor-pointer rounded"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {tab === "code" && (
                    <button
                      onClick={handleCopyCode}
                      className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer border-0 outline-none bg-transparent"
                    >
                      {copied ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  )}
                </div>
              )}

              {/* Viewport Panels */}
              <div className="flex-1 h-0 min-h-0 overflow-y-auto overflow-x-hidden bg-white [scrollbar-width:thin]">
                {tab === "code" && (
                  <div className="flex min-w-full text-[12px] font-mono leading-6 p-2">
                    <div className="select-none text-right text-zinc-300 pr-4 pl-2 border-r border-zinc-100 sticky left-0 bg-white z-1">
                      {currentCode.split("\n").map((_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <pre className="px-4 text-zinc-800 whitespace-pre overflow-x-auto selection:bg-[#FF6B00]/20 flex-1 [scrollbar-width:thin]">
                      {currentCode}
                    </pre>
                  </div>
                )}

                {tab === "diff" && (
                  <div className="p-4 text-[12px] font-mono space-y-1">
                    <div className="px-3 py-1.5 bg-red-50 text-red-600 rounded-md border border-red-200">
                      - const todos = [];
                    </div>
                    <div className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                      + const [todos, setTodos] = useState([]);
                    </div>
                  </div>
                )}

                {tab === "preview" && (
                  <div className="h-full w-full flex flex-col bg-zinc-100/70 overflow-y-auto p-6 [scrollbar-width:thin]">
                    <div className="flex-1 flex justify-center items-center">
                      <div
                        className={`transition-all duration-300 rounded-2xl border border-zinc-200 p-6 bg-white shadow-sm my-auto ${
                          previewDevice === "mobile"
                            ? "w-[360px] min-h-[520px] border-zinc-300 shadow-md"
                            : "w-full max-w-md"
                        }`}
                      >
                        <div className="text-xl font-bold mb-4 text-zinc-900 tracking-tight">
                          Todo App
                        </div>
                        <div className="flex gap-2 mb-4">
                          <input
                            placeholder="Add a task..."
                            className="flex-1 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#FF6B00]"
                          />
                          <button className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-semibold shadow-xs hover:opacity-90 cursor-pointer border-0 outline-none">
                            Add
                          </button>
                        </div>
                        <div className="space-y-2">
                          {[
                            "Design landing page",
                            "Wire up auth",
                            "Ship MVP",
                          ].map((t, i) => (
                            <label
                              key={t}
                              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-100 text-[12.5px] text-zinc-700 cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                defaultChecked={i === 0}
                                className="accent-[#FF6B00] rounded"
                              />
                              <span
                                className={
                                  i === 0 ? "line-through text-zinc-400" : ""
                                }
                              >
                                {t}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {tab !== "preview" && terminalOpen && (
                <div
                  onMouseDown={handleTerminalResizeStart}
                  className="h-2 -my-1 shrink-0 z-30 cursor-row-resize hover:bg-[#FF6B00]/20 active:bg-[#FF6B00]/40 transition-colors group flex items-center justify-center select-none"
                >
                  <div className="w-full h-[1px] bg-zinc-200 group-hover:bg-[#FF6B00] group-hover:h-[2px] transition-all" />
                </div>
              )}

              {tab !== "preview" && terminalOpen && (
                <div
                  className="shrink-0 border-t border-zinc-200 bg-white flex flex-col min-h-0 select-none"
                  style={{ height: terminalHeight }}
                >
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-zinc-100 bg-zinc-50 shrink-0">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white text-[11px] font-semibold text-zinc-700 border border-zinc-200 shadow-2xs">
                        <TerminalIcon className="w-3 h-3 text-[#FF6B00]" />{" "}
                        Rivinity Terminal
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setTerminalOpen(false)}
                        className="p-1 text-zinc-400 hover:text-zinc-700 rounded transition-colors cursor-pointer border-0 outline-none bg-transparent"
                      >
                        <ChevronDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 h-0 min-h-0 overflow-y-auto px-4 py-2 font-mono text-[11.5px] leading-relaxed bg-zinc-950 text-zinc-200 [scrollbar-width:thin]">
                    {terminalLines.map((l, i) => (
                      <div
                        key={i}
                        className={
                          l.type === "cmd"
                            ? "text-[#FF6B00]"
                            : l.type === "link"
                              ? "text-emerald-400"
                              : "text-zinc-300"
                        }
                      >
                        {l.type === "cmd" ? (
                          <span className="text-zinc-500">~/project &gt; </span>
                        ) : null}
                        {l.text}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuilderWorkbench;
