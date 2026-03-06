//Business logic here and called in api routes
import db from "./db.js";

const getAllUserData = async () => {
  try {
    const { data, error } = await db.from("user_data").select();
    if (error) console.err(error);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err);
  }
};


export { getAllUserData };
