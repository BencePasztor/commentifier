import { Request, Response } from 'express'
import prisma from '@/lib/db'
import { StatusCodes } from 'http-status-codes'
import { saveProfileImage } from '@/utils/userUtils'

export const getCurrentUser = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).json({ data: req.user })
}

export const updateProfile = async (req: Request, res: Response) => {
  //Save Profile Image
  let avatar
  if (req.file?.buffer) {
    avatar = await saveProfileImage(req.file.buffer)
  }

  //Update Profile
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
