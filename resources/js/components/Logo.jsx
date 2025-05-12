import { Center, Group, Text, rem, useComputedColorScheme } from "@mantine/core";
import { IconChartArcs } from "@tabler/icons-react";

export default function Logo(props) {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Group wrap="nowrap" {...props}>

        <img src="ONSA_WHITE_BG.jpg" style={{width:"60px", height:"auto", borderRadius:"50px"}} />
      
      <Text fz={20} fw={600}>
        NCCC-PMT
      </Text>
    </Group>
  );
}
