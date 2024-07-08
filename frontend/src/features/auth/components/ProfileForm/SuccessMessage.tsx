import { Check } from 'lucide-react'

export const SuccessMessage = () => {
  return (
    <div
      className="p-4 my-3 text-sm text-green-800 bg-green-100 rounded-lg"
      role="alert"
    >
      <Check className="inline-block mr-2" size={28} />
      <span>Your profile has been saved successfuly.</span>
    </div>
  )
}
