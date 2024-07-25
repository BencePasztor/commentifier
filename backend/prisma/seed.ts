import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import type { User, Comment, Post } from '@prisma/client'
import path from 'path'
import fs from 'fs/promises'
import { hashPassword } from '../src/utils/password'

const prisma = new PrismaClient()

async function main() {
  // Create Users
  const users: User[] = []

  // Test User
  await prisma.user.create({
    data: {
      email: 'test@test.com',
      username: 'TestUser',
      password: await hashPassword('testpassword')
    }
  })

  // Random Users
  for (let i = 0; i < 30; i++) {
    const user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: await hashPassword(faker.internet.password())
      }
    })
    users.push(user)
  }

  // Create Posts
  const posts: Post[] = []
  for (let i = 0; i < 20; i++) {
    const post = await prisma.post.create({
      data: {
        sourceUrl: faker.internet.url(),
        title: faker.lorem.sentence(),
        slug: faker.lorem.slug(),
        description: faker.lorem.paragraph(),
        image: await getRandomPostImage(),
        createdBy: users[faker.number.int({ min: 0, max: users.length - 1 })].id
      }
    })
    posts.push(post)
  }

  // Create Comments
  const comments: Comment[] = []
  for (let i = 0; i < 50; i++) {
    const comment = await prisma.comment.create({
      data: {
        content: faker.lorem.text(),
        postId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        createdBy: users[faker.number.int({ min: 0, max: users.length - 1 })].id
      }
    })
    comments.push(comment)
  }

  // Create Replies to Comments
  for (let i = 0; i < 30; i++) {
    const reply = await prisma.comment.create({
      data: {
        content: faker.lorem.text(),
        postId: posts[faker.number.int({ min: 0, max: posts.length - 1 })].id,
        parentId:
          comments[faker.number.int({ min: 0, max: comments.length - 1 })].id,
        createdBy: users[faker.number.int({ min: 0, max: users.length - 1 })].id
      }
    })
    comments.push(reply)
  }

  // Create Upvotes
  for (let i = 0; i < users.length; i++) {
    await prisma.upvote.create({
      data: {
        userId: users[i].id,
        commentId:
          comments[faker.number.int({ min: 0, max: comments.length - 1 })].id
      }
    })
  }
}

async function getRandomPostImage() {
  const directoryPath = path.join(__dirname, '..', 'public', 'images', 'seed')
  try {
    const files = await fs.readdir(directoryPath)
    const images = files.filter(
      (file) => path.extname(file).toLowerCase() === '.webp'
    )

    // Select a random image from the array
    const randomImage = images[Math.floor(Math.random() * images.length)]

    // Generate a random filename
    const newFileName = crypto.randomUUID() + '.webp'

    // Copy the selected image to public/posts and give it the new random name
    const sourcePath = path.join(directoryPath, randomImage)
    const destinationPath = path.join(
      __dirname,
      '..',
      'public',
      'images',
      'posts',
      newFileName
    )
    await fs.copyFile(sourcePath, destinationPath)

    // Return the new filename
    return newFileName
  } catch (error) {
    console.error('Error getting post image:', error)
    return null
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
