import { Command } from "commander";
import { addArtist, listLocalArtists, listRemoteArtists, removeArtist } from "./cli/artists";

const program = new Command();

program
  .name('npm run cli --')
  .description('CLI for weverse-fetch')
  .version('1.0.0');

// List artists on Weverse
program.command('list-remote')
.description('list artists from groups you currently follow')
.action(listRemoteArtists);

// List artists in database
program.command('list-local')
.description('list artists currently in the database')
.action(listLocalArtists);

// Add artist
program.command('add <id> <group> <name> <path>')
  .description('add an artist to the database')
  .action(addArtist);

// Remove artist
program.command('remove <id>')
  .description('remove an artist from the database')
  .action(removeArtist);

program.parse();