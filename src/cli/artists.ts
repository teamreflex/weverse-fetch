import chalk from "chalk"
import { buildClient } from "../auth"
import prisma from "../database"
import { error, success, warning } from "../logging"

export const addArtist = async (id: number, group: string, name: string, path: string) => {
  await prisma.artist.create({
    data: {
      weverseId: Number(id),
      group,
      name,
      path
    }
  })

  success(`Added ${chalk.bold(group)} ${chalk.bold(name)} to the database`)
}

export const removeArtist = async (id: number) => {
  const artist = await prisma.artist.findFirst({
    where: {
      id: Number(id)
    }
  })

  if (!artist) {
    error(`Artist with ID ${id} does not exist`)
    return
  }

  await prisma.artist.delete({
    where: {
      id: Number(id)
    }
  })

  success(`Removed ${chalk.bold(artist.group)} ${chalk.bold(artist.name)} from the database`)
}

export const listRemoteArtists = async () => {
  const client = buildClient(true)

  const artists = []
  const communities = await client.getCommunities()
  if (communities === null) {
    error('Failed to fetch communities')
    return
  }

  for (const community of communities) {
    const communityArtists = await client.getCommunityArtists(community)
    if (communityArtists === null) {
      error(`Failed to fetch artists for community ${chalk.bold(community.name)}`)
      return
    }
    artists.push(...communityArtists)
  }

  console.table(artists, ['id', 'groupName', 'name'])
}

export const listLocalArtists = async () => {
  const artists = await prisma.artist.findMany()
  if (artists.length === 0) {
    warning('No artists found in database')
    return
  }

  console.table(artists, ['id', 'weverseId', 'group', 'name', 'path'])
}