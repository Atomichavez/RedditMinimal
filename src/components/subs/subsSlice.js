import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const SubThunk = createAsyncThunk(
  'subs/SubThunk',
  async (lastSubName = null) => {
    const response = await fetch(`https://www.reddit.com/subreddits/popular.json?limit=100&after=${lastSubName}`)
    const json = await response.json()
    const threads = json.data.children.map(thread => {
      return ({
        display_name: thread.data.display_name,
        name: thread.data.name
      })
    })
    return threads
  })

export const subsSlice = createSlice({
  name: 'subs',
  initialState: { 
    subsResponse: [],
    isLoadingSubs: false,
    failedToLoadSubs: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(SubThunk.pending, (state) => {
        state.isLoadingSubs = true
        state.failedToLoadSubs = false
      })
      .addCase(SubThunk.fulfilled, (state, action) => {
        state.isLoadingSubs = false
        state.failedToLoadSubs = false
        console.log(state.subsResponse.concat(action.payload))
        state.subsResponse = action.payload
      })
      .addCase(SubThunk.rejected, (state) => {
        state.failedToLoadSubs = true
        state.isLoadingSubs = false
      })
  }
})

export const selectSubsResponse = (state) => state.subs.subsResponse
export const isLoadingSubs = (state) => state.subs.isLoadingSubs
export const failedToLoadSubs = (state) => state.subs.failedToLoadSubs
export default subsSlice.reducer