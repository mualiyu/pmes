import { Container } from '@mantine/core';
import { Grid } from '@mantine/core';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

function CeoDashboard() {
  const demoProps = {
    bg: 'var(--mantine-color-blue-light)',
    h: 50,
    mt: 'md',
  };

  return (
    <>
      <Container fluid h={50} bg="var(--mantine-color-blue-light)">
       <Grid>
      <Grid.Col span={4}>
         <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        {/* <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        /> */}
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Strategic Priorities</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text fw={500} size="lg" c="dimmed">
        24
      </Text>

      
    </Card>
      </Grid.Col>
      <Grid.Col span={4}>2</Grid.Col>
      <Grid.Col span={4}>3</Grid.Col>
    </Grid>
    </Container>
    </>
  );
}

 export default CeoDashboard;