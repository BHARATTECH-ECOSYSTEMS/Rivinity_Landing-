"use client";

import { useState } from "react";
import {
  BarChart3,
  Upload,
  Send,
  Table,
  PieChart,
  TrendingUp,
  Download,
  Sparkles,
  FileSpreadsheet,
} from "lucide-react";

const sampleInsights = [
  {
    label: "Average Score",
    value: "78.5%",
    change: "+3.2%",
    positive: true,
  },
  {
    label: "Total Records",
    value: "1,247",
    change: "",
    positive: true,
  },
  {
    label: "Missing Data",
    value: "2.1%",
    change: "-0.5%",
    positive: true,
  },
  {
    label: "Outliers",
    value: "15",
    change: "+3",
    positive: false,
  },
];

const chartData = [65, 45, 78, 92, 58, 84, 71, 88, 95, 62, 76, 83];

const tableRows = [
  ["Alex K.", "92", "85", "78", "85"],
  ["Sarah M.", "88", "91", "94", "91"],
  ["James L.", "76", "82", "70", "76"],
  ["Emma R.", "95", "88", "92", "92"],
];

const DataAnalystView = () => {
  const [query, setQuery] = useState("");
  const [hasData] = useState(true);
  const [activeChart, setActiveChart] = useState<"bar" | "pie" | "line">(
    "bar"
  );

  const chartButtons = [
    { key: "bar" as const, icon: BarChart3, label: "Bar chart" },
    { key: "pie" as const, icon: PieChart, label: "Pie chart" },
    { key: "line" as const, icon: TrendingUp, label: "Line chart" },
  ];

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden bg-white">
      {/* Header */}
      <div className="border-b border-gray-200/80 bg-white/85 backdrop-blur-sm">
        <div className="max-w-[1050px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gray-500" />
            </div>

            <div>
              <h1 className="text-[15px] font-semibold text-gray-900">
                Data Analyst
              </h1>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Upload data, ask questions, get insights
              </p>
            </div>
          </div>

          <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FF5500] text-white text-[11px] font-medium hover:bg-[#e94d00] transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload CSV/Excel</span>
          </button>
        </div>
      </div>

      <div className="max-w-[1050px] mx-auto px-6 py-6">
        {hasData && (
          <>
            {/* Dataset Info */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[12px] font-semibold text-gray-900">
                  Student Performance
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5">
                  1,247 records · 5 columns
                </p>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-[10px] text-gray-400">
                <FileSpreadsheet className="w-3.5 h-3.5" />
                student-performance.xlsx
              </div>
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
              {sampleInsights.map((insight) => (
                <div
                  key={insight.label}
                  className="bg-white border border-gray-200/80 rounded-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.035)]"
                >
                  <p className="text-[10px] text-gray-400 mb-1.5">
                    {insight.label}
                  </p>

                  <p className="text-[19px] font-bold text-gray-900">
                    {insight.value}
                  </p>

                  {insight.change && (
                    <p
                      className={`text-[10px] font-medium mt-1 ${
                        insight.positive ? "text-emerald-500" : "text-red-500"
                      }`}
                    >
                      {insight.change}
                      <span className="text-gray-400 font-normal ml-1">
                        vs previous
                      </span>
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Visualization */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-5 mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.035)]">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[12px] font-semibold text-gray-900">
                    Visualization
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Performance distribution across the dataset
                  </p>
                </div>

                <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-lg p-1">
                  {chartButtons.map((chart) => {
                    const Icon = chart.icon;

                    return (
                      <button
                        key={chart.key}
                        onClick={() => setActiveChart(chart.key)}
                        title={chart.label}
                        className={`p-2 rounded-md transition-colors ${
                          activeChart === chart.key
                            ? "bg-white text-[#FF5500] shadow-sm border border-gray-100"
                            : "text-gray-400 hover:text-gray-600 hover:bg-white/70"
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Chart */}
              <div className="h-[230px] border-b border-l border-gray-100 relative px-4">
                {/* Horizontal grid */}
                <div className="absolute inset-x-4 top-0 border-t border-gray-100" />
                <div className="absolute inset-x-4 top-1/4 border-t border-gray-100" />
                <div className="absolute inset-x-4 top-1/2 border-t border-gray-100" />
                <div className="absolute inset-x-4 top-3/4 border-t border-gray-100" />

                {activeChart === "bar" && (
                  <div className="absolute inset-0 px-6 pt-4 pb-6 flex items-end gap-2">
                    {chartData.map((value, index) => (
                      <div
                        key={index}
                        className="flex-1 h-full flex flex-col justify-end items-center gap-1"
                      >
                        <div
                          className="w-full max-w-[42px] rounded-t-md bg-[#FF5500] opacity-80 hover:opacity-100 transition-all"
                          style={{
                            height: `${value * 1.8}px`,
                          }}
                        />

                        <span className="text-[8px] text-gray-400">
                          {index + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeChart === "line" && (
                  <div className="absolute inset-0 px-6 py-6 flex items-center">
                    <svg
                      viewBox="0 0 1000 220"
                      className="w-full h-full overflow-visible"
                      preserveAspectRatio="none"
                    >
                      <polyline
                        fill="none"
                        stroke="#FF5500"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={chartData
                          .map((value, index) => {
                            const x =
                              (index / (chartData.length - 1)) * 1000;
                            const y = 210 - value * 1.9;
                            return `${x},${y}`;
                          })
                          .join(" ")}
                      />

                      {chartData.map((value, index) => {
                        const x =
                          (index / (chartData.length - 1)) * 1000;
                        const y = 210 - value * 1.9;

                        return (
                          <circle
                            key={index}
                            cx={x}
                            cy={y}
                            r="6"
                            fill="white"
                            stroke="#FF5500"
                            strokeWidth="3"
                          />
                        );
                      })}
                    </svg>
                  </div>
                )}

                {activeChart === "pie" && (
                  <div className="absolute inset-0 flex items-center justify-center gap-8">
                    <div
                      className="w-[150px] h-[150px] rounded-full relative"
                      style={{
                        background:
                          "conic-gradient(#FF5500 0deg 140deg, #ff9a70 140deg 245deg, #ffd2c2 245deg 360deg)",
                      }}
                    >
                      <div className="absolute inset-[28px] rounded-full bg-white flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-[16px] font-bold text-gray-900">
                            78.5%
                          </p>
                          <p className="text-[9px] text-gray-400">
                            Average
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {[
                        ["80–100", "39%"],
                        ["60–79", "29%"],
                        ["Below 60", "32%"],
                      ].map(([label, value], index) => (
                        <div
                          key={label}
                          className="flex items-center gap-2"
                        >
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${
                              index === 0
                                ? "bg-[#FF5500]"
                                : index === 1
                                ? "bg-orange-300"
                                : "bg-orange-100"
                            }`}
                          />

                          <span className="text-[10px] text-gray-500">
                            {label}
                          </span>

                          <span className="text-[10px] font-semibold text-gray-700">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Data Preview */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-5 mb-5 shadow-[0_2px_12px_rgba(0,0,0,0.035)] overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-orange-50 flex items-center justify-center">
                    <Table className="w-3.5 h-3.5 text-[#FF5500]" />
                  </div>

                  <div>
                    <p className="text-[12px] font-semibold text-gray-900">
                      Data Preview
                    </p>
                    <p className="text-[10px] text-gray-400">
                      Showing first 4 records
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors">
                  <Download className="w-3 h-3" />
                  Export
                </button>
              </div>

              <table className="w-full text-[11px]">
                <thead>
                  <tr className="border-b border-gray-100">
                    {[
                      "Student",
                      "Math",
                      "Science",
                      "English",
                      "Average",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="text-left py-2.5 px-3 text-[10px] text-gray-400 font-semibold"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {tableRows.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors"
                    >
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className={`py-3 px-3 ${
                            cellIndex === 4
                              ? "font-semibold text-gray-800"
                              : "text-gray-600"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* AI Query */}
        <div className="bg-white border border-gray-200/80 rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.035)]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 shrink-0 rounded-lg bg-orange-50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#FF5500]" />
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  // Existing UI-only query behavior preserved.
                }
              }}
              placeholder="Ask about your data..."
              className="flex-1 min-w-0 bg-transparent text-[12px] text-gray-800 placeholder:text-gray-400 focus:outline-none"
            />

            <button
              disabled={!query.trim()}
              className="w-8 h-8 shrink-0 rounded-lg bg-[#FF5500] flex items-center justify-center hover:bg-[#e94d00] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-2 mt-3 ml-11 flex-wrap">
            {[
              "Average math score?",
              "Find top students",
              "Show missing data",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[9.5px] text-gray-400 hover:bg-orange-50 hover:border-orange-100 hover:text-[#FF5500] transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataAnalystView;