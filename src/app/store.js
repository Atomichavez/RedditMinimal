import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import searchReducer from '../components/search/searchSlice';
import feedReducer from '../components/feed/feedSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    search: searchReducer,
    feed: feedReducer,
  },
});
