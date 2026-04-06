import { Platform } from "react-native";
import { deleteValue, getValueFor, save } from "./keyStorage";

const API_IP =
  Platform.OS === "android" ? "http://10.0.2.2" : "http://localhost";
const API_PORT = 9000;

const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

const getAccessToken = async () => {
  const sessionString = await getValueFor("session");
  const session = JSON.parse(sessionString);
  return session?.access_token || "";
};

const serverRoute = (route) => `${API_IP}:${API_PORT}/${route}`;

const data = {
  getUserData: async () => {
    const token = await getAccessToken();

    let response = await fetch(serverRoute("user_data"), {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let payload = await response.json();
    return payload;
  },
  getAllInterests: async () => {
    let response = await fetch(serverRoute("interests"), {
      headers,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    let payload = await response.json();
    return payload;
  },
  getHelloWorld: async () => {
    let response = await fetch(serverRoute("helloworld"), {
      headers,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    let payload = await response.json();
    return payload;
  },
  getPaidMembers: async () => {
    const token = await getAccessToken();

    let response = await fetch(serverRoute("get_paid_members"), {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let payload = response.json();
    return payload;
  },
  getNonPaidMembers: async () => {
    const token = await getAccessToken();

    let response = await fetch(serverRoute("get_non_paid_members"), {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let payload = response.json();
    return payload;
  },
  getMatchesThatContacted: async () => {
    const token = await getAccessToken();

    let response = await fetch(serverRoute("get_matches_contacted"), {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let payload = response.json();
    return payload;
  },
};

const auth = {
  signUp: async (email, password) => {
    let response = await fetch(serverRoute("sign_up"), {
      headers,
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    let payload = await response.json();
    return payload;
  },
  loginUser: async (email, password) => {
    let response = await fetch(serverRoute("login"), {
      headers,
      method: "POST",
      body: JSON.stringify({ email: email, password: password }),
    });
    let payload = await response.json();
    if (payload?.session?.access_token) {
      await save("session", JSON.stringify(payload.session));
    }
    return payload;
  },
  logout: async () => {
    const token = await getAccessToken();

    let result = await fetch(serverRoute("logout"), {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    await deleteValue("session");
    return result;
  },
};

export { data, auth, getAccessToken };
