/* eslint-disable no-console */
const dotenv = require('dotenv')
dotenv.config()
const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()
import { users, bulkUsers } from './seedFiles/userSeed'
import { groups } from './seedFiles/groupSeed'
import { messages } from './seedFiles/messageSeed'
import { properties } from './seedFiles/propertySeed'
import { feeds } from './seedFiles/feedSeed'
import { items } from './seedFiles/itemsSeed'

async function main() {
  await db.groupRole.deleteMany({})
  for (let group of groups) {
    await db.group.upsert({
      where: { id: group.id },
      update: group,
      create: group,
    })
  }
  //users.map((user) => user?.email)
  await db.user.deleteMany(/*{ where: { email: { in: userEmails } } }*/)
  //await db.user.createMany({ data: bulkUsers })
  for (let user of bulkUsers) {
    await db.user.create({
      data: user,
    })
  }

  for (let user of users) {
    await db.user.create({
      data: user,
    })
  }
  await db.message.deleteMany({})
  for (let message of messages) {
    await db.message.create({
      data: message,
    })
  }
  //for (let property of properties) {
  //  await db.property.create({
  //    data: property,
  //  })
  //}

  // load feeds...
  await db.feed.deleteMany({})
  for (let feed of feeds) {
    await db.feed.create({
      data: {
        rssUrl: feed.url,
        title: feed.title,
        description: feed.title,
        groupId: 1,
      },
    })
  }
  let feedsInMemory = await db.feed.findMany({})
  //items.length = 10
  let index = 0
  for (let item of items) {
    try {
      index++
      console.log('THIS IS THE ' + index)
      let filteredFeed = feedsInMemory.filter((feed) => {
        return feed.title === item.site
      })
      //console.log(item, filteredFeed)
      let computedItem = {
        createdAt: item.date,
        title: item.title,
        url: item.link,
        feedId: filteredFeed[0].id,
      }
      await db.feedItem.upsert({
        select: { url: true },
        where: {
          url: item.link,
        },
        update: computedItem,
        create: computedItem,
      })
    } catch (e) {
      console.log(e)
      console.log(item)
    }
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
