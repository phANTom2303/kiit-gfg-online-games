const categories = {
  Vegetables: ["carrot", "broccoli", "spinach", "potato", "tomato"],
  Fruits: ["apple", "banana", "grape", "orange", "mango", "papaya"],
  FastFoods: ["burger", "pizza", "fries", "tacos", "hotdog"],
  ProgrammingLanguages: ["java", "c", "ruby", "python", "javascript"],
  Science: ["atom", "cell", "gene", "virus", "quasar"],
  Enviroment: ["forest", "mountain", "river", "desert", "ocean"],
  Country: ["canada", "brazil", "germany", "india", "japan"],
};

function randomWord() {
  const randomCategory = getRandomCategory();
  const words = categories[randomCategory];

  console.log('Selected Category:', randomCategory); 
  console.log('Words in Category:', words); 

  return {
    word: words[Math.floor(Math.random() * words.length)],
    category: randomCategory
  };
}

function getRandomCategory() {
  const categoryKeys = Object.keys(categories);
  return categoryKeys[Math.floor(Math.random() * categoryKeys.length)];
}

export { randomWord, getRandomCategory as randomCategory };
