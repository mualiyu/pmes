import { Badge, Card, Progress, Table, Text } from "@mantine/core";

const DirectorateTable = ({ directorates }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="md" fw={600} mb="md">
        Directorate Performance
      </Text>
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Directorate</Table.Th>
            <Table.Th>Projects</Table.Th>
            <Table.Th>Milestones</Table.Th>
            <Table.Th>Completion Rate</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {directorates.map((directorate) => (
            <Table.Tr key={directorate.id}>
              <Table.Td>
                <Text size="sm" fw={500}>
                  {directorate.name}
                </Text>
              </Table.Td>
              <Table.Td>
                <Badge variant="light" color="blue">
                  {directorate.projects_count}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Text size="sm">
                  {directorate.completed_milestones} / {directorate.total_milestones}
                </Text>
              </Table.Td>
              <Table.Td>
                <div style={{ width: 150 }}>
                  <Progress
                    value={directorate.milestone_completion_rate}
                    color={
                      directorate.milestone_completion_rate >= 75
                        ? "green"
                        : directorate.milestone_completion_rate >= 50
                        ? "yellow"
                        : "red"
                    }
                    size="md"
                    radius="xl"
                  />
                  <Text size="xs" c="dimmed" mt={4}>
                    {directorate.milestone_completion_rate}%
                  </Text>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Card>
  );
};

export default DirectorateTable;

