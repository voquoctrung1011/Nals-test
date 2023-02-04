import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { ENDPOINT } from "./../../constants/endpoint.constant";
import { REACT_APP_BACK_URL } from "../../constants";
import { IBlogType, IParam } from "../../interfaces";

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

export const FETCH_ALL_BLOG = async (data: IParam) => {
  try {
    return await axios
      .get(`${REACT_APP_BACK_URL}${ENDPOINT.BLOG}`, {
        params: data,
      })
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    throw err;
  }
};

export const FETCH_DETAIL_BLOG = async (id: string | undefined) => {
  try {
    return await axios
      .get(`${REACT_APP_BACK_URL}${ENDPOINT.BLOG}/${id}`)
      .then((res) => {
        return res.data;
      });
  } catch (err) {
    throw err;
  }
};

export const CREATING_BLOG = async (data: IBlogType) => {
  try {
    return await axios
      .post(`${REACT_APP_BACK_URL}${ENDPOINT.BLOG}`, data)
      .then((res) => {
        return res.data;
      });
  } catch (err: any) {
    throw err.response;
  }
};

export const UPDATING_BLOG = async (id: string, data: IBlogType) => {
  try {
    return await axios
      .put(`${REACT_APP_BACK_URL}${ENDPOINT.BLOG}/${id}`, data)
      .then((res) => {
        return res.data;
      });
  } catch (err: any) {
    throw err.response;
  }
};

export const DELETING_BLOG = async (id: string | undefined) => {
  try {
    return await axios
      .delete(`${REACT_APP_BACK_URL}${ENDPOINT.BLOG}/${id}`)
      .then((res) => {
        return res.status;
      });
  } catch (err) {
    throw err;
  }
};
