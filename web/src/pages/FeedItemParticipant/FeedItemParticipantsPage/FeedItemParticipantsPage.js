import FeedItemParticipants from 'src/components/FeedItemParticipant/FeedItemParticipants'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

const FeedItemParticipantsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'FeedItemParticipant'}
        description={'FeedItemParticipant'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FeedItemParticipants />
    </Fragment>
  )
}

export default FeedItemParticipantsPage
