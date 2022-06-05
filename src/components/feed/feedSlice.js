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
    isLoadingFeed: false,
    failedToLoadFeed: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(SearchThunk.pending, (state) => {
        state.isLoadingFeed = true
        state.failedToLoadFeed = false
      })
      .addCase(SearchThunk.fulfilled, (state, action) => {
        state.isLoadingFeed = false
        state.failedToLoadFeed = false
        state.feedResponse = action.payload
      })
      .addCase(SearchThunk.rejected, (state) => {
        state.isLoadingFeed = false
        state.failedToLoadFeed = true
      })
      .addCase(homeThunk.pending, (state) => {
        state.isLoadingFeed = true
        state.failedToLoadFeed = false
      })
      .addCase(homeThunk.fulfilled, (state, action) => {
        state.isLoadingFeed = false
        state.failedToLoadFeed = false
        state.feedResponse = action.payload
      })
      .addCase(homeThunk.rejected, (state) => {
        state.isLoadingFeed = false
        state.failedToLoadFeed = true
      })
  }
})

export const selectFeedResponse = (state) => state.feed.feedResponse
export const isLoadingFeed = (state) => state.feed.isLoadingFeed
export const failedToLoadFeed = (state) => state.feed.failedToLoadFeed
export default feedSlice.reducer