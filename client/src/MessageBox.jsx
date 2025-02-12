import { Box, Typography } from "@mui/material";

const MessageBox = ({ msg }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: msg.role === "user" ? "flex-start" : "flex-end",
        p: 2,
        bgcolor: msg.role === "user" ? "#E0F7FA" : "#F1F8E9",
        borderRadius: "8px",
        maxWidth: "70%",
        alignSelf: msg.role === "user" ? "flex-start" : "flex-end",
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: "bold",
          color: msg.role === "user" ? "#00796b" : "#d32f2f",
          marginRight: "8px",
        }}
      >
        {msg.role === "user" ? "You:" : "GPT:"}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          fontWeight: "normal",
          color: "#000",
          padding: "4px 8px",
          borderRadius: "4px",
        }}
      >
        {msg.content}
      </Typography>
    </Box>
  );
};

export default MessageBox;