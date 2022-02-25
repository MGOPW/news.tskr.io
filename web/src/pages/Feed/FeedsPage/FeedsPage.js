import Feeds from 'src/components/Feed/Feeds'
import { Fragment } from 'react'
import { MetaTags } from '@redwoodjs/web'

const FeedsPage = () => {
  return (
    <Fragment>
      <MetaTags
        title={'Feed'}
        description={'Feed'}
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <Feeds />
    </Fragment>
  )
}

export default FeedsPage
