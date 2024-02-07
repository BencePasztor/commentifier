import multer from 'multer'
import { BadRequestError } from '@/utils/errors'

export const multerProfileMiddleware = multer({
  storage: multer.memoryStorage(),
  fileFilter: (request, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
      return callback(new BadRequestError('Only image types are allowed'))
    }
    callback(null, true)
  },
  limits: {
    fileSize: 5 * 1024 * 1024 //5 megabytes
  }
}).single('avatar')
