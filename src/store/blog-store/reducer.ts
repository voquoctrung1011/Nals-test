import { REACT_APP_BACK_URL } from "../../constants";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//state
const slice = createSlice({
  name: "blogStore",
  initialState: {
    blogs: [],
    detailBlog: null,
    modalVisible: {
      data: null,
      open: false,
      type: null,
    },
  },
  reducers: {
    setBlog: (state, action) => {
      state.blogs = action.payload;
      state.detailBlog = null;
    },
    setDetailBlog: (state, action) => {
      state.detailBlog = action.payload;
    },
    setModal: (state, action) => {
      state.modalVisible = action.payload;
    },
  },
});

export default slice.reducer;

//action
export const { setBlog, setDetailBlog, setModal } = slice.actions;

//ASSET
export const FETCH_ALL_BLOG = async (data: any) => {
  try {
    return await axios
      .get(`${REACT_APP_BACK_URL}/blogs`, {
        params: data,
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    throw err;
  }
};

export const CREATING_BLOG = async (data: any) => {
  try {
    return await axios.post(`${REACT_APP_BACK_URL}/blogs`, data).then((res) => {
      return res.data;
    });
  } catch (err: any) {
    throw err.response;
  }
};

export const UPDATING_BLOG = async (id: string, data: any) => {
  try {
    return await axios
      .put(`${REACT_APP_BACK_URL}/blogs/${id}`, data)
      .then((res) => {
        return res.data;
      });
  } catch (err: any) {
    throw err.response;
  }
};

export const DELETING_BLOG = async (id: string) => {
  try {
    return await axios
      .delete(`${REACT_APP_BACK_URL}/blogs/${id}`)
      .then((res) => {
        return res.status;
      });
  } catch (err) {
    throw err;
  }
};
