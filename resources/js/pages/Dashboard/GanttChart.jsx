import React from "react";
//import { ScrollArea } from "@/components/ui/scroll-area";

const projects = [
  {
    name: "Digital Transformation",
    priority: "High",
    color: "bg-green-400",
    duration: { start: "2025-01", end: "2025-07" },
  },
  {
    name: "Market Expansion",
    priority: "Medium",
    color: "bg-orange-400",
    duration: { start: "2025-03", end: "2025-10" },
  },
  {
    name: "Product Innovation",
    priority: "High",
    color: "bg-red-400",
    duration: { start: "2025-03", end: "2025-12" },
  },
  {
    name: "Customer Experience",
    priority: "Medium",
    color: "bg-green-400",
    duration: { start: "2025-05", end: "2025-08" },
  },
];

const years = [2025, 2026, 2027, 2028, 2029];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const GanttChart = () => {
  const getMonthIndex = (date) => {
    const [year, month] = date.split("-").map(Number);
    return (year - years[0]) * 12 + (month - 1);
  };

  const totalMonths = years.length * 12;
  const chartWidth = totalMonths * 64; // 64px per month

  return (
    <div className="p-4 rounded-lg border bg-white shadow overflow-x-auto">
      <h2 className="text-lg font-bold mb-4">SRAP Timeline</h2>
      <div className="flex mb-2">
        <div className="w-56"></div>
        {/* <ScrollArea className="w-full overflow-x-auto"> */}
          <div className="flex" style={{ width: `${chartWidth}px` }}>
            {years.map((year) =>
              months.map((month, index) => (
                <div
                  key={`${year}-${index}`}
                  className="w-16 text-xs text-gray-500 text-center"
                >
                  {month}
                </div>
              ))
            )}
          </div>
        {/* </ScrollArea> */}
      </div>

      {projects.map((project, idx) => {
        const startIdx = getMonthIndex(project.duration.start);
        const endIdx = getMonthIndex(project.duration.end);
        const width = (endIdx - startIdx + 1) * 64;
        const marginLeft = startIdx * 64;

        return (
          <div key={idx} className="flex items-center mb-4">
            <div className="w-56">
              <p className="font-medium">{project.name}</p>
              <span className="text-xs flex items-center gap-1">
                <span
                  className={`w-2 h-2 rounded-full ${
                    project.priority === "High"
                      ? "bg-red-500"
                      : "bg-yellow-400"
                  }`}
                ></span>
                {project.priority}
              </span>
            </div>
            {/* <ScrollArea className="w-full overflow-x-auto"> */}
              <div className="relative h-5" style={{ width: `${chartWidth}px` }}>
                <div
                  className={`absolute h-5 ${project.color} rounded-full`}
                  style={{ marginLeft: `${marginLeft}px`, width: `${width}px` }}
                ></div>
              </div>
            {/* </ScrollArea> */}
          </div>
        );
      })}
    </div>
  );
};

export default GanttChart;
