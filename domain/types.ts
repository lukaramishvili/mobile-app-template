//
export type EnabledLanguage = 'ge' | 'en'
export const supportedLocales: EnabledLanguage[] = ['ge', 'en']
export const isSupportedLanguage = (lang: string | null) => lang && supportedLocales.some((l) => l === lang)

export type TranslationsField<TFields> = Partial<Record<EnabledLanguage, Partial<TFields> | undefined>>

export type User = {
  id: number
  firstName: string
  lastName: string
  birthday: string
  email: string
  phone: string
  avatar?: any
  settings: { locale: string }
  enableWebNotifications: boolean
  enableMobileNotifications: boolean
  enableEmailNotifications: boolean
  createdAt: string
  updatedAt: string
  // roles: Role[]
}
export type ProfileEditableFields = Partial<User>

export type NotificationSubscription = {
  userId: number
  device: string
  token: {
    expoToken: string
  }
}
//
export type CreateNotification = {
  notificationType: string
  technical: boolean
  translations: TranslationsField<{
    title: string
    message: string
  }>
}
//
export type NotificationList = {
  id: number
  userId: number
  notificationType: string
  technical: boolean
  translations: TranslationsField<{
    title: string
    message: string
  }>
  readAt: null | Date
  createdAt: Date
  updatedAt: Date
  title: string
  message: string
}
