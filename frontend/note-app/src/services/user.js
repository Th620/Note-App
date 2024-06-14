import axios from "axios";

const signin = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post("/users/register", {
      name,
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const login = async ({ name, email, password }) => {
  try {
    const { data } = axios.post("/users/login", {
      name,
      email,
      password,
    });
    console.log(data);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

export { signin };
