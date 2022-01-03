const config = {
  env: "development",
  port: 5000 || process.env.PORT,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUrl:"mongodb+srv://admin:admin@cluster0.yh5ld.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    // "mongodb://" +
    // (process.env.IP || "localhost") +
    // ":" +
    // (process.env.MONGO_PORT || "27017") +
    // "/peta",
};

export default config;
