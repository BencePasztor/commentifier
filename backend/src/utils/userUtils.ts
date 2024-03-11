import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'

export const saveProfileImage = async (imageBuffer: Buffer) => {
  try {
    // Generate file name
    const generatedFileName = crypto.randomUUID() + '.webp'

    // Resize, convert and save image
    await sharp(imageBuffer)
      .resize(100, 100)
      .toFile(
        path.resolve(
          __dirname,
          '..',
          '..',
          'public',
          'images',
          'avatars',
          generatedFileName
        )
      )

    // Return the filename
    return generatedFileName
  } catch (error) {
    return null
  }
}

export const deleteProfileImage = async (imageFileName: string) => {
  try {
    // Get path to the image file
    const imagePath = path.resolve(
      __dirname,
      '..',
      '..',
      'public',
      'images',
      'avatars',
      imageFileName
    )

    // Delete image
    await fs.unlink(imagePath)

    return true
  } catch (error) {
    return false
  }
}
