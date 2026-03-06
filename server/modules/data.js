//Business logic here and called in api routes
import db from "./db.js";

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await db.auth.getUser(token);

    if (error || !data?.user) {
      return res.status(401).json({
        message: "Invalid or expired token",
        error: error?.message ?? null,
      });
    }

    req.user = data.user;
    req.accessToken = token;

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Auth middleware failed",
      error: err.message,
    });
  }
};

const getAllUserData = async () => {
  try {
    const { data, error } = await db.from("user_data").select();
    if (error) console.error(error);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const signUpUser = async (email, passowrd) => {
  try {
    const { data, error } = await db.auth.signUp({
      email: email,
      password: passowrd,
    });
    if (error) console.error(error);
    console.log("SIGNUPUSER CONSOLE LOG OF DATA", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const loginUser = async (email, password) => {
  try {
    const { data, error } = await db.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("LOG LOGIN-USER ERROR", error);
      if (error.code === "email_not_confirmed") {
        return { message: "Confirm email", session: null };
      } else if (error.code === "invalid_credentials") {
        return { message: "Invalid Credentials", session: null };
      }
      return { message: "Login failed", session: null };
    }

    if (!data?.session) {
      return { message: "Login failed", session: null };
    }

    let result = {
      message: data?.session?.access_token ? "Login sucess" : "Login failed",
      session: {
        access_token: data?.session?.access_token || null,
        refresh_token: data?.session?.refresh_token || null,
        expires_in: data?.session?.expires_in || null,
        expires_at: data?.session?.expires_at || null,
        token_type: data?.session?.token_type || null,
      },
    };

    console.log("SIGN-IN-USER CONSOLE LOG OF DATA", result);
    return result;
  } catch (error) {
    console.error("LOGIN-USER ERROR", error);

    return { message: error.message || "Login failed", session: null };
  }
};

const signOutUser = async (accessToken) => {
  try {
    await db.auth.signOut(accessToken);
  } catch (err) {
    console.error(err);
  }
};

const addUserDataRow = async (authUserId) => {
  try {
    const { data, error } = await db
      .from("user_data")
      .insert({ user_id: authUserId })
      .select();
    if (error) console.error(error);
    console.log("ADD USER DATA ROW DATA", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};
export {
  getAllUserData,
  signUpUser,
  addUserDataRow,
  loginUser,
  requireAuth,
  signOutUser,
};
