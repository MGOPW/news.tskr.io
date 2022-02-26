import { logger } from 'src/lib/logger'
module.exports = {
  active: true,
  order: 10,
  when: ['after'],
  operation: ['readAll'],
  table: 'feed',
  file: __filename,
  command: async function ({ data }) {
    try {
      // if type is encrypted, delete it from the data
      return await data.map((record) => {
        if (record.title.length > 18) {
          record.title = `${record.title.substr(0, 15)}...`
        }
        return record
      })
    } catch (e) {
      logger.error(e)
    }
    return await { data }
  },
}
