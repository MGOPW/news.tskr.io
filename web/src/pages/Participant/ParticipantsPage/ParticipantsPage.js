import Participants from 'src/components/Participant/Participants'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

const ParticipantsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Participant'}
        description={'Participant'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Participants />
    </Fragment>
  )
}

export default ParticipantsPage
