import { FormEvent, useRef } from 'react'
import { Input, Button } from '@/components/Form'

interface SearchFormProps {
  handleSubmit: (query: string) => void
  value?: string
}

const SearchForm = ({ handleSubmit, value = '' }: SearchFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (inputRef.current) {
      handleSubmit(inputRef.current.value)
    }
  }

  return (
    <div className="mt-2 mb-4">
      <form onSubmit={onSubmit}>
        <div className="flex items-end justify-center max-w-sm gap-2 mx-auto">
          <Input
            ref={inputRef}
            defaultValue={value}
            name="query"
            placeholder="Search for posts"
          />
          <Button variant="primary" type="submit">
            Search
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SearchForm
