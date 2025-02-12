const db = require('../models/foodItemModel');

exports.addFoodItem = (req, res) => {
  const { id, name, quantity, category } = req.body;
  const query = 'INSERT INTO food_items (id, name, quantity, category) VALUES (?, ?, ?, ?)';
  db.query(query, [id, name, quantity, category], (err, result) => {
    if (err) {
      console.error('Error inserting food item into MySQL:', err);
      res.status(500);
      return;
    }
    res.status(200).send('Food item added successfully');
  });
};

exports.getFoodItems = (req, res) => {
  const query = 'SELECT * FROM food_items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching food items from MySQL:', err);
      res.status(500);
      return;
    }
    res.json(results);
  });
};