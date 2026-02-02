import { Stack, TextField, Typography } from "@mui/material";
import { AIGenerateType } from "../libs/types";

type Props = {
  type: AIGenerateType;
  value: string;
  onChange: (v: string) => void;
};

export const AIPromptInput = ({ type, value, onChange }: Props) => {
  return (
    <Stack spacing={1}>
      <Typography color="text.secondary">
        {type === "single"
          ? "AI will generate one meal based on your description"
          : "AI will generate a full menu (5–10 meals) based on your description"}
      </Typography>

      <TextField
        multiline
        minRows={3}
        placeholder="Example: Traditional Palestinian meals with medium prices..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </Stack>
  );
};
