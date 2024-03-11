import { type Request, type Response } from 'express'
import prisma from '@/lib/db'
import { StatusCodes } from 'http-status-codes'
import { saveProfileImage, deleteProfileImage } from '@/utils/userUtils'
import { NotFoundError } from '@/utils/errors'

export const updateProfile = async (req: Request, res: Response) => {
  // Get previous avatar
  const user = await prisma.user.findUnique({
    select: {
      avatar: true
    },
    where: {
      id: req.user!.userId
    }
  })

  if (!user) {
    throw new NotFoundError('User not found')
  }

  // Save Profile Image
  let avatar = null
  if (req.file?.buffer) {
    avatar = await saveProfileImage(req.file.buffer)
  }

  // Delete previous avatar
  if (avatar && user.avatar) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    deleteProfileImage(user.avatar)
  }

  // Update Profile
  await prisma.user.update({
    data: {
      avatar
    },
    where: {
      id: req.user!.userId
    }
  })

  res.status(StatusCodes.OK).send({ message: 'Profile changed' })
}
