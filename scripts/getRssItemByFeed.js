// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'
import Parser from 'rss-parser'
export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  let feedId = args._[1]
  if (!feedId) {
    console.error('You need to specify a feed id')
    return
  }
  feedId = parseInt(feedId)
  if (isNaN(feedId)) {
    console.log('idOrFeed is not a number', args._[1])
    return
  }
  let DbFeed = await db.feed.findUnique({
    where: { id: feedId },
  })
  console.log(DbFeed)
  let parser = new Parser({
    requestOptions: {
      rejectUnauthorized: false,
    },
  })
  let feed = await parser.parseURL(DbFeed.rssUrl)
  console.log(feed.title)
  let upsertedItems = []
  for (let item of feed.items) {
    console.log(item)
    let feedItem = {
      url: item?.link || item?.enclosure?.url,
      title: item.title,
      createdAt: item.isoDate,
      feed: {
        connect: {
          id: feedId,
        },
      },
      // FeedItemParticipant: {
      //   create: {
      //     participant: {
      //       createOrConnect: {
      //         name: item?.creator || item?.['dc:creator'] || item?.author,
      //       },
      //     },
      //   },
      // },
    }

    upsertedItems.push(
      await db.feedItem.upsert({
        select: { id: true },
        where: { url: feedItem.url },
        create: feedItem,
        update: feedItem,
      })
    )
    // find participants for those things;
    //find the participant...
    let participantName =
      args._[2] || item?.creator || item?.['dc:creator'] || item?.author
    console.log('looking for participant with name', participantName)
    if (!participantName) {
      console.log('no participant name of ', participantName)
    }
    if (participantName) {
      let participant = await db.participant.findUnique({
        where: { name: participantName },
      })
      if (!participant && participantName) {
        participant = await db.participant.create({
          data: { name: participantName },
        })
      }
      if (participant) {
        try {
          console.log(
            upsertedItems[upsertedItems.length - 1].id,
            `found participant ${participant?.name}(${participant?.id})`
          )
          await db.feedItemParticipant.create({
            data: {
              feedItemId: upsertedItems[upsertedItems.length - 1].id,
              participantId: participant.id,
            },
          })
        } catch (error) {
          console.log('participant already associated to feed item')
        }
      }
    }
  }
  console.log('upsertedItem', upsertedItems)
}
