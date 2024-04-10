import { useForm, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export const useZodForm = <T extends z.ZodTypeAny>(
  schema: T,
  options: Omit<UseFormProps<T>, 'resolver'> = {}
) => {
  return useForm<z.infer<typeof schema>>({
    ...options,
    resolver: zodResolver(schema)
  })
}
