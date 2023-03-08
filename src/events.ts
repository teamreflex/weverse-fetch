import chalk from 'chalk'
import { WeverseClient } from 'weverse'
import prisma from './database'
import { savePost } from './files'
import { success } from './logging'

export function registerEvents(client: WeverseClient): WeverseClient {
  client.on('init', async (ready) => {
    if (ready) {
      success('Client is ready and listening for new events')
      client.listen({ listen: true, interval: 5000 })
    }
  })

  client.on('post', async (post) => {
    // check if artist exists in the database
    const artist = await prisma.artist.findFirst({
      where: {
        weverseId: post.artist.id,
      }
    })

    // skip if the artist doesn't exist
    if (!artist) return

    // check if post exists in the database
    const postExists = await prisma.post.findFirst({
      where: {
        weverseId: String(post.id),
      }
    })

    // do nothing if it does exist
    if (postExists) return

    // skip if the post has any images
    if (post.photos?.length === 0) return

    // log to the database
    await prisma.post.create({
      data: {
        weverseId: String(post.id),
        artistId: artist.id
      }
    })
    success(`New post from ${chalk.bold(artist.group)} ${chalk.bold(artist.name)} saved to database`)

    // save images
    savePost(artist, post)
  })

  return client
}