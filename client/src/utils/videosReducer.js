import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../data";
import { videos } from "../data";

const initialString = '';

export const videosSlice = createSlice({
    name: 'videos',
    initialState: {
        videoList: videos,
        showVideos: videos,
        videoCategories: categories,
        watchLaterList: [],
        searchVideo: initialString,
    },
    reducers: {
        addToList: (state, action) => {
            state.watchLaterList.push(action.payload)
        },
        deleteFromList: (state, action) => {
            state.watchLaterList = state.watchLaterList.filter(video => video.id !== action.payload);
        },
        reduceVideos: (state, action) => {
            state.showVideos = action.payload;
        },
        searchInput: (state, action) => {
            state.searchVideo = action.payload;
        },
        resetSearchInput: (state) => {
            state.searchVideo = initialString;
        },
        setCategory: (state, action) => {
            state.showVideos = state.videoList.filter(video => video.category.includes(action.payload));
        },
        reduceToWatchList: (state) => {
            state.showVideos = state.videoList.filter(video => state.watchLaterList.some(list => list.id === video.id))
        }
    }
})


export const { addToList, deleteFromList, reduceVideos, searchInput, resetSearchInput, setCategory, reduceToWatchList } = videosSlice.actions;
export default videosSlice.reducer;