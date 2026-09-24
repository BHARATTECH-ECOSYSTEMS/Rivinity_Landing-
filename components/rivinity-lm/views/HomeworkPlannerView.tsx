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
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "done";
  aiSuggestion?: string;
}

const sampleTasks: Task[] = [
  {
    id: 1,
    title: "Calculus Problem Set #5",
    subject: "Mathematics",
    dueDate: "Tomorrow",
    priority: "high",
    status: "in-progress",
    aiSuggestion:
      "Start with problems 1-5, they build on each other. Budget 45 mins.",
  },
  {
    id: 2,
    title: "Essay: Climate Change Impact",
    subject: "English",
    dueDate: "In 3 days",
    priority: "medium",
    status: "pending",
    aiSuggestion:
      "Create an outline first. Focus on 3 key arguments.",
  },
  {
    id: 3,
    title: "Lab Report: Titration",
    subject: "Chemistry",
    dueDate: "Next week",
    priority: "low",
    status: "pending",
  },
  {
    id: 4,
    title: "History Reading Ch. 12",
    subject: "History",
    dueDate: "Today",
    priority: "high",
    status: "done",
  },
];

const priorityStyles = {
  high: "text-red-600 bg-red-50 border-red-100",
  medium: "text-amber-600 bg-amber-50 border-amber-100",
  low: "text-emerald-600 bg-emerald-50 border-emerald-100",
};

const statusStyles = {
  pending: "bg-gray-100 text-gray-500",
  "in-progress": "bg-orange-50 text-[#FF5500]",
  done: "bg-emerald-50 text-emerald-600",
};

const HomeworkPlannerView = () => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");

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

    if (selectedTask?.id === id) {
      setSelectedTask((prev) =>
        prev
          ? {
              ...prev,
              status: prev.status === "done" ? "pending" : "done",
            }
          : null
      );
    }
  };

  const addTask = () => {
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: newTitle.trim(),
      subject: newSubject.trim() || "General",
      dueDate: "Set date",
      priority: "medium",
      status: "pending",
    };

    setTasks((prev) => [...prev, newTask]);
    setNewTitle("");
    setNewSubject("");
    setShowAdd(false);
  };

  const completedCount = tasks.filter(
    (task) => task.status === "done"
  ).length;

  const pendingCount = tasks.length - completedCount;

  return (
    <div className="min-h-full bg-white text-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200/70 bg-white/85 backdrop-blur-xl">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-gray-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[15px] font-semibold text-gray-900">
                  Homework Planner
                </h1>

                <span className="px-2 py-0.5 rounded-full bg-orange-50 text-[#FF5500] text-[9px] font-semibold">
                  AI PLANNER
                </span>
              </div>

              <p className="text-[11px] text-gray-400 mt-0.5">
                Organize assignments and get AI-powered study assistance
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAdd(!showAdd)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl
              bg-[#FF5500] text-white text-[11px] font-semibold
              shadow-[0_4px_12px_rgba(255,85,0,0.15)]
              hover:bg-[#e94d00] transition-colors"
          >
            {showAdd ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            {showAdd ? "Close" : "Add Task"}
          </button>
        </div>
      </div>

      <div className="max-w-[850px] mx-auto px-5 py-7">
        {/* Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <div className="bg-white border border-gray-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                Total
              </p>
              <ListTodo className="w-3.5 h-3.5 text-gray-300" />
            </div>

            <p className="text-xl font-semibold text-gray-900">
              {tasks.length}
            </p>

            <p className="text-[9px] text-gray-400 mt-0.5">
              assignments
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                Pending
              </p>
              <Clock className="w-3.5 h-3.5 text-orange-300" />
            </div>

            <p className="text-xl font-semibold text-gray-900">
              {pendingCount}
            </p>

            <p className="text-[9px] text-gray-400 mt-0.5">
              need attention
            </p>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] uppercase tracking-wider text-gray-400 font-semibold">
                Completed
              </p>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            </div>

            <p className="text-xl font-semibold text-gray-900">
              {completedCount}
            </p>

            <p className="text-[9px] text-gray-400 mt-0.5">
              finished tasks
            </p>
          </div>
        </div>

        {/* Add Task */}
        {showAdd && (
          <div className="bg-white border border-orange-100 rounded-2xl p-5 mb-6 shadow-[0_4px_16px_rgba(255,85,0,0.06)]">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5 text-[#FF5500]" />
              </div>

              <div>
                <p className="text-[12px] font-semibold text-gray-900">
                  Add Assignment
                </p>
                <p className="text-[9px] text-gray-400">
                  Add a new task to your study plan
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="What's the assignment?"
                className="flex-1 h-10 px-3.5 rounded-xl bg-white
                  border border-gray-200 text-[11px] text-gray-800
                  placeholder:text-gray-400 outline-none
                  focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />

              <input
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                placeholder="Subject"
                className="sm:w-[160px] h-10 px-3.5 rounded-xl bg-white
                  border border-gray-200 text-[11px] text-gray-800
                  placeholder:text-gray-400 outline-none
                  focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg
                  bg-orange-50 text-[#FF5500] text-[10px] font-medium
                  hover:bg-orange-100 transition-colors"
              >
                <Sparkles className="w-3 h-3" />
                AI Plan This
              </button>

              <button
                onClick={addTask}
                className="px-4 py-2 rounded-xl bg-gray-900 text-white
                  text-[10px] font-semibold hover:bg-gray-800 transition-colors"
              >
                Save Task
              </button>
            </div>
          </div>
        )}

        {/* Tasks */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-[12px] font-semibold text-gray-800">
                Your Assignments
              </h2>
              <p className="text-[9px] text-gray-400 mt-0.5">
                Keep track of everything you need to complete
              </p>
            </div>

            <span className="text-[9px] text-gray-400">
              {tasks.length} tasks
            </span>
          </div>

          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white border rounded-xl p-4 transition-all ${
                  task.status === "done"
                    ? "border-gray-200 opacity-60"
                    : "border-gray-200/80 hover:border-orange-200 hover:shadow-[0_3px_12px_rgba(0,0,0,0.035)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox */}
                  <button
                    onClick={() => toggleStatus(task.id)}
                    className={`w-5 h-5 mt-0.5 rounded-md border-2
                      flex items-center justify-center shrink-0 transition-all ${
                        task.status === "done"
                          ? "bg-[#FF5500] border-[#FF5500]"
                          : "border-gray-200 hover:border-[#FF5500]"
                      }`}
                  >
                    {task.status === "done" && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <p
                        className={`text-[12px] font-medium ${
                          task.status === "done"
                            ? "line-through text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {task.title}
                      </p>

                      <span
                        className={`px-2 py-0.5 rounded-full border text-[8px] font-semibold uppercase ${priorityStyles[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] text-gray-400">
                        {task.subject}
                      </span>

                      <span className="text-gray-200">·</span>

                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Clock className="w-3 h-3" />
                        {task.dueDate}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[8px] font-medium ${statusStyles[task.status]}`}
                      >
                        {task.status}
                      </span>
                    </div>

                    {/* AI Suggestion */}
                    {task.aiSuggestion && task.status !== "done" && (
                      <div className="mt-3 flex items-start gap-2 bg-orange-50/50 border border-orange-100 rounded-lg p-2.5">
                        <Sparkles className="w-3 h-3 text-[#FF5500] mt-0.5 shrink-0" />

                        <p className="text-[10px] text-gray-500 leading-relaxed">
                          {task.aiSuggestion}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Ask AI */}
                  <button
                    onClick={() => setSelectedTask(task)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center
                      shrink-0 transition-colors ${
                        selectedTask?.id === task.id
                          ? "bg-orange-50 text-[#FF5500]"
                          : "text-gray-300 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    title="Ask AI"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Assistant */}
        {selectedTask && selectedTask.status !== "done" && (
          <section className="mt-6 bg-white border border-orange-100 rounded-2xl p-5 shadow-[0_4px_16px_rgba(255,85,0,0.05)]">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-[#FF5500]" />
              </div>

              <div className="flex-1">
                <p className="text-[12px] font-semibold text-gray-900">
                  AI Assistant
                </p>

                <p className="text-[10px] text-gray-400 mt-0.5">
                  Helping with: {selectedTask.title}
                </p>
              </div>

              <button
                onClick={() => setSelectedTask(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center
                  text-gray-300 hover:text-gray-700 hover:bg-gray-50"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-[10px] text-gray-500 mb-3">
              Stuck? Ask AI for help with this assignment.
            </p>

            <div className="flex gap-2">
              <input
                placeholder="What part are you stuck on?"
                className="flex-1 h-10 px-3.5 rounded-xl bg-white
                  border border-gray-200 text-[11px] text-gray-800
                  placeholder:text-gray-400 outline-none
                  focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
              />

              <button
                className="px-4 rounded-xl bg-[#FF5500] text-white
                  text-[10px] font-semibold hover:bg-[#e94d00]
                  transition-colors"
              >
                Help me
              </button>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default HomeworkPlannerView;