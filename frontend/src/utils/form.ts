import type { UseFormSetError, FieldValues, Path } from 'react-hook-form'
import type { ErrorResponse } from '@/types'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { SerializedError } from '@reduxjs/toolkit'

/**
 * Function to set server-side errors in a form using react-hook-form.
 * @param error The error object received from the response.
 * @param setError The setError function provided by react-hook-form to set form errors.
 */
export const setServerSideErrors = <T extends FieldValues>(
  error: FetchBaseQueryError | SerializedError,
  setError: UseFormSetError<T>
) => {
  // SerializedError
  if ('message' in error) {
    // Set root error
    setError('root', {
      type: 'custom',
      message: error.message ?? 'Unknown error'
    })
  } else if ('data' in error) {
    // FetchBaseQueryError
    const errorResponse = error.data as ErrorResponse
    if (errorResponse.errors) {
      // Set field errors
      for (const [key, value] of Object.entries(
        errorResponse.errors.fieldErrors
      )) {
        setError(key as Path<T>, { type: 'custom', message: value[0] })
      }
    } else if (errorResponse.message) {
      // Set root error
      setError('root', {
        type: 'custom',
        message: errorResponse.message ?? 'Unknown error'
      })
    }
  }
}
