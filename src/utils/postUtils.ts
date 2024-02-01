import sharp from 'sharp';
import path from 'path';

export const savePostImage = async (imageUrl: string) => {
    try {
        const imageResponse = await fetch(imageUrl)
        const generatedFileName = crypto.randomUUID() + '.webp'

        await sharp(await imageResponse.arrayBuffer())
            .resize(300, 300)
            .toFile(path.resolve(__dirname, '..', 'public', 'images', 'posts', generatedFileName))

        return `/images/posts/${generatedFileName}`
    } catch (error) {
        console.log(error)
        return '/images/post/noimage.webp'
    }
}

// TODO
export const deletePostImage = () => { }