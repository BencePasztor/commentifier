import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FetchCursor, PostSearch } from '../types'

export interface PostsState {
  cursor: FetchCursor
  searchState: PostSearch
}

const initialState: PostsState = {
  cursor: null,
  searchState: {
    cursor: null,
    search: ''
  }
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsCursor: (state, action: PayloadAction<FetchCursor>) => {
      state.cursor = action.payload
    },
    clearPostsCursor: (state) => {
      state.cursor = null
    },
    setPostsSearchState: (state, action: PayloadAction<PostSearch>) => {
      state.searchState = action.payload
    },
    clearSearchPostsCursor: (state) => {
      state.searchState.cursor = null
    }
  }
})

export const {
  setPostsCursor,
  setPostsSearchState,
  clearPostsCursor,
  clearSearchPostsCursor
} = postsSlice.actions

export const { reducer: postsReducer } = postsSlice
