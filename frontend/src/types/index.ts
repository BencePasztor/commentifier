export type FlattenedErrors = {
  formErrors: Record<string, string[]>
  fieldErrors: Record<string, string[]>
}

export type ErrorResponse = {
  message?: string
  errors?: FlattenedErrors
}
