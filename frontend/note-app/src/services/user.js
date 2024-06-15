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

const login = async ({ email, password }) => {
  try {
    console.log({ email, password });
    const { data } = await axios.get("/users/login", {
      email,
      password,
    });
    console.log({ email, password });
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

export { signin, login };
