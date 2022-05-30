import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const sleep = async (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const SearchThunk = createAsyncThunk(
  'feed/SearchThunk',
  async (searchTerm) => {
    await sleep(2500)
    return searchTerm
  }
)

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    response: '',
    isLoadingSearch: false,
    failedToLoadSearch: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchThunk.pending, (state, action) => {
        state.isLoadingSearch = true
        state.failedToLoadSearch = false
      })
      .addCase(SearchThunk.fulfilled, (state, action) => {
        state.isLoadingSearch = false
        state.failedToLoadSearch = false
        state.feed.response = action.payload
      })
      .addCase(SearchThunk.rejected, (state, action) => {
        state.isLoadingSearch = false
        state.failedToLoadSearch = true
      })
  }
})

export const selectResponse = (state) => state.feed.response
export const isLoadingSearch = (state) => state.feed.isLoadingSearch
export const failedToLoadSearch = (state) => state.feed.failedToLoadSearch
export default feedSlice.reducer