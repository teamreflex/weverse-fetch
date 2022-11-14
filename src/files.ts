import { createWriteStream, existsSync, mkdirSync } from "fs"
import { pipeline } from "stream"
import { promisify } from "util"
import retry from "async-retry"
import fetch from "node-fetch"
import { WeversePost } from "weverse/lib/cjs/models"
import { Artist } from "@prisma/client"
import { success } from "./logging"
import chalk from "chalk"

export const savePost = async (artist: Artist, post: WeversePost) => {
  makeFolder(artist.path)

  const urls = post.photos?.map(photo => photo.orgImgUrl) || []

  const result = await Promise.all(urls.map(url => saveImage(url, artist.path)))
  
  success(`Saved ${result.length} images from ${chalk.bold(artist.group)} ${chalk.bold(artist.name)}`)
}

const saveImage = async (url: URL, path: string): Promise<boolean> => {
  const streamPipeline = promisify(pipeline);
  const filePath = `${path}/${url.pathname.split('/').pop()}`

  return await retry(
    async () => {
      const response = await fetch(url.toString());
  
      if (response.body !== null) {
        const result = await streamPipeline(response.body, createWriteStream(filePath));
        return result === undefined
      } else {
        return false
      }
    },
    {
      retries: 3,
    }
  );
}

const makeFolder = (folder: string) => {
  return !existsSync(folder) && mkdirSync(folder, { recursive: true })
}