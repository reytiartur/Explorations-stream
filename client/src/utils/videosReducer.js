import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { categories } from "../data";

const VIDEOS_API = 'https://explorations-stream-hhm8dod6l-reytiartur.vercel.app/api'

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
    try {
        const response = await axios.get(VIDEOS_API)
        return response.data;
    } catch (error) {
        return error.message
    }
})

const initialString = '';

export const videosSlice = createSlice({
    name: 'videos',
    initialState: {
        videoList: [],
        showVideos: [],
        status: 'idle',
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
        },
        reduceToPopular: (state) => {
            const topTen = Math.ceil(state.videoList.length * 0.1)
            state.showVideos = state.videoList.sort((a, b) => a.likes < b.likes ? 1 : -1).slice(0, topTen)
        },
        reduceToLatest: (state) => {
            state.showVideos = state.videoList.filter(video => {
                const diffTime = Math.abs(new Date() - new Date(video.date.replace(/-/g,'/')));
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                if(diffDays < 30) {
                    return true;
                }
            })
            .sort((a, b) => a.date < b.date ? 1 : -1)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.showVideos = action.payload;
                state.videoList = action.payload;
            })
            .addCase(fetchVideos.rejected, (state) => {
                state.status = 'failed'
            })
    }
})


export const { setInitialVideos, addToList, deleteFromList, reduceVideos, searchInput, resetSearchInput, setCategory, reduceToWatchList, reduceToPopular, reduceToLatest } = videosSlice.actions;
export default videosSlice.reducer;