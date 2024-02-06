import sharp from 'sharp';
import path from 'path';

export const savePostImage = async (imageUrl: string) => {
    //Check the validity of the imageUrl
    if (!imageUrl) {
        return '/images/post/noimage.webp'
    }

    try {
        //Fetch Image
        const imageResponse = await fetch(imageUrl)

        //Check Content type (only images are allowed)
        const contentType = imageResponse.headers.get('content-type')
        if (!contentType || !contentType.startsWith('image/')) {
            throw new Error('Invalid Content Type')
        }

        //Generate file name
        const generatedFileName = crypto.randomUUID() + '.webp'

        //Resize, convert and save image
        await sharp(await imageResponse.arrayBuffer())
            .resize(300, 300)
            .toFile(path.resolve(__dirname, '..', 'public', 'images', 'posts', generatedFileName))

        //Return path to image
        return `/images/posts/${generatedFileName}`
    } catch (error) {
        return '/images/post/noimage.webp'
    }
}