import React, { useState, useMemo } from "react"

const defaultProjects = [
  {
    id: "1",
    name: "Website Redesign",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-04-30"),
    priority: "High",
    color: "#3b82f6",
  },
  {
    id: "2",
    name: "Mobile App Development",
    startDate: new Date("2024-02-01"),
    endDate: new Date("2024-08-15"),
    priority: "High",
    color: "#ef4444",
  },
  {
    id: "3",
    name: "Marketing Campaign",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-06-30"),
    priority: "Medium",
    color: "#f59e0b",
  },
]

export default function GanttChart({ projects = defaultProjects, title = "Project Timeline", className = "" }) {
  const [zoomLevel, setZoomLevel] = useState("month")

  const timelineConfig = useMemo(() => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const allDates = projects.flatMap((p) => [p.startDate, p.endDate])
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())))
    const startYear = Math.min(minDate.getFullYear(), currentYear)
    const endYear = Math.max(maxDate.getFullYear(), currentYear + 5)

    switch (zoomLevel) {
      case "year":
        return {
          start: new Date(startYear, 0, 1),
          end: new Date(endYear, 11, 31),
          intervals: Array.from({ length: endYear - startYear + 1 }, (_, i) => ({
            date: new Date(startYear + i, 0, 1),
            label: (startYear + i).toString(),
            width: 120,
          })),
          unitWidth: 120,
        }

      case "month":
        const monthIntervals = []
        for (let year = startYear; year <= endYear; year++) {
          for (let month = 0; month < 12; month++) {
            monthIntervals.push({
              date: new Date(year, month, 1),
              label: new Date(year, month, 1).toLocaleDateString("en-US", { month: "short", year: "2-digit" }),
              width: 80,
            })
          }
        }
        return {
          start: new Date(startYear, 0, 1),
          end: new Date(endYear, 11, 31),
          intervals: monthIntervals,
          unitWidth: 80,
        }

      case "week":
        const weekIntervals = []
        const weekStart = new Date(currentYear, 0, 1)
        const weekEnd = new Date(currentYear + 1, 0, 1)
        const firstDay = new Date(weekStart)
        const dayOfWeek = firstDay.getDay()
        const daysToMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek
        firstDay.setDate(firstDay.getDate() + daysToMonday)

        let weekNum = 1
        const currentDate = new Date(firstDay)

        while (currentDate < weekEnd) {
          weekIntervals.push({
            date: new Date(currentDate),
            label: `Week ${weekNum}`,
            width: 100,
          })
          currentDate.setDate(currentDate.getDate() + 7)
          weekNum++
        }

        return {
          start: firstDay,
          end: weekEnd,
          intervals: weekIntervals,
          unitWidth: 100,
        }

      default:
        return {
          start: new Date(startYear, 0, 1),
          end: new Date(endYear, 11, 31),
          intervals: [],
          unitWidth: 80,
        }
    }
  }, [zoomLevel, projects])

  const calculateBarPosition = (project) => {
    const { start, end, unitWidth } = timelineConfig
    const totalDuration = end.getTime() - start.getTime()
    const projectStart = Math.max(project.startDate.getTime(), start.getTime())
    const projectEnd = Math.min(project.endDate.getTime(), end.getTime())

    const startOffset =
      ((projectStart - start.getTime()) / totalDuration) * (timelineConfig.intervals.length * unitWidth)
    const duration =
      ((projectEnd - projectStart) / totalDuration) * (timelineConfig.intervals.length * unitWidth)

    return {
      left: startOffset,
      width: Math.max(duration, 10),
    }
  }

  const getPriorityBadgeStyle = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTodayPosition = () => {
    const today = new Date()
    const { start, end, unitWidth } = timelineConfig

    if (today < start || today > end) return null

    const totalDuration = end.getTime() - start.getTime()
    const todayOffset =
      ((today.getTime() - start.getTime()) / totalDuration) * (timelineConfig.intervals.length * unitWidth)

    return todayOffset
  }

  const todayPosition = getTodayPosition()
  const today = new Date()

  return (
    <div className={`w-full bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-500 mt-1">
              Today:{" "}
              {today.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="relative">
            <select
              value={zoomLevel}
              onChange={(e) => setZoomLevel(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <div className="min-w-max relative">
            <div className="flex border-b border-gray-200 mb-4">
              <div className="w-64 flex-shrink-0 py-3 px-4 font-semibold text-gray-700">Project</div>
              <div className="flex">
                {timelineConfig.intervals.map((interval, index) => (
                  <div
                    key={index}
                    className="py-3 px-2 text-center text-sm font-medium text-gray-600 border-l border-gray-100"
                    style={{ width: interval.width }}
                  >
                    {interval.label}
                  </div>
                ))}
              </div>
            </div>

            {projects.map((project) => {
              const barPosition = calculateBarPosition(project)
              return (
                <div
                  key={project.id}
                  className="flex items-center border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-64 flex-shrink-0 py-4 px-4">
                    <div className="font-medium text-gray-900 mb-2">{project.name}</div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadgeStyle(
                        project.priority
                      )}`}
                    >
                      {project.priority}
                    </span>
                  </div>
                  <div className="relative flex-1" style={{ height: "60px" }}>
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 rounded-md shadow-sm opacity-90 hover:opacity-100 transition-opacity cursor-pointer"
                      style={{
                        left: `${barPosition.left}px`,
                        width: `${barPosition.width}px`,
                        height: "24px",
                        backgroundColor: project.color,
                      }}
                      title={`${project.name}: ${project.startDate.toLocaleDateString()} - ${project.endDate.toLocaleDateString()}`}
                    />
                    {timelineConfig.intervals.map((_, index) => (
                      <div
                        key={index}
                        className="absolute top-0 bottom-0 border-l border-gray-100"
                        style={{ left: index * timelineConfig.unitWidth }}
                      />
                    ))}
                  </div>
                </div>
              )
            })}

            {todayPosition !== null && (
              <div
                className="absolute top-0 bottom-0 pointer-events-none z-10"
                style={{ left: `${264 + todayPosition}px` }}
              >
                <div className="w-0.5 h-full bg-red-500 relative">
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full"></div>
                  <div className="absolute -bottom-6 -left-8 text-xs text-red-600 font-medium whitespace-nowrap">
                    Today
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-500"></div>
              <span>High Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-500"></div>
              <span>Medium Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-500"></div>
              <span>Low Priority</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-0.5 h-4 bg-red-500"></div>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
