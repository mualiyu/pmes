import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/tiptap/styles.css";
import "nprogress/nprogress.css";
import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { MantineProvider, createTheme } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

// Updated primary color palette (based on #018F3C)
const customPrimary = [
  "#e3f9ec",
  "#bdf0d1",
  "#95e6b5",
  "#6fdc9a",
  "#48d27f",
  "#22c963",
  "#5F9164", // Primary brand green
  "#017c35",
  "#01692d",
  "#015625",
];

const theme = createTheme({
  primaryColor: "custom",
  primaryShade: { light: 6, dark: 6 },
  colors: {
    custom: customPrimary,
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5c5f66",
      "#373A40",
      "#2C2E33",
      "#25262b",
      "#1A1B1E",
      "#141517",
      "#101113",
    ],
  },
  fontFamily: "Inter, system-ui, sans-serif",
  headings: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
  globalStyles: (theme) => ({
    body: {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : "#EDF1EF",
      color: theme.colorScheme === "dark" ? theme.colors.dark[0] : "#094509",
    },
    a: {
      color: theme.colorScheme === "dark" ? "#cbdff4" : "#0F172A",
      textDecoration: "none",
      transition: "color 0.2s ease",
      "&:hover": {
        color: theme.colorScheme === "dark" ? "#ffffff" : "#3d5f82",
      },
      "&.active": {
        color: theme.colors.custom[6],
        fontWeight: 600,
      },
    },
  }),
});

const appName = window.document.getElementsByTagName("title")[0]?.innerText || "Laravel";

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(`./pages/${name}.jsx`, import.meta.glob("./pages/**/*.jsx")),
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Notifications />
        <ModalsProvider>
          <App {...props} />
        </ModalsProvider>
      </MantineProvider>,
    );
  },
  progress: false,
});
