import { Stack } from "@mui/material";
import FoodItem from "./FoodItem.jsx";

const FoodItemList = ({ foodItems, updateQuantity, deleteItem, CategoryChip, StyledTextField }) => {
  return (
    <Stack spacing={2} className="scrollable-stack">
      {foodItems.map((item) => (
        <FoodItem
          key={item.id}
          item={item}
          updateQuantity={updateQuantity}
          deleteItem={deleteItem}
          CategoryChip={CategoryChip}
          StyledTextField={StyledTextField}
        />
      ))}
    </Stack>
  );
};

export default FoodItemList;