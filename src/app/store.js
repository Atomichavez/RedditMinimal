import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '../components/search/searchSlice';
import feedReducer from '../components/feed/feedSlice'
import subsReducer from '../components/subs/subsSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
    feed: feedReducer,
    subs: subsReducer
  },
});
