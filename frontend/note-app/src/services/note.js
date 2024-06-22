import axios from "axios";

const createNote = async ({ title, content, tags, token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post(
      "/notes",
      {
        title,
        content,
        tags,
      },
      config
    );
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

const getNotes = async ({ token }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/notes", config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const editNote = async ({ title, content, tags, token, id }) => {
  try {
    console.log({ title, content, tags, token, id });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/notes/edit/${id}`,
      {
        title,
        content,
        tags,
      },
      config
    );
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

export { createNote, getNotes, editNote };
