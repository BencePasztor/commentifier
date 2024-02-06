import sharp from 'sharp';
import path from 'path';

export const saveProfileImage = async (imageBuffer: Buffer) => {
    try {
        //Generate file name
        const generatedFileName = crypto.randomUUID() + '.webp'

        //Resize, convert and save image
        await sharp(imageBuffer)
            .resize(100, 100)
            .toFile(path.resolve(__dirname, '..', '..', 'public', 'images', 'avatars', generatedFileName))

        //Return path to image
        return `/images/avatars/${generatedFileName}`
    } catch (error) {
        return '/images/avatars/noimage.webp'
    }
}