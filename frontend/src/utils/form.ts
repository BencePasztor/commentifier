import { UseFormSetError, FieldValues, Path } from 'react-hook-form'
import { ErrorResponse } from '@/types'

export const setServerSideErrors = <T extends FieldValues>(
  response: ErrorResponse,
  setError: UseFormSetError<T>
) => {
  if (!response.errors) {
    setError('root', {
      type: 'custom',
      message: response.message ?? 'Unknown error'
    })
    return
  }

  for (const [key, value] of Object.entries(response.errors.fieldErrors)) {
    setError(key as Path<T>, { type: 'custom', message: value[0] })
  }
}
