module.exports = (foodItems, userInput) => `
Hey there! Could you help me come up with some delicious recipes? Here’s what I have in my fridge:
${foodItems.map((item) => item.name).join(", ")}.

Based on these ingredients and the following question from the user:
User's question: "${userInput}"

Please answer in a friendly and natural tone, keep the response concise within 140 words.

Could you provide the recipes in that format? Thanks so much! 😊
`;
