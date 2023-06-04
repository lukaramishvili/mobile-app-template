import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProfileEditableFields, NotificationSubscription, User } from '../domain/types'
import { RootState } from '../store'
import { getAuthToken } from '../store/tokenStorage'
import { detectUserLanguage } from '../util/lang'

// @ts-ignore
export const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
// export const serverUrl = devMode ? `http://192.168.100.2:3333/api/v1/` : 'https://myfrani.ge/api/v1/' // after deployment, the api is `${same hostname}/api`
const serverHostname = 'https://myfrani.ge'
export const serverUrl = `${serverHostname}/api/v1/` // after deployment, the api is `${same hostname}/api`

export const apiUrl = `${serverUrl}`

export const uploadUrl = (uploadedFile: string) =>
  uploadedFile.startsWith('http')
    ? uploadedFile
    : `${serverHostname}${
        serverHostname.endsWith('/') && uploadedFile.startsWith('/') ? uploadedFile.slice(1) : uploadedFile
      }`

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: async (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const authTokenFromStorage = await getAuthToken()
      const token = (getState() as RootState).auth.token || authTokenFromStorage
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      const lang = detectUserLanguage()
      headers.set('locale', lang)
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<{ user: User; token: string }, { email: string; password: string }>({
      query: (credentials) => ({
        url: 'signin',
        method: 'POST',
        body: credentials,
      }),
    }),
    //logout
    logout: builder.mutation({
      query: (args) => ({
        url: 'signout',
        method: 'POST',
        body: {},
      }),
    }),
    // reset password step one & enter email
    resetPasswordSendEmail: builder.mutation<{ success: boolean }, { email: string }>({
      query: ({ email }) => ({
        url: 'forgot-password',
        method: 'POST',
        body: {
          email,
        },
      }),
    }),
    // reset password step two & send new password and token
    resetPasswordCreateNewPassword: builder.mutation<
      { success: boolean },
      { token: string; password: string; passwordConfirm: string }
    >({
      query: ({ token, password, passwordConfirm }) => ({
        url: `reset-password/${token}`,
        method: 'POST',
        body: {
          password,
          passwordConfirm,
        },
      }),
    }),
    // sign up
    signUp: builder.mutation<
      { user: User; token: string },
      {
        firstName: string
        lastName: string
        firstNameGe?: string
        lastNameGe?: string
        phone: string
        personalNumber: string
        email: string
        password: string
        passwordConfirm: string
        birthday: string
        citizenship: string
        gender: string
        consent: boolean
      }
    >({
      query: (userFields) => ({
        url: 'signup',
        method: 'POST',
        body: userFields,
      }),
    }),
    // profile
    profile: builder.query<User, { token: string }>({
      // token will be added by `prepareHeaders`
      query: ({ token }) => ({
        url: 'profile',
        method: 'GET',
      }),
    }),
    // update profile
    updateProfile: builder.mutation<User, ProfileEditableFields>({
      query: (userFields) => ({
        url: 'profile/personal-info/update',
        method: 'POST',
        body: userFields,
      }),
    }),
    // update password
    updatePassword: builder.mutation<
      { message: string },
      { oldPassword: string; password: string; passwordConfirm: string; smsCode: number }
    >({
      query: (updatePasswordFields) => ({
        url: 'profile/password/update',
        method: 'POST',
        body: updatePasswordFields,
      }),
    }),
    // subscribe notification
    subNotification: builder.mutation<{ success: boolean }, NotificationSubscription>({
      query: (notificationFields) => ({
        url: 'notification-subscription',
        method: 'POST',
        body: notificationFields,
      }),
    }),
    // update notifications
    updateNotifications: builder.mutation<
      User,
      {
        enableWebNotifications: boolean
        enableMobileNotifications: boolean
        enableEmailNotifications: boolean
        lang: string
      }
    >({
      query: (updateNotificationsFields) => ({
        url: 'profile/notifications/update',
        method: 'POST',
        body: updateNotificationsFields,
      }),
    }),
    // get notification list
    getNotificationList: builder.query<Notification[], undefined>({
      query: () => ({
        url: 'profile/notifications',
        method: 'GET',
      }),
    }),
  }),
})

export default api
