import FeedItems from 'src/components/FeedItem/FeedItems'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

const FeedItemsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'FeedItem'}
        description={'FeedItem'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FeedItems />
    </Fragment>
  )
}

export default FeedItemsPage
