import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import FormComponent from 'src/components/FormComponent'

const CREATE_FEED_ITEM_MUTATION = gql`
  mutation CreateFeedItemMutation($input: CreateFeedItemInput!) {
    createFeedItem(input: $input) {
      id
    }
  }
`

const NewFeedItem = () => {
  const [createFeedItem, { loading, error }] = useMutation(
    CREATE_FEED_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('FeedItem created')
        navigate(routes.feedItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data)
  }

  const onSave = (input) => {
    const castInput = Object.assign(input, { feedId: parseInt(input.feedId) })
    createFeedItem({ variables: { input: castInput } })
  }
  const fields = [
    {
      name: 'title',
      prettyName: 'Title',
      defaultValue: 'Undefined',
      required: 'This is required',
    },

    {
      name: 'url',
      prettyName: 'Url',

      required: 'This is required',
    },

    {
      name: 'active',
      prettyName: 'Active',
      defaultValue: 'true',
      type: 'boolean',
    },

    {
      name: 'feedId',
      prettyName: 'Feed id',

      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // QUERY: gql`
      //   query FindfeedIdHereFromFeedItems(
      //     $filter: String
      //     $skip: Int
      //   ) {
      //     search: removethisdot.referencedPluralModelHere(filter: $filter, skip: $skip) {
      //       count
      //       take
      //       skip
      //       results {
      //         id
      //         name
      //       }
      //     }
      //   }
      // `,
    },
  ]

  const roles = {
    update: ['feedItemUpdate'],
    delete: ['feedItemDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="New FeedItem"
        description="New FeedItem form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.feedItems()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewFeedItem
