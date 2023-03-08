import { buildClient } from './auth';
import { error, info } from './logging'
import prisma from './database';

async function main() {
  info('Starting weverse-fetch')
  const client = buildClient()
  await client.init({ allPosts: false, allNotifications: false, allMedia: false })
}

main()
  .then(async () => {
    await prisma.$disconnect()
    process.exit(0)
  })
  .catch(async (e) => {
    error(`Disconnected from database due to error: ${e}`)
    await prisma.$disconnect()
    process.exit(1)
  })