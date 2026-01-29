import { Box, Grid, Typography, Container } from "@mui/material";

const HOW_IT_WORKS_STEPS = [
  {
    icon: "📝",
    title: "Create Account",
    description: "Users can create accounts as either customers or restaurant owners to access various system features.",
  },
  {
    icon: "🍽️",
    title: "Manage or Choose Restaurant",
    description: "Restaurant owners can create and manage their menu, while customers can easily browse restaurants.",
  },
  {
    icon: "🚀",
    title: "Order or Receive Orders",
    description: "Customers add orders to cart, restaurant owners receive and track orders in real-time.",
  },
];

export default function HowItWorksSection() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: "background.paper", // يتبع الثيم
        width: "100%",
      }}
    >
      <Container maxWidth="lg">
        {/* العناوين */}
        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "1.75rem", md: "2.5rem" },
            }}
          >
            How does the app work?
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 600, mx: "auto", px: 2 }}
          >
            A simple journey starting with registration and ending with a delicious meal or successful restaurant management.
          </Typography>
        </Box>

        {/* الشبكة التفاعلية */}
        <Grid 
           container
          spacing={{ xs: 6, md: 2 }} // مسافات أكبر في الجوال (عمودياً) لتنفس العناصر
         flexWrap={{sx:"wrap",sm:"nowrap"}}
         flexDirection={{sx:"column",sm:"row"}}
       >
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <Grid 
              size={{xs:12,sm:6,md:4}} 
              key={index}
              width={{sx:"100%",sm:"33%"}}
              
            >
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  px: { xs: 2, md: 3 },
                }}
              >
                {/* دائرة الأيقونة مع تأثير بصري */}
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    bgcolor: "primary.light",
                    color: "primary.main",
                    mb: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    opacity: 0.9
                  }}
                >
                  {step.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, mb: 1.5 }}
                >
                  {step.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ 
                    color: "text.secondary", 
                    lineHeight: 1.7,
                    fontSize: "1rem" 
                  }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}