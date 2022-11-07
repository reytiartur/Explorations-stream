import { createSlice } from "@reduxjs/toolkit";
import { categories } from "../data";
import { videos } from "../data";

const initialString = ''

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
            if(state.watchLaterList.some(video => video.id === action.payload.id)) {
                alert('This documentary is already on your watch list!')
            } else {
                state.watchLaterList.push(action.payload)
            }
        },
        reduceVideos: (state, action) => {
            state.showVideos = action.payload;
        },
        searchInput: (state, action) => {
            state.searchVideo = action.payload
        },
        resetSearchInput: (state) => {
            state.searchVideo = initialString;
        }
    }
})


export const { addToList, reduceVideos, searchInput, resetSearchInput } = videosSlice.actions;
export default videosSlice.reducer;