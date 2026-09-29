"use client";

import { useState } from "react";
import {
  CalendarCheck,
  Plus,
  Clock,
  Check,
  Sparkles,
  MessageSquare,
  X,
  ListTodo,
  AlertCircle,
  BookOpen,
  Calendar,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  estimatedMinutes: number;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "done";
  aiSuggestion?: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Calculus Problem Set #5: Multivariable Optimization",
    subject: "Advanced Mathematics",
    dueDate: "Tomorrow, 5:00 PM",
    estimatedMinutes: 60,
    priority: "high",
    status: "in-progress",
    aiSuggestion: "Focus on Lagrange multipliers first. Review partial derivative chain rules before problem 4.",
  },
  {
    id: 2,
    title: "Research Paper: Geopolitical Shifts in Renewable Energy",
    subject: "Environmental Economics",
    dueDate: "Friday, 11:59 PM",
    estimatedMinutes: 120,
    priority: "high",
    status: "pending",
    aiSuggestion: "Outline thesis statement around critical mineral supply chains before drafting the main body.",
  },
  {
    id: 3,
    title: "Laboratory Report: Acid-Base Buffer Titration",
    subject: "Inorganic Chemistry",
    dueDate: "Next Monday",
    estimatedMinutes: 45,
    priority: "medium",
    status: "pending",
    aiSuggestion: "Include Henderson-Hasselbalch calculation curves in figure 2.",
  },
  {
    id: 4,
    title: "Modern History: Chapter 14 Cold War Treaties Reading",
    subject: "World History",
    dueDate: "Completed",
    estimatedMinutes: 30,
    priority: "low",
    status: "done",
    aiSuggestion: "Key takeaway: Non-Proliferation Treaty of 1968 created tripartite inspection frameworks.",
  },
];

export default function HomeworkPlannerView() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low">("medium");
  const [newDue, setNewDue] = useState("");

  const toggleStatus = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "done" ? "pending" : "done",
            }
          : task
      )
    );
    toast.success("Task status updated!");
  };

  const handleAddTask = () => {
    if (!newTitle.trim()) return;

    const task: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      subject: newSubject.trim() || "General Study",
      dueDate: newDue.trim() || "Upcoming",
      estimatedMinutes: 45,
      priority: newPriority,
      status: "pending",
      aiSuggestion: `Break down ${newTitle.trim()} into 20-minute focused study sprints with active recall testing.`,
    };

    setTasks((prev) => [task, ...prev]);
    setNewTitle("");
    setNewSubject("");
    setNewDue("");
    setShowAddModal(false);
    toast.success("Assignment added to schedule!");
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status !== "done";
    if (filter === "done") return t.status === "done";
    return true;
  });

  const completedCount = tasks.filter((t) => t.status === "done").length;

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-white dark:bg-zinc-950 text-slate-900 dark:text-zinc-100">
      {/* SUB-HEADER */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 px-4 sm:px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/10 text-[#FF6B00]">
            <CalendarCheck className="h-4 w-4" strokeWidth={2.2} />
          </div>
          <div>
            <div className="flex items-center gap-2 text-[14px] font-semibold text-slate-900 dark:text-zinc-100">
              <span>Homework & Task Planner</span>
              <span className="rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#FF6B00]">
                {completedCount}/{tasks.length} Completed
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-zinc-400">
              AI-optimized study timetable, assignment roadmaps & strategy tips
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#FF6B00] px-3.5 py-1.5 text-[12px] font-semibold text-white hover:bg-[#E66000] transition-colors shadow-xs"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Assignment</span>
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 [scrollbar-width:thin]">
        <div className="mx-auto w-full max-w-[840px] space-y-5">
          {/* STATS TILES */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1 shadow-xs">
              <div className="text-[10.5px] uppercase font-bold text-slate-400 dark:text-zinc-500 tracking-wider">
                Active Tasks
              </div>
              <div className="text-2xl font-bold text-slate-900 dark:text-zinc-100">
                {tasks.filter((t) => t.status !== "done").length}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1 shadow-xs">
              <div className="text-[10.5px] uppercase font-bold text-[#FF6B00] tracking-wider">
                High Priority
              </div>
              <div className="text-2xl font-bold text-[#FF6B00]">
                {tasks.filter((t) => t.priority === "high" && t.status !== "done").length}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 space-y-1 shadow-xs">
              <div className="text-[10.5px] uppercase font-bold text-emerald-500 tracking-wider">
                Completed
              </div>
              <div className="text-2xl font-bold text-emerald-500">
                {completedCount}
              </div>
            </div>
          </div>

          {/* FILTER TABS */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-zinc-900 p-1 rounded-xl border border-slate-200 dark:border-zinc-800">
              {(["all", "pending", "done"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1 rounded-lg text-[11.5px] font-semibold capitalize transition-all ${
                    filter === tab
                      ? "bg-white dark:bg-zinc-800 text-slate-900 dark:text-zinc-100 shadow-xs"
                      : "text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-zinc-200"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* TASKS LIST SKELETON */}
          <div className="space-y-3">
            {filteredTasks.map((task) => {
              const isDone = task.status === "done";
              return (
                <div
                  key={task.id}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                    isDone
                      ? "bg-slate-50/60 dark:bg-zinc-900/40 border-slate-200/60 dark:border-zinc-800/60 opacity-70"
                      : "bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 shadow-xs"
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* CHECKBOX */}
                    <button
                      type="button"
                      onClick={() => toggleStatus(task.id)}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-lg border transition-all ${
                        isDone
                          ? "bg-emerald-500 border-emerald-500 text-white"
                          : "border-slate-300 dark:border-zinc-700 hover:border-[#FF6B00]"
                      }`}
                    >
                      {isDone && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                    </button>

                    {/* CONTENT */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-[#FF6B00]">
                            {task.subject}
                          </span>
                          <span className="text-slate-300 dark:text-zinc-700">•</span>
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${
                              task.priority === "high"
                                ? "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                                : task.priority === "medium"
                                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            }`}
                          >
                            {task.priority} Priority
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                          <Clock className="h-3 w-3" />
                          <span>{task.dueDate}</span>
                        </div>
                      </div>

                      <div
                        className={`text-[14px] font-semibold ${
                          isDone
                            ? "line-through text-slate-400 dark:text-zinc-500"
                            : "text-slate-900 dark:text-zinc-100"
                        }`}
                      >
                        {task.title}
                      </div>

                      {/* AI STRATEGY SUGGESTION SKELETON */}
                      {task.aiSuggestion && (
                        <div className="flex items-start gap-2 rounded-xl bg-orange-500/5 dark:bg-orange-500/10 p-2.5 text-[12px] text-slate-700 dark:text-zinc-300 border border-orange-500/15">
                          <Sparkles className="h-3.5 w-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                          <span>{task.aiSuggestion}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ADD ASSIGNMENT MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
              <div className="text-[15px] font-bold text-slate-900 dark:text-zinc-100">
                Add New Homework Assignment
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                  Assignment Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Physics Chapter 8 Practice Questions"
                  className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 outline-none focus:border-[#FF6B00] mt-1"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                  Subject / Course
                </label>
                <input
                  type="text"
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. Organic Chemistry"
                  className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 outline-none focus:border-[#FF6B00] mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                    Due Date
                  </label>
                  <input
                    type="text"
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                    placeholder="e.g. Tomorrow 5 PM"
                    className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 outline-none focus:border-[#FF6B00] mt-1"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-500 dark:text-zinc-400">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-800 px-3 py-2 text-[13px] text-slate-900 dark:text-zinc-100 outline-none focus:border-[#FF6B00] mt-1"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="rounded-xl px-4 py-2 text-[12.5px] font-medium text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddTask}
                disabled={!newTitle.trim()}
                className="rounded-xl bg-[#FF6B00] px-4 py-2 text-[12.5px] font-semibold text-white hover:bg-[#E66000] disabled:opacity-40"
              >
                Save Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}