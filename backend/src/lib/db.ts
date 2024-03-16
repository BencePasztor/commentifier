import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient().$extends({
    result: {
        post: {
            imageSource: {
                needs: { image: true },
                compute(post) {
                    return `${process.env.BASE_URL}/images/posts/${post.image ?? 'noimage.webp'}`
                }
            }
        },
        user: {
            avatarSource: {
                needs: { avatar: true },
                compute(user) {
                    return `${process.env.BASE_URL}/images/avatars/${user.avatar ?? 'noimage.webp'}`
                }
            }
        }
    }
})

export default prisma
