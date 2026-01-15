import { Paper, PaperProps, styled } from "@mui/material";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: "16px", 
  border: "1px solid #f0f0f0",
  padding: theme.spacing(2),
  backgroundColor: "#ffffff",
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  
  "&:hover": {
    // تم التصحيح هنا من box-shadow إلى boxShadow
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  },
}));

export function AppCard({ children, ...props }: PaperProps) {
  return (
    <StyledPaper elevation={0} {...props}>
      {children}
    </StyledPaper>
  );
}