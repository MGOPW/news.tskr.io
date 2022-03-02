import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/graphql-server'
import {
  executeBeforeCreateRulesV2,
  executeAfterCreateRulesV2,
  executeBeforeReadAllRulesV2,
  executeAfterReadAllRulesV2,
} from 'src/lib/rules'

let table = 'feedItem'

export const createPublicItem = async ({ input }) => {
  try {
    let { data } = await executeBeforeCreateRulesV2({ table, data: input })
    let createdRecord = await db[table].create({ data })

    let { record } = await executeAfterCreateRulesV2({
      table,
      data: createdRecord,
    })

    return { ...record }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const searchPublicItems = async ({ filter, skip, orderBy, q, take }) => {
  try {
    let preferences = context?.currentUser?.preferences
    let _take = (() => {
      let limit =
        take ||
        parseInt(preferences?.['feeditem.pageSize'], 10) ||
        parseInt(preferences?.['pageSize'], 10 || 10) ||
        10
      if (limit > 100) return 100 //return 100 or limit whatever is smaller
      return limit
    })()
    let { where } = await executeBeforeReadAllRulesV2({ table, filter, q })
    console.log(where)
    where = { AND: [{ active: { equals: true } }, ...where] } //nest all queries in an "AND"
    let count = await db[table].count({ where }) //100
    if (!skip) skip = 0
    if (count < skip) skip = count - _take || 0
    if (skip < 0) skip = 0
    let readRecords = await db[table].findMany({
      take: _take || 10,
      where,
      orderBy,
      skip, // if this were 101, return skip-take
      include: {
        FeedItemParticipant: {
          include: { participant: true },
        },
        feed: {
          select: { title: true, feedIcon: true, id: true },
        },
        _count: {
          select: { UpVote: true },
        },
      },
    })
    console.log(readRecords)
    let { records, status } = await executeAfterReadAllRulesV2({
      table,
      data: readRecords,
    })

    return {
      results: records,
      count,
      take: _take,
      skip,
      q: JSON.stringify(where),
    }
  } catch (error) {
    throw new UserInputError(error.message)
  }
}

export const FeedItem = {
  //FeedItemParticipants: (_obj, { root }) =>
  //  db.FeedItem.findUnique({ where: { id: root.id } }).FeedItemParticipant(),
  //feed: async (_obj, { root }) =>
  //  await db.feed.findUnique({ where: { id: root.feedId } }),
}
