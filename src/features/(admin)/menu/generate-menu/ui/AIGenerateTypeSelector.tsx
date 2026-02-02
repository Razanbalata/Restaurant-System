import {
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Typography,
} from "@mui/material";
import { AIGenerateType } from "../libs/types";

type Props = {
  value: AIGenerateType;
  onChange: (v: AIGenerateType) => void;
};

export const AIGenerateTypeSelector = ({ value, onChange }: Props) => {
  return (
    <Stack spacing={1}>
      <Typography fontWeight={500}>Generation Type</Typography>

      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={(_, v) => v && onChange(v)}
      >
        <ToggleButton value="single">Single Meal</ToggleButton>
        <ToggleButton value="full">Full Menu</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
