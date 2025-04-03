require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models"); 
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes); 

const PORT = process.env.PORT || 5000;

// Test 
db.sequelize.sync()
  .then(() => {
    console.log("Eureka !!!");
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
