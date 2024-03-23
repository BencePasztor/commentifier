import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { FetchCursor } from '../types'

export interface PostsState {
  cursor: FetchCursor
}

const initialState: PostsState = {
  cursor: null
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPostsCursor: (state, action: PayloadAction<FetchCursor>) => {
      state.cursor = action.payload
    }
  }
})

export const { setPostsCursor } = postsSlice.actions

export const { reducer: postsReducer } = postsSlice
