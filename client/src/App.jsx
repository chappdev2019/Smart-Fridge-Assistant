import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  CardContent,
  Typography,
  Chip,
  Stack,
  Container,
  Grid,
  styled,
} from "@mui/material";
import axios from "axios";
import "./App.css";
import FoodItemList from "./FoodItemList.jsx";
import AddFoodItemForm from "./AddFoodItemForm.jsx";
import MessageBox from "./MessageBox.jsx";

const CategoryChip = styled(Chip)(({ category }) => {
  const colors = {
    dairy: { bg: "#EEF3FF", text: "#2F54EB" },
    fruit: { bg: "#FFF1F0", text: "#F5222D" },
    vegetable: { bg: "#F6FFED", text: "#52C41A" },
    meat: { bg: "#FFF0F6", text: "#EB2F96" },
    other: { bg: "#F5F5F5", text: "#595959" },
  };
  return {
    backgroundColor: colors[category]?.bg || colors.other.bg,
    color: colors[category]?.text || colors.other.text,
    className: "category-chip",
  };
});

const StyledTextField = styled(TextField)({
  className: "styled-text-field",
});

export default function Component() {
  const [foodItems, setFoodItems] = useState([]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(1);
  const [newItemCategory, setNewItemCategory] = useState("other");
  const [userInput, setUserInput] = useState("");
  const [conversation, setConversation] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/foodItems");
        setFoodItems(response.data);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    fetchFoodItems();
  }, []);

  const fetchRecipes = async () => {
    const newMessage = { role: "user", content: userInput };
    setConversation((prevConversation) => [...prevConversation, newMessage]);
    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        foodItems,
        userInput,
      });

      const gptMessage = {
        role: "Assistant",
        content: response.data,
      };
      console.log(response.data);
      setConversation((prevConversation) => [...prevConversation, gptMessage]);
    } catch (error) {
      console.error("Error fetching recipes from server:", error);
    }
  };

  const addItem = async () => {
    if (newItemName.trim()) {
      const newItem = {
        id: Date.now(),
        name: newItemName,
        quantity: newItemQuantity,
        category: newItemCategory,
      };

      try {
        await axios.post("http://localhost:5000/api/addFoodItem", newItem);
        setFoodItems([...foodItems, newItem]);
        setNewItemName("");
        setNewItemQuantity(1);
        setNewItemCategory("other");
      } catch (error) {
        console.error("Error adding food item:", error);
      }
    }
  };

  const updateQuantity = (id, quantity) => {
    setFoodItems(
      foodItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      )
    );
  };

  const deleteItem = (id) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Smart Fridge Assistant
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Fridge Contents
            </Typography>
            <FoodItemList
              foodItems={foodItems}
              updateQuantity={updateQuantity}
              deleteItem={deleteItem}
              CategoryChip={CategoryChip}
              StyledTextField={StyledTextField}
            />
            <AddFoodItemForm
              newItemName={newItemName}
              setNewItemName={setNewItemName}
              newItemQuantity={newItemQuantity}
              setNewItemQuantity={setNewItemQuantity}
              newItemCategory={newItemCategory}
              setNewItemCategory={setNewItemCategory}
              addItem={addItem}
            />
          </CardContent>
        </Grid>

        <Grid item xs={12} md={6}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Conversation
            </Typography>

            <Stack spacing={2} className="scrollable-stack" sx={{ borderRadius: "8px", paddingLeft: "-50px" }}>
              {conversation.map((msg, index) => (
                <MessageBox key={index} msg={msg} />
              ))}
            </Stack>

            <StyledTextField
              fullWidth
              placeholder="Ask a question..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              size="small"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={fetchRecipes}
              sx={{ mt: 2 }}
            >
              Ask Assistant
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Container>
  );
}