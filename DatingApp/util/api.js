import {Platform} from "react-native";
import {deleteValue, getValueFor, save} from "./keyStorage";
import db from "./db.js"; //needed for image upload to Supabase Storage, uses ANON-KEY

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

const getUserId = async () => {
  const sessionString = await getValueFor("session");
  const session = JSON.parse(sessionString);
  return session?.userId || null;
};

//Helper for saving images to Supabase Storage needs to be in the client
const uploadProfilePicture = async (uri, userId) => {
  try {
    // 1. Check your supabase client
    //console.log("DB CLIENT:", db);
    
    // 2. List buckets to confirm connection works
    //const { data: buckets, error: bucketError } = await db.storage.listBuckets();
    //console.log("BUCKETS:", buckets, bucketError);

    const fileName = `${userId}-${Date.now()}.jpg`;

    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();

    const { data, error } = await db.storage
      .from("Profile-Pictures")  // double check exact name including capitalisation
      .upload(fileName, arrayBuffer, {
        contentType: "image/jpeg",
        upsert: true,
      });

    //console.log("UPLOAD RESULT:", { data, error });
    // Get public URL
    const { data: urlData } = db.storage
      .from("Profile-Pictures")
      .getPublicUrl(data.path);

    if (error) {
      console.error("UPLOAD ERROR:", error);
      return null;
    }

    return urlData.publicUrl;
  } catch (err) {
    console.error("UPLOAD FAILED:", err);
    return null;
  }
};

const serverRoute = (route) => `${API_IP}:${API_PORT}/${route}`;

const data = {
  
  getProfileContext: async () => {
    const profileDataString = await getValueFor("profileData");
    console.log("getProfileContext called, profileDataString:", profileDataString);
    return JSON.parse(profileDataString);
  },

  getUserData: async () => {
    const token = await getAccessToken();

    let response = await fetch(serverRoute("user_data"), {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let payload = await response.json();
    return payload;
  },

  getMatchData: async () => {
    const token = await getAccessToken();

    let response = await fetch(serverRoute("match_data"), {
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

  generateMatches: async () => {
  const token = await getAccessToken();
  let response = await fetch(serverRoute("generate_matches"), {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
},
  addMatch: async (userA, userB) => {
    const token = await getAccessToken();
    let response = await fetch(
      serverRoute("add_match/" + userA + "/" + userB),
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    let payload = await response.json();
    return payload;
  },

  addContact: async (type, info) => {
    console.log("API addContact called with", { type, info });
    const token = await getAccessToken();
    let response = await fetch(
      serverRoute("add_contact"),
      {
        method: "POST",
        body: JSON.stringify({ type, info }),
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    let payload = await response.json();
    return payload;
  },

  getContactData: async () => {
    const token = await getAccessToken();
    let response = await fetch(serverRoute("contact_data"), {
      method: "GET",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

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
  getStats: async () => {
    const token = await getAccessToken();
    let response = await fetch(serverRoute("get_stats"), {
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


  getCurrentProfileData: async () => {
    let token = await getAccessToken();
    let response = await fetch(serverRoute("user_data"), {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const text = await response.text();
    if (!text) {
      console.log("Empty response from server for getCurrentProfileData (likely means user has no profile data)");
      return null;
    }
    let payload = await JSON.parse(text);
    //console.log("profile data payload:", payload);
    if(payload?.profile_data !== null && payload?.profile_data !== undefined){
      //Saves the profile data to the app context for easy access across screens without needing to make multiple API calls. 
      //This is especially useful for the profile screen where we want to display the user's profile data without delay.
      await save("profileData", JSON.stringify(payload));  
    }
    return payload;
  },

  getProfileDataContext: async () => {
    const profileDataString = await getValueFor("profileData");
    console.log("getProfileDataContext called, profileDataString:", profileDataString);
    return JSON.parse(profileDataString);
  },

  saveProfileData: async (profileData) => {
    //console.log("API SAVE PROFILE DATA CALLED WITH", profileData);
    let token = await getAccessToken();
    let userId = await getUserId(); //auth user id
    if(profileData.ProfilePictureURI){
    const isAlreadyUploaded = profileData.ProfilePictureURI?.startsWith("https://");
    let imagePath = isAlreadyUploaded
      ? profileData.ProfilePictureURI
      : await uploadProfilePicture(profileData.ProfilePictureURI, userId);

    profileData.ProfilePicture = imagePath; // Update the profile data with the image path returned from the upload
    }
    else{
      profileData.ProfilePicture = null; // Handle case where no profile picture is provided
    }
    //console.log("API SAVE PROFILE DATA AFTER UPLOAD", profileData);
    let response = await fetch(serverRoute("profile_data"), {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(profileData),
    });
    let payload = await response.json();
    return payload;
  },

  saveUserInterests: async (interestIds) => {
    let token = await getAccessToken();
    let response = await fetch(serverRoute("user_interests"), {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify({ interests: interestIds }),
    });
    const text = await response.text();
    if (!text) {
      console.log("Empty response from server for saveUserInterests (likely means it updated nothing)");
      return payload;
    }
    let payload = await JSON.parse(text);
    return payload;
  },
  saveUserDesired: async (desiredIds) => {
    let token = await getAccessToken();
    let response = await fetch(serverRoute("user_desired"), {
      headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ desired: desiredIds }),
      });
    const text = await response.text();
    if (!text) {
      console.log("Empty response from server for saveUserDesired (likely means it updated nothing)");
      return payload;
    }
    let payload = await JSON.parse(text);
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
    await deleteValue("profileData");
    await deleteValue("skills");
    await deleteValue("desired");
    return result;
  },
};

export { data, auth, getAccessToken };
