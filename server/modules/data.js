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

//Returns data for logged in user, returns user_data + profile_data { .., profile_data:{}, desiredData: [], interestData: [] }
const getUserData = async (req) => {
  try {
    const { data, error } = await db
      .from("user_data")
      .select(`* , profile_data(*)`)
      .eq("user_id", req.user.id).maybeSingle();
    if (error || !data) {
      console.error("user_data fetch failed:", error);
      return error ? { error: error.message } : { error: "User data not found" };
    }
    const { data: interestsData, error: interestsError } = await db
      .from("user_interest")
      .select("interest_id")
      .eq("user_id", data.id);

    const { data: desiredData, error: desiredError } = await db
      .from("user_desired")
      .select("interest_id")
      .eq("user_id", data.id);

    if (error) console.error(error);

    const result = {
      ...data,
      interestsData: interestsData ?? [],
      desiredData: desiredData ?? [],
    };
    console.log("Get User Data: ", result);
    return result;
  } catch (err) {
    console.error(err);
  }
};

const getUserProfileData = async (userId) => {
  try {
    const {data, error} = await
      db.from("user_data")
      .select("user_id, name, profile_data(*)")
      .eq("user_id", userId).maybeSingle();
      console.log("CONSOLE LOG OF PROFILE DATA", data);
      if (error) console.error(error);
      return data;
  }
  catch (err) {
    console.error(err);
  }
}
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

const setPaid = async (pay, id) => {
  try {
    const { data, error } = await db.from("profile_data").update(
      {isPaid: pay}
    )
    .eq("user_id", id)
    .select();
    if (error) console.error(error);
    console.log("set paid: ", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const addContact = async (userId, type, info) => {
  try {
    await db.auth.refreshSession();
    const { data: userData, error: userError } = await db
      .from("user_data")
      .select("*, profile_data(id)")
      .eq('user_id', userId)  //This is the auth user id, we need to get the corresponding user_data row to link to profile_data
      .maybeSingle();

    if (userError || !userData) {
      console.error("ERROR FETCHING USER DATA IN ADD CONTACT", userError);
      return;
    }

    const { data, error } = await db
      .from("Contact")
      .upsert({ user: userData.profile_data.id, type: type, info: info }, { onConflict: "user, type" })
      .select();
    
    if (error) console.error(error);
    console.log("add contact data: ", data);
    return data;

  } catch (err) {
    console.error(err);
  }
};

const getContactData = async (userId) => {
  try {
    await db.auth.refreshSession();
    const { data: userData, error: userError } = await db
    .from("user_data")
    .select("*, profile_data(id)")
    .eq("user_id", userId)
    .single();

    if (userError || !userData) {
      console.error("ERROR FETCHING USER DATA IN GET CONTACT DATA", userError);
      return;
    }
    const { data, error } = await db
      .from("Contact")
      .select("type, info")
      .eq("user", userData.profile_data.id);

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
    //console.log("SIGNUPUSER CONSOLE LOG OF DATA", data);
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
        userId: data?.session?.user?.id,
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

const getCurrentUser = async () => {
  try {
    const { data : { user }, error } = await db.auth.getUser();
    if (error) {
      console.error(error);
    }
    return user;
  }catch (err) {
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
    //console.log("ADD USER DATA ROW DATA", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const getAllInterests = async () => {
  try {
    const {data, error} = await db.from("interests").select();
    if (error) console.error(error);
    console.log("GET ALL INTERESTS");
    return data;
  } catch (err) {
    console.error(err);
  }
};

const saveProfileData = async (profileData, userId) => {
  try {
    await db.auth.refreshSession();
    const { data: userData, error: userError } = await db
    .from("user_data")
    .select("*")
    .eq('user_id', userId)  //This is the auth user id, we need to get the corresponding user_data row to link to profile_data
    .single();
    //console.log("USER DATA IN SAVE PROFILE DATA", userData);
    if (userError) {
      console.error("ERROR FETCHING USER DATA IN SAVE PROFILE DATA", userError);
      return;
    }
    const insertData = {
      ...profileData,
      fk_user_data: userData.id,  // Use the id from user_data as the foreign key in profile_data
    };
    delete insertData.ProfilePictureURI; // Remove the ProfilePictureURI field before inserting into the database
    console.log("PROFILE DATA SENT IN SAVE PROFILE DATA", insertData);
    const { data, error } = await db
      .from("profile_data")
      .upsert(insertData, {
        onConflict: "fk_user_data", // must match UNIQUE column
      })
      .select();
    if (error) console.error(error);
    //console.log("SAVE PROFILE DATA", data);
    return data;
  }
    catch (err) {
      console.error(err);
    }
}

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

//Skills
const saveUserInterests = async (interestIds, userId) => {
  try {
    await db.auth.refreshSession();
    const { data: userData, error: userError } = await db
      .from("user_data")
      .select("id, profile_data(*)")
      .eq("user_id", userId)
      .single();

    if (userError) {
      console.error(
        "ERROR FETCHING USER DATA IN SAVE USER INTERESTS",
        userError,
      );
      return;
    }
    console.log("INTEREST IDS?", interestIds);
    const ids = interestIds.map((i) => (typeof i === "object" ? i.id : i));

    const rows = ids.map((id) => ({
      user_id: userData.id,
      interest_id: id,
      profile_id: userData.profile_data.id,
    }));

    // Delete interests that are no longer in the list
    const { error: deleteError } = await db
      .from("user_interest")
      .delete()
      .eq("user_id", userData.id)
      .not("interest_id", "in", `(${interestIds.join(",")})`);

    // Insert new ones (only those that don't already exist)
    const { data, error } = await db
      .from("user_interest")
      .upsert(rows, { onConflict: "user_id,interest_id" })
      .select();

    if (error) console.error(error);
    console.log("SAVE USER SKILLS", data);
    return data;
  } catch (err) {
    console.error(err);
  }
};

const generateMatches = async (req) => {
  try {
    // 1. Get current user's user_data id and profile_data id
    const { data: userData, error: userError } = await db
      .from("user_data")
      .select("id, profile_data(id, Gender, Sexuality)")
      .eq("user_id", req.user.id)
      .single();
 
    if (userError || !userData?.profile_data) {
      console.error("No profile found for user", userError);
      return { message: "No profile found" };
    }
 
    const myUserDataId = userData.id;
    const myProfileId = userData.profile_data.id;
    const myGender = userData.profile_data.Gender;
    const mySexuality = userData.profile_data.Sexuality;
 
    // 2. Get current user's desired skills
    const { data: myDesired, error: desiredError } = await db
      .from("user_desired")
      .select("interest_id")
      .eq("user_id", myUserDataId);
 
    if (desiredError || !myDesired?.length) {
      console.error("No desired skills found", desiredError);
      return { message: "No desired skills set" };
    }
 
    const myDesiredIds = myDesired.map(d => d.interest_id);
 
    // 3. Get all other users' skills, excluding self
    const { data: allUserSkills, error: skillsError } = await db
      .from("user_interest")
      .select("user_id, interest_id")
      .neq("user_id", myUserDataId);
 
    if (skillsError) console.error(skillsError);
 
    // 4. Group skills by user_id
    const skillsByUser = {};
    for (const row of allUserSkills ?? []) {
      if (!skillsByUser[row.user_id]) skillsByUser[row.user_id] = [];
      skillsByUser[row.user_id].push(row.interest_id);
    }
 
    // 5. Get profile_data including gender/sexuality for compatibility check
    const userDataIds = Object.keys(skillsByUser).map(Number);
    const { data: profiles, error: profileError } = await db
      .from("profile_data")
      .select("id, fk_user_data, Gender, Sexuality")
      .in("fk_user_data", userDataIds);
 
    if (profileError) console.error(profileError);
 
    // 6. Score and filter with sexuality compatibility
    const normalize = (s) => s === "Straight" ? "Heterosexual" : s;
    const myNormalizedSexuality = normalize(mySexuality);
 
    const scored = userDataIds
      .map(userDataId => {
        const profile = profiles?.find(p => p.fk_user_data === userDataId);
        if (!profile) return null;
 
        const theirGender = profile.Gender;
        const theirNormalizedSexuality = normalize(profile.Sexuality);
 
        const iLikeTheirGender =
          myNormalizedSexuality === "Bisexual" || myNormalizedSexuality === "Pansexual" ? true
          : myNormalizedSexuality === "Heterosexual" ? myGender !== theirGender
          : myNormalizedSexuality === "Homosexual" ? myGender === theirGender
          : false;
 
        const theyLikeMyGender =
          theirNormalizedSexuality === "Bisexual" || theirNormalizedSexuality === "Pansexual" ? true
          : theirNormalizedSexuality === "Heterosexual" ? theirGender !== myGender
          : theirNormalizedSexuality === "Homosexual" ? theirGender === myGender
          : false;
 
        if (!iLikeTheirGender || !theyLikeMyGender) return null;
 
        const theirSkills = skillsByUser[userDataId] ?? [];
        const overlap = myDesiredIds.filter(id => theirSkills.includes(id)).length;
        const score = Math.round((overlap / myDesiredIds.length) * 100);
 
        return { profileId: profile.id, score };
      })
      .filter(p => p !== null && p.score > 0);
 
    // 7. Delete existing matches
    const { error: deleteError } = await db
      .from("matches")
      .delete()
      .eq("user1", myProfileId);
 
    if (deleteError) console.error("Delete error:", deleteError);
 
    // 8. Insert new matches
    if (scored.length > 0) {
      const { error: insertError } = await db.from("matches").insert(
        scored.map(p => ({
          user1: myProfileId,
          user2: p.profileId,
          match_score: p.score,
        }))
      );
      if (insertError) console.error("Insert error:", insertError);
    }
 
    console.log(`Generated ${scored.length} matches for profile ${myProfileId}`);
    return { message: `${scored.length} matches generated` };
  } catch (err) {
    console.error(err);
    return { message: "Failed to generate matches" };
  }
};

const saveUserDesired = async (interestIds, userId) => {
  try {
    await db.auth.refreshSession();
    const { data: userData, error: userError } = await db
        .from("user_data")
        .select("id")
        .eq("user_id", userId)
        .single();

    if (userError) {
      console.error("ERROR FETCHING USER DATA IN SAVE USER DESIRED", userError);
      return;
    }
    const ids = interestIds.map((i) => (typeof i === "object" ? i.id : i));

    const rows = ids.map((id) => ({
      user_id: userData.id,
      interest_id: id,
    }));

    // Delete interests that are no longer in the list
    const { error: deleteError } = await db
    .from("user_desired")
    .delete()
    .eq("user_id", userData.id)
    .not("interest_id", "in", `(${interestIds.join(",")})`);

    // Insert new ones (only those that don't already exist)
    const { data, error } = await db
    .from("user_desired")
    .upsert(rows, { onConflict: "user_id,interest_id" })
    .select();

    if (error) console.error(error);
    console.log("SAVE USER DESIRED", data);
    return data;
  }
  catch (err) {
    console.error(err);
  }
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

  //console.log("STATS RESULT:", { totalUsers, paidMembers, freeMembers, contactExposedMatches, totalMatches, avgMatchScore, noContactInfo, completeProfiles, totalSkills }); // ← here

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
  getAllInterests,
  getUserData,
  getUserProfileData,
  signUpUser,
  getCurrentUser,
  addUserDataRow,
  loginUser,
  requireAuth,
  signOutUser,
  saveProfileData,
  saveUserInterests,
  saveUserDesired,
  getMatchData,
  generateMatches,
  addMatch,
  addContact,
  getContactData,
  setPaid
};
