import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const threadThunk =createAsyncThunk(
  'thread/threadThunk',
  async (threadPath) => {
    const response = await fetch(`https://www.reddit.com/${threadPath}`)
    const json = await response.json()
    console.log(json)
    return json
  }
)

export const threadSlicer = createSlice({
  name: 'thread',
  initialState: {
    threadResponse: [],
    isLoadingThread: false,
    failedToLoadThread: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(threadThunk.pending, (state) => {
        state.isLoadingThread = true
        state.failedToLoadThread = false
      })
      .addCase(threadThunk.fulfilled, (state, action) => {
        state.isLoadingThread = false
        state.failedToLoadThread = false
        state.threadResponse = action.payload
      })
      .addCase(threadThunk.rejected, (state) => {
        state.isLoadingThread = false
        state.failedToLoadThread = true
      })
  }
})

export const isLoadingThread = (state) => state.thread.isLoadingThread
export const failedToLoadThread = (state) => state.thread.failedToLoadThread
export const selectThreadResponse = (state) => state.thread.threadResponse
export default threadSlicer.reducer
