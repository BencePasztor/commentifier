import { Input, Label, Button, Error } from '@/components/Form'
import { Avatar } from '@/components/Elements'
import { useAuthState } from '../..'
import { useZodForm } from '@/hooks'
import { ProfileData, profileSchema } from '../../types'
import { SubmitHandler } from 'react-hook-form'
import { useUpdateProfileMutation } from '../../api/authApi'
import { setServerSideErrors } from '@/utils/form'
import { setAvatar } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { ChangeEventHandler, useState } from 'react'
import { SuccessMessage } from './SuccessMessage'

export const ProfileForm = () => {
  const authState = useAuthState()

  // The image src for the avatar
  const [avatarSource, setAvatarSource] = useState<string>(
    authState.user?.avatarSource ?? ''
  )

  const dispatch = useDispatch()
  const [updateProfile, { isLoading, isSuccess }] = useUpdateProfileMutation()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors: formErrors }
  } = useZodForm(profileSchema)

  // Changes the src of the avatar when an image file is chosen
  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const parseResult = profileSchema.safeParse({ avatar: e.target.files })
    if (parseResult.success) {
      setAvatarSource(window.URL.createObjectURL(parseResult.data.avatar))
    }
  }

  const onSubmit: SubmitHandler<ProfileData> = async (data) => {
    try {
      const formData = new FormData()
      formData.append('avatar', data.avatar)
      const response = await updateProfile(formData)

      // Error Handling
      if ('error' in response) {
        const { error } = response
        setServerSideErrors(error, setError)
        return
      }

      // On success, change the avatarSource
      dispatch(setAvatar(response.data.avatarSource))
    } catch (e) {
      setError('root', { type: 'custom', message: 'Unknown error' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Succes message */}
      {isSuccess ? <SuccessMessage /> : null}

      {/* Root error */}
      {formErrors?.root ? (
        <Error className="p-2 my-4 border border-red-500 rounded-lg">
          {formErrors?.root?.message}
        </Error>
      ) : null}
      <div className="my-4">
        <Label htmlFor="avatar">Avatar</Label>
        {authState.isLoggedIn ? (
          <div className="flex justify-center my-4">
            <Avatar
              className="size-24"
              src={avatarSource}
              alt="Your profile picture"
            />
          </div>
        ) : null}
        <Input
          id="avatar"
          type="file"
          {...register('avatar', {
            onChange: onChangeHandler
          })}
          error={formErrors?.avatar?.message}
        />
      </div>
      <Button
        variant="primary"
        className="w-full my-4"
        type="submit"
        loading={isSubmitting || isLoading}
      >
        Save
      </Button>
    </form>
  )
}
