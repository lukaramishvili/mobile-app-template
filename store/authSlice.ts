import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '.'
import api from '../api'
import { User } from '../domain/types'
import { getAuthToken, setAuthToken } from './tokenStorage'

export type AuthState = {
  user: User | null
  userLoading: boolean
  token: string | null
  //
  searchKeyword: string
}

// no top level await, so moved token fetching to `prepareHeaders` in `api/index.ts`
// const authTokenFromStorage = await getAuthToken();
const slice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null, //authTokenFromStorage,
    userLoading: false, //!!authTokenFromStorage,
    searchKeyword: '',
  } as unknown as AuthState,
  reducers: {
    setCredentials: (
      // for manually setting logged-in credentials
      state: AuthState,
      { payload: { user, token } }: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = user
      state.userLoading = false
      state.token = token
      setAuthToken(token)
    },
    setSearchKeyword: (
      // for global header search
      state,
      { payload: { searchKeyword } }: PayloadAction<{ searchKeyword: string }>,
    ) => {
      state.searchKeyword = searchKeyword
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        // auto-login after registration
        api.endpoints.signUp.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token
          state.user = payload.user
          state.userLoading = false
          setAuthToken(payload.token)
        },
      )
      .addMatcher(
        // mark user as loading while logging in
        api.endpoints.login.matchPending,
        (state, { payload }) => {
          state.userLoading = true
        },
      )
      .addMatcher(
        // remember token in localStorage after successful login
        api.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.token = payload.token
          state.user = payload.user
          state.userLoading = false
          setAuthToken(payload.token)
        },
      )
      .addMatcher(
        // clear logged-in user and localStorage after logout
        api.endpoints.logout.matchFulfilled,
        (state, { payload }) => {
          state.token = null
          state.user = null
          state.userLoading = false
          setAuthToken('')
        },
      )
      .addMatcher(
        // mark user as loading while logging in
        api.endpoints.profile.matchPending,
        (state, { payload }) => {
          state.userLoading = true
        },
      )
      .addMatcher(
        // set user in redux after auto-login from localStorage.token
        api.endpoints.profile.matchFulfilled,
        (state, { payload }) => {
          state.user = payload
          state.userLoading = false
        },
      )
      .addMatcher(
        // if auto-login (localStorage.token => dispatch(profile)) failed
        api.endpoints.profile.matchRejected,
        (state, { payload }) => {
          state.token = null
          state.user = null
          state.userLoading = false
          setAuthToken('')
        },
      )
  },
})

export const { setCredentials, setSearchKeyword } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
