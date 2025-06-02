import { Pill, useComputedColorScheme } from "@mantine/core";
import { forwardRef } from "react";

export default forwardRef(function TaskGroupLabel(props, ref) {
  const computedColorScheme = useComputedColorScheme();

  return (
    <Pill
      ref={ref}
      size="xs"
      bg={computedColorScheme === "light" ? "#5F9164" : "#5F9164"}
      fw={600}
      c="white"
      {...props}
    >
      {props.children}
    </Pill>
  );
});
