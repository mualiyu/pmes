import { Pill, useComputedColorScheme } from "@mantine/core";
import { forwardRef } from "react";

export default forwardRef(function TaskGroupLabel(props, ref) {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Pill
      ref={ref}
      size="xs"
      bg={computedColorScheme === "light" ? "#2c3999" : "#2c3999"}
      fw={600}
      c="white"
      {...props}
    >
      {props.children}
    </Pill>
  );
});
