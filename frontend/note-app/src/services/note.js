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
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const pinNote = async ({ isPinned, token, id }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(
      `/notes/pin/${id}`,
      {
        isPinned,
      },
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

const deleteNote = async ({ token, id }) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/notes/delete/${id}`, config);
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

export { createNote, getNotes, editNote, pinNote, deleteNote };
