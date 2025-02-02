// requires
const { default: mongoose } = require("mongoose");

// connect to DB
const connectToDatabase = async () => {
  if (!process.env.MONGODB_URL) {
    console.error("MONGODB_URL is not defined in the environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      connectTimeoutMS: 5000,
      retryWrites: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error("Database connection error:", err.message || err);
    throw err;
  }
};

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Database connection closed due to application termination");
  process.exit(0);
});

module.exports = { connectToDatabase };
