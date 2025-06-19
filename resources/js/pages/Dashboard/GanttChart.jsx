"use client"

import { useState, useMemo } from "react"
import { MantineProvider, Paper, Title, Text, Select, Badge, Group, Stack, ScrollArea, Box } from "@mantine/core"
import "@mantine/core/styles.css"

// Sample data - you can replace this with your own projects
const defaultProjects = [
  {
    id: "1",
    name: "Digital Transformation",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2024-07-31"),
    priority: "High",
    color: "#51cf66",
  },
  {
    id: "2",
    name: "Market Expansion",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-11-30"),
    priority: "Medium",
    color: "#ffd43b",
  },
  {
    id: "3",
    name: "Product Innovation",
    startDate: new Date("2024-04-01"),
    endDate: new Date("2024-12-31"),
    priority: "High",
    color: "#ff6b6b",
  },
  {
    id: "4",
    name: "Customer Experience",
    startDate: new Date("2024-05-01"),
    endDate: new Date("2024-09-30"),
    priority: "Medium",
    color: "#51cf66",
  },
  {
    id: "5",
    name: "Infrastructure Upgrade",
    startDate: new Date("2024-01-01"),
    endDate: new Date("2029-01-01"),
    priority: "High",
    color: "#9775fa",
  },
]

function GanttChart({ projects = defaultProjects, title = "Project Timeline" }) {
  const [zoomLevel, setZoomLevel] = useState("month")

  const timelineConfig = useMemo(() => {
    const now = new Date()
    const currentYear = now.getFullYear()

    // Find the earliest start date and latest end date
    const allDates = projects.flatMap((p) => [p.startDate, p.endDate])
    const minDate = new Date(Math.min(...allDates.map((d) => d.getTime())))
    const maxDate = new Date(Math.max(...allDates.map((d) => d.getTime())))

    // Extend range to accommodate 5+ year projects
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
        // Show weeks for current year with better labeling
        const weekStart = new Date(currentYear, 0, 1)
        const weekEnd = new Date(currentYear + 1, 0, 1)

        // Start from first Monday of the year
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
    const duration = ((projectEnd - projectStart) / totalDuration) * (timelineConfig.intervals.length * unitWidth)

    return {
      left: startOffset,
      width: Math.max(duration, 10), // Minimum width for visibility
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "red"
      case "Medium":
        return "yellow"
      case "Low":
        return "green"
      default:
        return "gray"
    }
  }

  // Calculate today's position on the timeline
  const getTodayPosition = () => {
    const today = new Date()
    const { start, end, unitWidth } = timelineConfig

    if (today < start || today > end) {
      return null // Today is outside the visible range
    }

    const totalDuration = end.getTime() - start.getTime()
    const todayOffset =
      ((today.getTime() - start.getTime()) / totalDuration) * (timelineConfig.intervals.length * unitWidth)

    return todayOffset
  }

  const todayPosition = getTodayPosition()
  const today = new Date()

  return (
    <Paper shadow="sm" p="xl" radius="md" withBorder>
      {/* Header */}
      <Group justify="space-between" mb="lg">
        <Stack gap="xs">
          <Title order={2}>{title}</Title>
          <Text size="sm" c="dimmed">
            Today:{" "}
            {today.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </Stack>
        <Select
          value={zoomLevel}
          onChange={setZoomLevel}
          data={[
            { value: "year", label: "Year" },
            { value: "month", label: "Month" },
            { value: "week", label: "Week" },
          ]}
          w={120}
        />
      </Group>

      {/* Chart Content */}
      <ScrollArea>
        <Box style={{ minWidth: "max-content", position: "relative" }}>
          {/* Timeline Header */}
          <Group gap={0} mb="md" style={{ borderBottom: "1px solid var(--mantine-color-gray-3)" }}>
            <Box
              w={250}
              py="md"
              px="md"
              style={{
                fontWeight: 600,
                color: "var(--mantine-color-gray-7)",
                flexShrink: 0,
              }}
            >
              Project
            </Box>
            <Group gap={0}>
              {timelineConfig.intervals.map((interval, index) => (
                <Box
                  key={index}
                  w={interval.width}
                  py="md"
                  px="xs"
                  ta="center"
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "var(--mantine-color-gray-6)",
                    borderLeft: index > 0 ? "1px solid var(--mantine-color-gray-2)" : "none",
                  }}
                >
                  {interval.label}
                </Box>
              ))}
            </Group>
          </Group>

          {/* Project Rows */}
          {projects.map((project) => {
            const barPosition = calculateBarPosition(project)

            return (
              <Group
                key={project.id}
                gap={0}
                style={{
                  borderBottom: "1px solid var(--mantine-color-gray-1)",
                  "&:hover": {
                    backgroundColor: "var(--mantine-color-gray-0)",
                  },
                  transition: "background-color 0.2s",
                }}
              >
                <Box w={250} py="md" px="md" style={{ flexShrink: 0 }}>
                  <Text fw={500} mb="xs">
                    {project.name}
                  </Text>
                  <Badge color={getPriorityColor(project.priority)} size="sm">
                    {project.priority}
                  </Badge>
                </Box>
                <Box
                  style={{
                    position: "relative",
                    height: "60px",
                    flex: 1,
                  }}
                >
                  {/* Project Bar */}
                  <Box
                    style={{
                      position: "absolute",
                      top: "50%",
                      transform: "translateY(-50%)",
                      left: `${barPosition.left}px`,
                      width: `${barPosition.width}px`,
                      height: "24px",
                      backgroundColor: project.color,
                      borderRadius: "6px",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      opacity: 0.9,
                      cursor: "pointer",
                      "&:hover": {
                        opacity: 1,
                      },
                      transition: "opacity 0.2s",
                    }}
                    title={`${project.name}: ${project.startDate.toLocaleDateString()} - ${project.endDate.toLocaleDateString()}`}
                  />
                  {/* Grid lines */}
                  {timelineConfig.intervals.map((_, index) => (
                    <Box
                      key={index}
                      style={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: index * timelineConfig.unitWidth,
                        borderLeft: "1px solid var(--mantine-color-gray-2)",
                      }}
                    />
                  ))}
                </Box>
              </Group>
            )
          })}

          {/* Today Indicator Line */}
          {todayPosition !== null && (
            <Box
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${250 + todayPosition}px`,
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <Box
                style={{
                  width: "2px",
                  height: "100%",
                  backgroundColor: "var(--mantine-color-red-6)",
                  position: "relative",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "-8px",
                    width: "16px",
                    height: "16px",
                    backgroundColor: "var(--mantine-color-red-6)",
                    borderRadius: "50%",
                  }}
                />
                <Text
                  size="xs"
                  c="red"
                  fw={500}
                  style={{
                    position: "absolute",
                    bottom: "-24px",
                    left: "-16px",
                    whiteSpace: "nowrap",
                  }}
                >
                  Today
                </Text>
              </Box>
            </Box>
          )}
        </Box>
      </ScrollArea>

      {/* Legend */}
      <Group gap="lg" mt="xl" pt="md" style={{ borderTop: "1px solid var(--mantine-color-gray-3)" }}>
        <Group gap="xs">
          <Box
            w={16}
            h={16}
            style={{
              backgroundColor: "var(--mantine-color-red-6)",
              borderRadius: "4px",
            }}
          />
          <Text size="sm" c="dimmed">
            High Priority
          </Text>
        </Group>
        <Group gap="xs">
          <Box
            w={16}
            h={16}
            style={{
              backgroundColor: "var(--mantine-color-yellow-6)",
              borderRadius: "4px",
            }}
          />
          <Text size="sm" c="dimmed">
            Medium Priority
          </Text>
        </Group>
        <Group gap="xs">
          <Box
            w={16}
            h={16}
            style={{
              backgroundColor: "var(--mantine-color-green-6)",
              borderRadius: "4px",
            }}
          />
          <Text size="sm" c="dimmed">
            Low Priority
          </Text>
        </Group>
        <Group gap="xs">
          <Box
            w={2}
            h={16}
            style={{
              backgroundColor: "var(--mantine-color-red-6)",
            }}
          />
          <Text size="sm" c="dimmed">
            Today
          </Text>
        </Group>
      </Group>
    </Paper>
  )
}

// Example usage component with MantineProvider
export default function GanttChartApp() {
  // You can use your own projects data here
  const myProjects = [
    {
      id: "1",
      name: "Website Redesign",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-04-30"),
      priority: "High",
      color: "#339af0",
    },
    {
      id: "2",
      name: "Mobile App Development",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-08-15"),
      priority: "High",
      color: "#fa5252",
    },
    {
      id: "3",
      name: "Marketing Campaign",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-06-30"),
      priority: "Medium",
      color: "#fcc419",
    },
  ]

  return (
    <MantineProvider>
      <div style={{ padding: "2rem", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
        {/* Using default projects */}
        <GanttChart title="Default Projects" />

        {/* Using custom projects - uncomment to use */}
        {/* <div style={{ marginTop: "2rem" }}>
          <GanttChart projects={myProjects} title="My Custom Projects" />
        </div> */}
      </div>
    </MantineProvider>
  )
}
