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

    console.log("requireAuth - calling getUser");
    const { data, error } = await db.auth.getUser(token);
    console.log("requireAuth - getUser returned", { error, hasUser: !!data?.user });

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

//Returns data for logged in user, returns user_data + profile_data { profile_data:{} }
const getUserData = async (req) => {
  try {
    const { data, error } = await db
      .from("user_data")
      .select(`* , profile_data(*)`)
      .eq("user_id", req.user.id);

    if (error) console.error(error);
    console.log("Get User Data: ", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// EXAMPLE: MATCH DATA RESULT [
//   {//THIS IS THE MATCH ROW
//     created_at: '2026-03-09T15:11:11+00:00',
//     user1: 210,
//     user2: 126,
//     didContact: true,
//     id: 210,
//     match_score: 100, ORDERED BY SCORE
//     profile_data: { PROFILE DATA FOR MATCH PERSON
//       id: 126,
//       Gender: 'Female',
//       isPaid: false,
//       contact: [Array],
//       LastName: 'Robertson',
//       FirstName: 'Alessia',
//       Sexuality: 'Bisexual',
//       Occupation: 'Flask Developer',
//       created_at: '2026-03-25T02:57:31.471735+00:00',
//       DateOfBirth: '2000-11-05',
//       fk_user_data: 126,
//       user_interest: [Array],
//       ProfilePicture: null
//     }
//   },
//   {
//     created_at: '2026-03-09T15:11:11+00:00',
//     user1: 210,
//     user2: 11,
//     didContact: true,
//     id: 207,
//     match_score: 75,
//     profile_data: {
//       id: 11,
//       Gender: 'Male',
//       isPaid: false,
//       contact: [Array],
//       LastName: 'Harris',
//       FirstName: 'Noah',
//       Sexuality: 'Straight',
//       Occupation: 'Cybersecurity Analyst',
//       created_at: '2026-03-25T02:57:31.471735+00:00',
//       DateOfBirth: '1996-09-18',
//       fk_user_data: 11,
//       user_interest: [Array],
//       ProfilePicture: null
//     }
//   },
//   {
//     created_at: '2026-03-09T15:11:11+00:00',
//     user1: 210,
//     user2: 12,
//     didContact: true,
//     id: 208,
//     match_score: 50,
//     profile_data: {
//       id: 12,
//       Gender: 'Female',
//       isPaid: false,
//       contact: [Array],
//       LastName: 'Carter',
//       FirstName: 'Olivia',
//       Sexuality: 'Bisexual',
//       Occupation: 'Product Manager',
//       created_at: '2026-03-25T02:57:31.471735+00:00',
//       DateOfBirth: '1999-04-12',
//       fk_user_data: 12,
//       user_interest: [Array],
//       ProfilePicture: null
//     }
//   },
//   {
//     created_at: '2026-03-09T15:11:11+00:00',
//     user1: 210,
//     user2: 14,
//     didContact: true,
//     id: 209,
//     match_score: 45,
//     profile_data: {
//       id: 14,
//       Gender: 'Female',
//       isPaid: false,
//       contact: [Array],
//       LastName: 'Martinez',
//       FirstName: 'Ava',
//       Sexuality: 'Straight',
//       Occupation: 'Machine Learning Engineer',
//       created_at: '2026-03-25T02:57:31.471735+00:00',
//       DateOfBirth: '1997-08-09',
//       fk_user_data: 14,
//       user_interest: [Array],
//       ProfilePicture: null
//     }
//   },
//   {
//     created_at: '2026-03-09T15:11:11+00:00',
//     user1: 210,
//     user2: 10,
//     didContact: true,
//     id: 206,
//     match_score: 20,
//     profile_data: {
//       id: 10,
//       Gender: 'Female',
//       isPaid: false,
//       contact: [Array],
//       LastName: 'Williams',
//       FirstName: 'Emma',
//       Sexuality: 'Straight',
//       Occupation: 'UX Designer',
//       created_at: '2026-03-25T02:57:31.471735+00:00',
//       DateOfBirth: '1994-01-30',
//       fk_user_data: 10,
//       user_interest: [Array],
//       ProfilePicture: null
//     }
//   }
// ]
const getMatchData = async (req) => {
  try {
    const getProfileDataId = async () => {
      const { data, error } = await db
        .from("user_data")
        .select("id, profile_data(id)")
        .eq("user_id", req.user.id);
      if (error) console.error(error);
      return data[0].profile_data.id;
    };

    let profileDataId = await getProfileDataId();

    const { data, error } = await db
      .from("matches")
      .select(
        `*, 
        profile_data!matches_user2_fkey(
          *,
          contact:Contact(*),
          user_interest(interests(*))
        )
        `,
      )
      .eq("user1", profileDataId)
      .order("match_score", { ascending: false });

    console.error(error);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const addMatch = async (idA, idB) => {
  try {
    const { data, error } = await db.from("matches").insert([
      { userA: idA, userB: idB },
      { userA: idB, userB: idA },
    ]);

    if (error) console.error(error);
    console.log("add match data: ", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (id, _type, _info) => {
  try {
    const { data, error } = await db
      .from("contact")
      .insert({ user: id, type: _type, info: _info });
    if (error) console.error(error);
    console.log("add contact data: ", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getContactData = async (id) => {
  try {
    const { data, error } = await db
      .from("contact")
      .select("type, info")
      .eq("user", id);

    if (error) console.error(error);
    console.log("get contact data: ", data);
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

const getAllInterests = async () => {
  try {
    const { data, error } = await db.from("interests").select();
    if (error) console.error(error);
    console.log("GET ALL INTERESTS");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getPaidMembers = async (req) => {
  try {
    const { count, error } = await db
        .from("profile_data")
        .select("*", { count: "exact" })
        .eq("isPaid", true);
    if (error) console.error(error);
    return count ?? 0;
  } catch (err) { console.error(err); return 0; }
};

const getNonPaidMembers = async (req) => {
  try {
    const { count, error } = await db
        .from("profile_data")
        .select("*", { count: "exact" })
        .eq("isPaid", false);
    if (error) console.error(error);
    return count ?? 0;
  } catch (err) { console.error(err); return 0; }
};

const getAvgMatchScore = async () => {
  try {
    const { data, error } = await db.from("matches").select("match_score");
    if (error) console.error(error);
    if (!data || data.length === 0) return 0;
    const avg = data.reduce((sum, m) => sum + m.match_score, 0) / data.length;
    return Math.round(avg);
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const getUsersWithNoContact = async () => {
  try {
    const { data: allProfiles, error: e1 } = await db
        .from("profile_data")
        .select("id");
    const { data: contacts, error: e2 } = await db
        .from("Contact")
        .select("user");
    if (e1 || e2) { console.error(e1 || e2); return 0; }
    const withContact = new Set(contacts.map((c) => c.user));
    return allProfiles.filter((p) => !withContact.has(p.id)).length;
  } catch (err) {
    console.error(err);
    return 0;
  }
};

const getMatchesThatContacted = async (req) => {
  try {
    const { count, error } = await db
        .from("matches")
        .select("*", { count: "exact" })
        .eq("didContact", true);
    if (error) console.error(error);
    return count ?? 0;
  } catch (err) { console.error(err); return 0; }
};


const getTotalUsers = async () => {
  try {
    const { count, error } = await db
        .from("profile_data")
        .select("*", { count: "exact", head: true });
    if (error) console.error(error);
    return count ?? 0;
  } catch (err) { console.error(err); return 0; }
};

const getTotalMatches = async () => {
  try {
    const { count, error } = await db
        .from("matches")
        .select("*", { count: "exact", head: true });
    if (error) console.error(error);
    return Math.floor((count ?? 0) / 2);
  } catch (err) { console.error(err); return 0; }
};

const getUsersWithCompleteProfile = async () => {
  try {
    const { count, error } = await db
        .from("profile_data")
        .select("*", { count: "exact", head: true })
        .not("FirstName", "is", null)
        .not("LastName", "is", null)
        .not("DateOfBirth", "is", null)
        .not("Gender", "is", null)
        .not("Occupation", "is", null);
    if (error) console.error(error);
    return count ?? 0;
  } catch (err) { console.error(err); return 0; }
};

const getTotalSkills = async () => {
  try {
    const { count, error } = await db
        .from("interests")
        .select("*", { count: "exact", head: true });
    if (error) console.error(error);
    return count ?? 0;
  } catch (err) { console.error(err); return 0; }
};

const getSkillStats = async () => {
  try {
    const { data, error } = await db
        .from("user_interest")
        .select("interests(name)");
    if (error) console.error(error);
    if (!data || data.length === 0) return { mostCommon: "N/A", mostUnique: "N/A" };

    const counts = {};
    data.forEach((row) => {
      const name = row.interests?.name;
      if (name) counts[name] = (counts[name] || 0) + 1;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return {
      mostCommon: sorted[0]?.[0] ?? "N/A",
      mostUnique: sorted[sorted.length - 1]?.[0] ?? "N/A",
    };
  } catch (err) {
    console.error(err);
    return { mostCommon: "N/A", mostUnique: "N/A" };
  }
};

const getStats = async () => {
  const [
    totalUsers,
    paidMembers,
    freeMembers,
    contactExposedMatches,
    totalMatches,
    avgMatchScore,
    noContactInfo,
    completeProfiles,
    totalSkills,
    skillStats,
  ] = await Promise.all([
    getTotalUsers(),
    getPaidMembers(),
    getNonPaidMembers(),
    getMatchesThatContacted(),
    getTotalMatches(),
    getAvgMatchScore(),
    getUsersWithNoContact(),
    getUsersWithCompleteProfile(),
    getTotalSkills(),
    getSkillStats(),
  ]);

  console.log("STATS RESULT:", { totalUsers, paidMembers, freeMembers, contactExposedMatches, totalMatches, avgMatchScore, noContactInfo, completeProfiles, totalSkills }); // ← here

  return {
    totalUsers,
    paidMembers,
    freeMembers,
    contactExposedMatches,
    totalMatches,
    avgMatchScore,
    noContactInfo,
    completeProfiles,
    totalSkills,
    mostCommonSkill: skillStats.mostCommon,
    mostUniqueSkill: skillStats.mostUnique,
  };
};


export {
  getStats,
  getMatchesThatContacted,
  getNonPaidMembers,
  getPaidMembers,
  getUserData,
  getAllInterests,
  signUpUser,
  addUserDataRow,
  loginUser,
  requireAuth,
  signOutUser,
  getMatchData,
  addMatch,
  addContact,
  getContactData,
};
