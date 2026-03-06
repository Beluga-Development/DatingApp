/* server.js */
import express from "express";
import cors from "cors";
import {
  addUserDataRow,
  getAllUserData,
  loginUser,
  requireAuth,
  signOutUser,
  signUpUser,
} from "./data.js";
// Reads PORT from the OS, the --env-file flag, or defaults to 9000

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// Custom application-level middleware for logging all requests
app.use((req, _res, next) => {
  const timestamp = new Date(Date.now());
  console.warn(
    `[${timestamp.toDateString()} ${timestamp.toTimeString()}] / ${timestamp.toISOString()}`,
  );
  console.log(req.method, req.hostname, req.path);
  console.log("headers:", req.headers);
  console.log("query:", req.query);
  console.log("body:", req.body);
  next();
});

app.get("/helloworld", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/user_data", requireAuth, async (req, res) => {
  let result = await getAllUserData();
  res.json(result);
});

app.post("/sign_up", async (req, res) => {
  const { email, password } = req.body;
  let result = await signUpUser(email, password);
  let rowResult;
  if (result.user) {
    rowResult = await addUserDataRow(result.user.id);
  }
  res.send({
    message: rowResult.id ? "Account created please login" : "Email taken",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let result = await loginUser(email, password);
  res.send(result);
});

app.post("/logout", requireAuth, async (req, res) => {
  const token = req.accessToken;
  await signOutUser(token);
  res.send({ message: "Logged out" });
});

// Start the server listening on PORT, then call the callback (second argument)
const startServer = (port) => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
};
console.log("Completed API setup.");
export { startServer };
