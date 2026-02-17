import { Skeleton, Container, Box, Grid, Paper } from "@mui/material";

export function SettingsSkeleton() {
  return (
    <Box sx={{ p: 4, maxWidth: 1100, mx: "auto" }}>
      {/* Header Skeleton */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4, alignItems: "center" }}>
        <Box sx={{ width: "30%" }}>
          <Skeleton variant="text" width="60%" height={40} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="90%" height={20} />
        </Box>
        <Skeleton variant="rectangular" width={140} height={45} sx={{ borderRadius: 2 }} />
      </Box>

      <Grid container spacing={3}>
        {/* Left Column */}
        <Grid size={{xs:12,md:6}}>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
            <Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Paper>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3,mt:2 }}>
             <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid size={{xs:12,md:6}} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
             <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 2 }} />
          </Paper>
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
             <Skeleton variant="rectangular" height={350} sx={{ borderRadius: 2 }} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}