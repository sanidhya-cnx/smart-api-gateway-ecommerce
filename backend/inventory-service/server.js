require("dotenv").config();

const app = require("./app");
const connectDB = require("./src/config/db");

const PORT = process.env.PORT || 5004;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Inventory Service running on port ${PORT}`);
  });
};

startServer();