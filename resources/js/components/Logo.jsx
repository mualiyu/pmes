import { Center, Group, Text, rem, useComputedColorScheme } from "@mantine/core";
import { IconChartArcs } from "@tabler/icons-react";

export default function Logo(props) {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Group wrap="nowrap" {...props}>
      {/* <Center 
        style={{
          width: rem(40),
          height: rem(40),
          borderRadius: rem(8),
          backgroundColor: computedColorScheme === 'dark' ? '#2C2E33' : '#5F9164',
        }}
      >
        <IconChartArcs 
          style={{ 
            width: rem(24), 
            height: rem(24),
            color: '#fff'
          }} 
        />
      </Center> */}

      <Text
        style={{
          color: computedColorScheme === 'dark' ? '#F0F0F0' : '#2c3999',
        }}
        fz={22}
        fw={700}
      >
        M&E
      </Text>
    </Group>
  );
}
