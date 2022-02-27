import { logger } from 'src/lib/logger'
import Parser from 'rss-parser'
/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event, context) => {
  logger.info('Invoked getRssItemByFeed function')
  console.log('event.body', event.body)
  console.log('event.body.url', event.body.url)
  let parser = new Parser()
  let parsedBody = JSON.parse(event.body)
  let result = await (async () => {
    try {
      let feed = await parser.parseURL(parsedBody.url)
      console.log(feed.title)
      let returnArr = []
      feed.items.forEach((item) => {
        console.log(item.title + ':' + item.link)
        returnArr.push({
          feedId: parsedBody.id,
          createdAt: item?.isoDate || new Date(), //new Date(feed.pubDate).toISOString()
          title: item?.title || 'No title',
          url: item?.link,
          creator: item?.creator || item?.['dc:creator'] || item?.author,
          source: { ...item },
        })
      })
      //console.log(feed)
      return returnArr
    } catch (error) {
      console.log('error', error)
    }
  })()
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      data: result,
    }),
  }
}
/**
       *   id                  Int                   @id @default(autoincrement())
  createdAt           DateTime              @default(now())
  updatedAt           DateTime              @updatedAt
  title               String                @default("Undefined")
  url                 String                @unique
  active              Boolean               @default(true)
  FeedItemParticipant FeedItemParticipant[]
  feedId              Int
  feed                Feed                  @relation(fields: [feedId], references: [id], onDelete: Cascade)
       */
