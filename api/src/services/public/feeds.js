import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/graphql-server'
import {
  executeBeforeCreateRulesV2,
  executeAfterCreateRulesV2,
  executeBeforeReadAllRulesV2,
  executeAfterReadAllRulesV2,
} from 'src/lib/rules'

let table = 'feed'

export const createPublicFeed = async ({ input }) => {
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

export const searchPublicFeeds = async ({ filter, skip, orderBy, q, take }) => {
  try {
    let preferences = context?.currentUser?.preferences
    let _take = (() => {
      let limit =
        take ||
        parseInt(preferences?.['feed.pageSize'], 10) ||
        parseInt(preferences?.['pageSize'], 10 || 10) ||
        1000
      //if (limit > 100) return 100 //return 100 or limit whatever is smaller
      return limit
    })()
    let { where } = await executeBeforeReadAllRulesV2({ table, filter, q })
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
    })
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

export const Feed = {}
