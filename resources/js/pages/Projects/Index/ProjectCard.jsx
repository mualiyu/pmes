import { stopOnIgnoreLink } from "@/utils/domEvents";
import { getInitials } from "@/utils/user";
import { redirectTo } from "@/utils/route";
import { Link } from "@inertiajs/react";
import { ActionIcon, Avatar, Card, Group, Progress, Text, Tooltip } from "@mantine/core";
import { IconCurrencyDollar, IconTarget } from "@tabler/icons-react";
import ToggleFavorite from "./FavoriteToggle";
import ProjectCardActions from "./ProjectCardActions";
import classes from "./css/ProjectCard.module.css";

export default function ProjectCard({ item }) {
  const completedPercent = (item.completed_tasks_count / item.all_tasks_count) * 100;
  const overduePercent = (item.overdue_tasks_count / item.all_tasks_count) * 100;

  return (
    <Link
      href={route("projects.show", item.id)}
      className={classes.link}
      onClick={stopOnIgnoreLink}
    >
      <Card withBorder padding="xl" radius="md" w={350} className={classes.card}>
        <Group justify="space-between">
          <Text fz={23} fw={700} className={classes.title}>
            {item.name}
          </Text>
          <ToggleFavorite item={item} />
        </Group>

        <Text fz="sm" fw={500}>
          {item.client_company?.name}
        </Text>

        {item.description?.length > 0 && (
          <Text fz="sm" c="dimmed" mt="lg">
            {item.description}
          </Text>
        )}

        <Text c="dimmed" fz="sm" mt="md">
          Completed indicators:{" "}
          <Text span fw={500} c="bright">
            {item.completed_tasks_count} / {item.all_tasks_count}
          </Text>
        </Text>

        <Progress.Root value={item.all_tasks_count} mt={10} radius="xl">
          <Tooltip label={`Completed: ${item.completed_tasks_count}`} withArrow>
            <Progress.Section value={completedPercent} color="#2c3999" />
          </Tooltip>
          <Tooltip label={`Overdue: ${item.overdue_tasks_count}`} withArrow>
            <Progress.Section value={overduePercent} color="red" />
          </Tooltip>
          <Progress.Section value={100 - (completedPercent + overduePercent)} color="gray" />
        </Progress.Root>

        <Group justify="space-between" mt="md">
          <Avatar.Group spacing="sm">
            {item.users_with_access.slice(0, 4).map((user) => (
              <Tooltip key={user.id} label={user.name} openDelay={300} withArrow>
                <Avatar
                  src={user.avatar}
                  radius="xl"
                  style={{ cursor: "default" }}
                  data-ignore-link
                  className={classes.avatar}
                >
                  {getInitials(user.name)}
                </Avatar>
              </Tooltip>
            ))}
            {item.users_with_access.length - 4 > 0 && (
              <Avatar radius="xl">+{item.users_with_access.length - 4}</Avatar>
            )}
          </Avatar.Group>

          <Group gap="xs">
            <Tooltip label="Milestones" withArrow>
              <ActionIcon
                variant="light"
                color="blue"
                size="lg"
                data-ignore-link
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  redirectTo("projects.milestones.index", { project: item.id });
                }}
              >
                <IconTarget size={18} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Budgets" withArrow>
              <ActionIcon
                variant="light"
                color="green"
                size="lg"
                data-ignore-link
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  redirectTo("projects.budgets.index", { project: item.id });
                }}
              >
                <IconCurrencyDollar size={18} />
              </ActionIcon>
            </Tooltip>
            <ProjectCardActions item={item} />
          </Group>
        </Group>
      </Card>
    </Link>
  );
}
