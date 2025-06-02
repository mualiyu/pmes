import { Center, Group, Text, rem, useComputedColorScheme } from "@mantine/core";
import { IconChartArcs } from "@tabler/icons-react";

export default function Logo(props) {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Group wrap="nowrap" {...props}>

        <img src="White-NCCC-Logo.png" style={{width:"59%", height:"auto", borderRadius:"4px"}} />

     <Text
  style={{
    color: computedColorScheme === 'dark' ? '#F0F0F0' : '#094509',
  }}
  fz={25}
  fw={600}
>
        PMT
      </Text>
    </Group>
  );
}
