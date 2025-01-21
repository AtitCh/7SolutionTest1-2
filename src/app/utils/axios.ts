import axios from "axios";
import { IUser } from "../type/user";

const fetchData = async (): Promise<IUser[]> => {
  try {
    const response = await axios.get("https://dummyjson.com/users");
    return response.data.users;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchData;
