import { Box, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const FoodItem = ({ item, updateQuantity, deleteItem, CategoryChip, StyledTextField }) => {
  return (
    <Box
      key={item.id}
      sx={{
        display: "flex",
        alignItems: "center",
        p: 1,
        bgcolor: "#fff",
        borderRadius: "8px",
      }}
    >
      <CategoryChip label={item.category} category={item.category} size="small" />
      <Typography sx={{ ml: 2, flexGrow: 1 }}>{item.name}</Typography>
      <StyledTextField
        type="number"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
        size="small"
        sx={{ width: "60px", mx: 2 }}
        inputProps={{ min: 0 }}
      />
      <IconButton size="small" onClick={() => deleteItem(item.id)}>
        <DeleteIcon fontSize="small" sx={{ color: "#ff4d4f" }} />
      </IconButton>
    </Box>
  );
};

export default FoodItem;