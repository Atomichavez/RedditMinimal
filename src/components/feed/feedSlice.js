import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const SearchThunk = createAsyncThunk(
  'feed/SearchThunk',
  async (searchTerm) => {
    const response = await fetch(`https://www.reddit.com/search/.json?q=${searchTerm}`)
    const json = await response.json()
    const threads = json.data.children.map(thread => {
    return {
      id: thread.data.id,
      title: thread.data.title,
      subreddit: thread.data.subreddit,
      author: thread.data.author,
      thumbnail: thread.data.thumbnail,
      created: thread.data.created,
      score: thread.data.score,
      num_comments: thread.data.num_comments
    }
  })
    return threads
  }
)

export const homeThunk = createAsyncThunk(
  'feed/homeThunk',
  async (homePath) => {
    const response = await fetch(`https://www.reddit.com${homePath}`)
    const json = await response.json()
    const threads = json.data.children.map(thread => {
    return {
      id: thread.data.id,
      title: thread.data.title,
      subreddit: thread.data.subreddit,
      author: thread.data.author,
      thumbnail: thread.data.thumbnail,
      created: thread.data.created,
      score: thread.data.score,
      num_comments: thread.data.num_comments
    }
  })
    return threads
  }
)

export const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    feedResponse: '',
    isLoadingSearch: false,
    failedToLoadSearch: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchThunk.pending, (state) => {
        state.isLoadingSearch = true
        state.failedToLoadSearch = false
      })
      .addCase(SearchThunk.fulfilled, (state, action) => {
        state.isLoadingSearch = false
        state.failedToLoadSearch = false
        state.feedResponse = action.payload
      })
      .addCase(SearchThunk.rejected, (state) => {
        state.isLoadingSearch = false
        state.failedToLoadSearch = true
      })
      .addCase(homeThunk.pending, (state) => {
        state.isLoadingSearch = true
        state.failedToLoadSearch = false
      })
      .addCase(homeThunk.fulfilled, (state, action) => {
        state.isLoadingSearch = false
        state.failedToLoadSearch = false
        state.feedResponse = action.payload
      })
      .addCase(homeThunk.rejected, (state) => {
        state.isLoadingSearch = false
        state.failedToLoadSearch = true
      })
  }
})

export const selectFeedResponse = (state) => state.feed.feedResponse
export const isLoadingSearch = (state) => state.feed.isLoadingSearch
export const failedToLoadSearch = (state) => state.feed.failedToLoadSearch
export default feedSlice.reducer