import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import fetch from 'node-fetch'
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
  logger.info('Invoked getRssItems function')
  let feeds = await db.feed.findMany({
    select: { id: true, title: true, rssUrl: true },
    where: { active: true },
  })
  feeds.length = 10
  let feedsInMemory = []
  for (let feed of feeds) {
    let body = {
      url: feed.rssUrl,
      id: feed.id,
    }
    let response = await fetch(
      `http://localhost:8910/.netlify/functions/getRssItemByFeed`,
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    )
    let responseJSON = await response.json()
    console.log('responseJSON', responseJSON)
    feedsInMemory.push({
      ...feed,
      response: responseJSON,
    })
  }

  console.log(feeds)
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      data: feedsInMemory,
    }),
  }
}
