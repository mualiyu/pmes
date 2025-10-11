import Logo from "@/components/Logo";
import useNavigationStore from "@/hooks/store/useNavigationStore";
import { usePage } from "@inertiajs/react";
import { Group, ScrollArea, Text, rem } from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconChartBar,
  IconCurrencyDollar,
  IconFileDollar,
  IconGauge,
  IconLayoutList,
  IconListDetails,
  IconReportAnalytics,
  IconSettings,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import { useEffect } from "react";
import NavbarLinksGroup from "./NavbarLinksGroup";
import UserButton from "./UserButton";
import classes from "./css/NavBarNested.module.css";

export default function Sidebar() {
  const { version } = usePage().props;
  const { items, setItems } = useNavigationStore();

  useEffect(() => {
    setItems([
      {
        label: "Dashboard",
        icon: IconGauge,
        link: route("dashboard"),
        active: route().current("dashboard"),
        visible: true,
      },
      {
        label: "Admin Dashboard",
        icon: IconChartBar,
        link: route("admin.dashboard"),
        active: route().current("admin.dashboard"),
        visible: can("view users"), // Only visible to admins
      },
      // {
      //   label: "NC's Dashboard",
      //   icon: IconGauge,
      //   link: route("ceo-dashboard"),
      //   active: route().current("ceo-dashboard"),
      //   visible: true,
      // },
      {
        label: "Projects",
        icon: IconListDetails,
        link: route("projects.index"),
        active: route().current("projects.*") && !route().current("projects.*.milestones.*") && !route().current("projects.*.budgets.*"),
        visible: can("view projects"),
      },
      {
        label: "Project Management",
        icon: IconChartBar,
        active: route().current("monitoring.*") || route().current("milestones.*") || route().current("budgets.*") || route().current("projects.*.milestones.*") || route().current("projects.*.budgets.*"),
        opened: route().current("monitoring.*") || route().current("milestones.*") || route().current("budgets.*") || route().current("projects.*.milestones.*") || route().current("projects.*.budgets.*"),
        visible: can("view projects"),
        links: [
          {
            label: "M&E Dashboard",
            link: route("monitoring.dashboard"),
            active: route().current("monitoring.dashboard"),
            visible: can("view projects"),
          },
          {
            label: "All Milestones",
            link: route("milestones.index"),
            active: route().current("milestones.index"),
            visible: can("view projects"),
          },
          {
            label: "All Budgets",
            link: route("budgets.index"),
            active: route().current("budgets.index"),
            visible: can("view projects"),
          },
        ],
      },
      {
        label: "My Work",
        icon: IconLayoutList,
        active: route().current("my-work.*"),
        opened: route().current("my-work.*"),
        visible: can("view tasks") || can("view activities"),
        links: [
          {
            label: "Indicators",
            link: route("my-work.tasks.index"),
            active: route().current("my-work.tasks.*"),
            visible: can("view tasks"),
          },
          {
            label: "Activity Log",
            link: route("my-work.activity.index"),
            active: route().current("my-work.activity.*"),
            visible: can("view activities"),
          },
        ],
      },
      {
        label: "Vendors/Directorate",
        icon: IconBuildingSkyscraper,
        active: route().current("clients.*") || route().current("vendors.*") || route().current("directorates.*"),
        opened: route().current("clients.*") || route().current("vendors.*") || route().current("directorates.*"),
        visible: can("view client users") || can("view client companies"),
        links: [
          // {
          //   label: "Users",
          //   link: route("clients.users.index"),
          //   active: route().current("clients.users.*"),
          //   visible: can("view client users"),
          // },
          {
            label: "Organizations(General)",
            link: route("clients.companies.index"),
            active: route().current("clients.companies.*"),
            visible: can("view client companies"),
          },
          {
            label: "Vendors",
            link: route("vendors.index"),
            active: route().current("vendors.*"),
            visible: can("view client companies"),
          },
          {
            label: "Directorate",
            link: route("directorates.index"),
            active: route().current("directorates.*"),
            visible: can("view client companies"),
          },
        ],
      },
      {
        label: "Users & Roles",
        icon: IconUsers,
        link: route("users.index"),
        active: route().current("users.*"),
        visible: can("view users"),
      },
      // {
      //   label: "Invoices",
      //   icon: IconFileDollar,
      //   link: route("invoices.index"),
      //   active: route().current("invoices.*"),
      //   visible: can("view invoices"),
      // },
      // {
      //   label: "Reports",
      //   icon: IconReportAnalytics,
      //   active: route().current("reports.*"),
      //   opened: route().current("reports.*"),
      //   visible: can("view logged time sum report") || can("view daily logged time report"),
      //   links: [
      //     {
      //       label: "Logged time sum",
      //       link: route("reports.logged-time.sum"),
      //       active: route().current("reports.logged-time.sum"),
      //       visible: can("view logged time sum report"),
      //     },
      //     {
      //       label: "Daily logged time",
      //       link: route("reports.logged-time.daily"),
      //       active: route().current("reports.logged-time.daily"),
      //       visible: can("view daily logged time report"),
      //     },
      //   ],
      // },
      {
        label: "Settings",
        icon: IconSettings,
        active: route().current("settings.*"),
        opened: route().current("settings.*"),
        visible: can("view owner company") || can("view roles") || can("view labels"),
        links: [
          {
            label: "Organization",
            link: route("settings.company.edit"),
            active: route().current("settings.company.*"),
            visible: can("view owner company"),
          },
          {
            label: "Roles & Permissions",
            link: route("settings.roles.index"),
            active: route().current("settings.roles.*"),
            visible: can("view roles"),
          },
          {
            label: "Labels & Tags",
            link: route("settings.labels.index"),
            active: route().current("settings.labels.*"),
            visible: can("view labels"),
          },
        ],
      },
    ]);
  }, []);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Text size="xs" className={classes.version}>
            {/* v{version} */}
             v1.0.0
          </Text>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {items
            .filter((i) => i.visible)
            .map((item) => (
              <NavbarLinksGroup key={item.label} item={item} />
            ))}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  );
}
