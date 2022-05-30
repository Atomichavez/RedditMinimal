import { createSlice } from '@reduxjs/toolkit'

const searchSlice = createSlice({
  name: 'search',
  initialState:'',
  reducers: {
    searchChange(state, action) {
      return state = action.payload
    }
  }
})

export const { searchChange } = searchSlice.actions
export const searchSelector = state => state.search
export default searchSlice.reducer