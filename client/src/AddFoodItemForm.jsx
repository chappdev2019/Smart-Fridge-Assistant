import { Box, Stack, MenuItem, Select, TextField, Button, styled } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
});

const AddButton = styled(Button)({
  borderRadius: '8px',
  padding: '8px 16px',
  backgroundColor: '#1677FF',
  '&:hover': {
    backgroundColor: '#4096FF',
  },
});

const AddFoodItemForm = ({
  newItemName,
  setNewItemName,
  newItemQuantity,
  setNewItemQuantity,
  newItemCategory,
  setNewItemCategory,
  addItem,
}) => {
  return (
    <Stack spacing={2} sx={{ borderRadius: "8px", paddingRight: "25px" }}>
      <StyledTextField
        fullWidth
        placeholder="Food Name"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        size="small"
      />
      <Box sx={{ display: "flex", gap: 2 }}>
        <StyledTextField
          type="number"
          value={newItemQuantity}
          onChange={(e) => setNewItemQuantity(parseInt(e.target.value))}
          size="small"
          sx={{ width: "100px" }}
          inputProps={{ min: 1 }}
        />
        <Select
          value={newItemCategory}
          onChange={(e) => setNewItemCategory(e.target.value)}
          displayEmpty
          size="small"
          sx={{ width: "100px" }}
        >
          <MenuItem value="fruit">Fruit</MenuItem>
          <MenuItem value="vegetable">Vegetable</MenuItem>
          <MenuItem value="dairy">Dairy</MenuItem>
          <MenuItem value="meat">Meat</MenuItem>
          <MenuItem value="other">Other</MenuItem>
        </Select>
        <AddButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={addItem}
          fullWidth
        >
          Add Food
        </AddButton>
      </Box>
    </Stack>
  );
};

export default AddFoodItemForm;