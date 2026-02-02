import { Stack, Skeleton, Card, CardContent } from "@mui/material";

export const GeneratedMenuSkeleton = () => {
  return (
    <Stack spacing={2}>
      {[1, 2, 3].map((i) => (
        <Card key={i} variant="outlined">
          <CardContent>
            <Skeleton variant="text" width="60%" />
            <Skeleton variant="text" width="40%" />
            <Skeleton variant="rectangular" height={80} />
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};
