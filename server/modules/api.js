/* server.js */
import express from "express";
import cors from "cors";
import {
  getStats,
  addUserDataRow,
  getAllInterests,
  getUserData,
  loginUser,
  requireAuth,
  saveProfileData,
  saveUserInterests,
  signOutUser,
  signUpUser,
  getMatchData,
  addMatch,
  addContact,
  getContactData,
  getPaidMembers,
  getNonPaidMembers,
  getMatchesThatContacted,

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

app.get("/interests", async (req, res) => {
  let result = await getAllInterests();
  res.send(result);
});

app.post("/sign_up", async (req, res) => {
  const { email, password } = req.body;
  let result = await signUpUser(email, password);

  if (!result?.user) {
    return res.send({ message: "Sign up failed. Please try again later." });
  }

  if (result.user.identities?.length === 0) {
    return res.send({ message: "Email taken" });
  }

  let rowResult = await addUserDataRow(result.user.id);
  res.send({
    message: rowResult?.[0]?.id ? "Account created please login" : "Sign up failed",
  });
});

app.get("/user_data", requireAuth, async (req, res) => {
  let result = await getUserData(req);
  res.send(result);
});

app.post("/match_data", requireAuth, async (req, res) => {
  let result = await getMatchData(req);
  res.send(result);
});

app.post("/contact_data/:id", requireAuth, async (req, res) => {
  const field_key = req.params.id;
  console.log("Field-key", field_key);
  let result = await getContactData(field_key);
  res.send(result || { error: "No profile data found" });
});

app.post("/add_contact/:id/:type/:info", requireAuth, async (req, res) => {
  const field_key1 = req.params.id;
  const field_key2 = req.params.type;
  const field_key3 = req.params.info;
  console.log("Field-key", field_key1);
  let result = await addContact(field_key1, field_key2, field_key3);
  res.send(result);
});

app.post("/add_match/:idA/:idB", requireAuth, async (req, res) => {
  const field_key1 = req.params.idA;
  const field_key2 = req.params.idB;
  console.log("Field-key", field_key1);
  let result = await addMatch(field_key1, field_key2);
  res.send(result);
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

app.post("/get_paid_members", requireAuth, async (req, res) => {
  let result = await getPaidMembers(req);
  res.send(result);
});

app.post("/get_non_paid_members", requireAuth, async (req, res) => {
  let result = await getNonPaidMembers(req);
  res.send(result);
});

app.post("/get_matches_contacted", requireAuth, async (req, res) => {
  let result = await getMatchesThatContacted(req);
  res.send(result || { error: "No profile data found" });
});

app.post("/profile_data", requireAuth, async (req, res) => {
  const profileData = req.body;
  const userId = req.user.id;
  //console.log("CURRENT USERID", user?.id);
  let result = await saveProfileData( profileData, userId );
  //console.log("RESULT OF SAVE PROFILE DATA", result);
  res.send(result);
});

app.post("/user_interests", requireAuth, async (req, res) => {
  const { interests } = req.body;
  const userId = req.user.id;
  let result = await saveUserInterests(interests, userId);
  res.send(result);
});
app.post("/get_stats", requireAuth, async (req, res) => {
  let result = await getStats();
  res.json(result);
});

// Start the server listening on PORT, then call the callback (second argument)
const startServer = (port) => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
};
console.log("Completed API setup.");
export { startServer };
