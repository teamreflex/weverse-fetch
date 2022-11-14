# weverse-fetch
Fetch and archive content from Weverse.

## Requirements
- A Weverse account, either email & password or an already generated access token.

## Setup
```bash
$ git clone git@github.com:teamreflex/weverse-fetch.git
$ cd weverse-fetch
$ npm install
$ cp .env.example .env
$ nano .env # Fill in your details here
```

## Running
```bash
$ npm start
```

## CLI
As the bot is database driven, you must add artists to archive to the database via the CLI.

### List Remote Artists
Shows all artists that you follow on Weverse.
```bash
$ npm run cli -- list-remote
┌─────────┬─────┬────────────────┬────────────────┐
│ (index) │ id  │   groupName    │      name      │
├─────────┼─────┼────────────────┼────────────────┤
│    0    │ 61  │ 'Dreamcatcher' │     'JI U'     │
│    1    │ 62  │ 'Dreamcatcher' │     'SU A'     │
│    2    │ 63  │ 'Dreamcatcher' │    'SIYEON'    │
│    3    │ 64  │ 'Dreamcatcher' │   'HANDONG'    │
│    4    │ 65  │ 'Dreamcatcher' │   'YOOHYEON'   │
│    5    │ 66  │ 'Dreamcatcher' │     'DAMI'     │
│    6    │ 67  │ 'Dreamcatcher' │   'GAHYEON'    │
│    7    │ 142 │    'STAYC'     │    'Sumin'     │
│    8    │ 143 │    'STAYC'     │    'Sieun'     │
│    9    │ 144 │    'STAYC'     │     'ISA'      │
│   10    │ 145 │    'STAYC'     │    'Seeun'     │
│   11    │ 146 │    'STAYC'     │     'Yoon'     │
│   12    │ 147 │    'STAYC'     │      'J'       │
│   13    │ 214 │ 'LE SSERAFIM'  │    'SAKURA'    │
│   14    │ 215 │ 'LE SSERAFIM'  │  'KIM GARAM'   │
│   15    │ 216 │ 'LE SSERAFIM'  │ 'HONG EUNCHAE' │
│   16    │ 217 │ 'LE SSERAFIM'  │ 'KIM CHAEWON'  │
│   17    │ 218 │ 'LE SSERAFIM'  │    'KAZUHA'    │
│   18    │ 219 │ 'LE SSERAFIM'  │  'HUH YUNJIN'  │
└─────────┴─────┴────────────────┴────────────────┘
```

### List Local Artists
Shows all artists that you currently have in the database.
```bash
$ npm run cli -- list-local
┌─────────┬────┬───────────┬────────────────┬──────────┬────────────────────────────┐
│ (index) │ id │ weverseId │     group      │   name   │            path            │
├─────────┼────┼───────────┼────────────────┼──────────┼────────────────────────────┤
│    0    │ 1  │    61     │ 'Dreamcatcher' │  'Jiu'   │ 'images/Dreamcatcher/Jiu'  │
│    1    │ 2  │    144    │    'STAYC'     │  'Isa'   │     'images/STAYC/Isa'     │
│    2    │ 3  │    218    │  'LESSERAFIM'  │ 'Kazuha' │ 'images/LESSERAFIM/Kazuha' │
└─────────┴────┴───────────┴────────────────┴──────────┴────────────────────────────┘
```

### Add Artist
Adds an artist to the database to be archived. Must use quotes when using group/name/folders with spaces.
```bash
$ npm run cli -- add <weverseId> <groupName> <artistName> <folder>
$ npm run cli -- add 61 Dreamcatcher Jiu "images/Dreamcatcher/Jiu"
> Added Dreamcatcher Jiu to the database
```

### Remove Artist
Remove the given artist.
```bash
$ npm run cli -- remove <id>
$ npm run cli -- remove 1
> Removed Dreamcatcher Jiu from the database
```