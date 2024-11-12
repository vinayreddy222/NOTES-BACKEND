import env from "./environment/variables.js";
import http from "http";
import app from "./app.js";
import { connectDB } from "./db/db.connect.js";

const server = http.createServer(app);

const PORT = env.PORT;

// server.listen(PORT, () => {
//   console.log(`Server is running on PORT: ${PORT}`);
//   connectDB();
// });

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
  });
});
