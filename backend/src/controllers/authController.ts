import { type Request, type Response } from 'express'
import {
  authRegisterValidator,
  authPasswordChangeValidator
} from '@/schemas/authSchema'
import prisma from '@/lib/db'
import { hashPassword, comparePasswords } from '@/utils/password'
import { createToken } from '@/utils/token'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthorizedError } from '@/utils/errors'

export const register = async (req: Request, res: Response) => {
  // Validate Data
  const validatedData = authRegisterValidator(req.body)

  // Check the uniqueness of the email and username fields
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email: validatedData.email }, { username: validatedData.username }]
    }
  })

  if (userExists) {
    if (userExists.email === validatedData.email) {
      throw new BadRequestError('This email address is already taken')
    } else if (userExists.username === validatedData.username) {
      throw new BadRequestError('This username is already taken')
    }
  }

  // Hash Password
  validatedData.password = await hashPassword(validatedData.password)

  // Create User
  const user = await prisma.user.create({
    data: validatedData,
    select: {
      id: true,
      email: true
    }
  })

  return res.status(StatusCodes.CREATED).json({ data: user })
}

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  const user = await prisma.user.findFirst({
    select: {
      id: true,
      password: true,
      username: true
    },
    where: {
      email
    }
  })

  if (!user || !(await comparePasswords(password as string, user.password))) {
    throw new UnauthorizedError('Invalid credentials')
  }

  const token = createToken({
    userId: user.id,
    username: user.username
  })

  res.cookie('token', token, {
    httpOnly: true,
    maxAge: parseInt(process.env.TOKEN_EXPIRATION_SECONDS!) * 1000,
    secure: process.env.NODE_ENV === 'production'
  })

  return res.status(StatusCodes.OK).json({ message: 'Login successful' })
}

export const logout = (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  })

  return res.status(StatusCodes.OK).json({ message: 'Logout successful' })
}

export const passwordChange = async (req: Request, res: Response) => {
  // Validate data
  const validatedData = authPasswordChangeValidator(req.body)

  // Compare the old passwords
  const user = await prisma.user.findFirst({
    select: {
      password: true
    },
    where: {
      id: req.user!.userId
    }
  })

  if (
    !user ||
    !(await comparePasswords(validatedData.oldPassword, user.password))
  ) {
    throw new UnauthorizedError('Invalid credentials')
  }

  // Hash new password
  const newPassword = await hashPassword(validatedData.newPassword)

  // Update password
  await prisma.user.update({
    data: {
      password: newPassword
    },
    where: {
      id: req.user!.userId
    }
  })

  return res
    .status(StatusCodes.OK)
    .json({ message: 'Password change successful' })
}

export const getCurrentUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      username: true,
      avatar: true
    },
    where: {
      id: req.user!.userId
    }
  })

  return res.status(StatusCodes.OK).json({ data: user })
}
