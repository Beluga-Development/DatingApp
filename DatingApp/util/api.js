import { Platform } from "react-native";

const API_IP =
  Platform.OS === "android" ? "http://10.0.2.2" : "http://localhost";
const API_PORT = 9000;

const headers = {
  Accept: "*/*",
  "Content-Type": "application/json",
};

const serverRoute = (route) => `${API_IP}:${API_PORT}/${route}`;

const data = {
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
  getAllUserData: async () => {
    let response = await fetch(serverRoute("user_data"), {
      headers,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    let payload = await response.json();
    return payload;
  },
};

export { data };
