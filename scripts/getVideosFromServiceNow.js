// To access your database
// Append api/* to import from api and web/* to import from web
import { db } from 'api/src/lib/db'
import fetch from 'node-fetch'

export default async ({ args }) => {
  // Your script here...
  console.log(':: Executing script with args ::')
  console.log(args)
  let getArticles = async (start) => {
    if (!start) start = 0
    let end = parseInt(start, 10) + 1000
    let now = new Date().toISOString()
    let url = `https://community.servicenow.com/api/sn_communities/v1/community/contents?last=${end}&stFrom=${start}&before=${now}&forum=&type=57f785863b2b220085f76b4ee3efc449&sort=created&filters=undefined`

    let options = {
      Accept: '*/*',
      'Cache-Control': 'no-cache',
      Host: 'community.servicenow.com',
      Connection: 'keep-alive',
      'cache-control': 'no-cache',
      'content-type': 'application/json; charset=utf-8',
    }
    let response = await fetch(url, options)
    let jsonResults = await response.json()
    for (let article of jsonResults.result.contents) {
      if (article.userAvatarObject.name !== "tracyo'brien") {
        let transformedItem = {
          url: `https://community.servicenow.com/community?id=community_video&sys_id=${article.sys_id}`,
          title: article.title,
          createdAt: new Date(article.published_date).toISOString(),
          feed: {
            connect: {
              id: 1,
            },
          },
        }
        let upsertedItems = await (async () => {
          let item = await db.feedItem.upsert({
            where: { url: transformedItem.url },
            create: transformedItem,
            update: transformedItem,
          })
          let participant = await db.participant.upsert({
            where: { name: article.userAvatarObject.name },
            create: { name: article.userAvatarObject.name },
            update: { name: article.userAvatarObject.name },
          })
          if (participant) {
            try {
              await db.feedItemParticipant.create({
                data: {
                  feedItemId: item.id,
                  participantId: participant.id,
                },
              })
            } catch (e) {
              console.log(e)
            }
          }
          return {
            ...item,
            author: article.userAvatarObject.name,
          }
        })()
        console.log('ui', upsertedItems)
      }
    }
  }
  getArticles(null)
}
