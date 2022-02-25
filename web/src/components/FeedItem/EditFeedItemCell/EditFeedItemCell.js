import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
import { Fragment } from 'react'

export const QUERY = gql`
  query EditFeedItemById($id: Int!) {
    feedItem: feedItem(id: $id) {
      id
      createdAt
      updatedAt
      title
      url
      active
      feedId

      feed {
        id
        title
      }
    }
  }
`
const UPDATE_FEED_ITEM_MUTATION = gql`
  mutation UpdateFeedItemMutation($id: Int!, $input: UpdateFeedItemInput!) {
    updateFeedItem(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      title
      url
      active
      feedId
    }
  }
`
export const DELETE_FEED_ITEM_MUTATION = gql`
  mutation DeleteFeedItemMutation($id: Int!) {
    deletedRow: deleteFeedItem(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ feedItem }) => {
  const [updateFeedItem, { loading, error }] = useMutation(
    UPDATE_FEED_ITEM_MUTATION,
    {
      onCompleted: () => {
        toast.success('FeedItem updated')
        navigate(routes.feedItems())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, feedItem.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, { feedId: parseInt(input.feedId) })
    updateFeedItem({ variables: { id, input: castInput } })
  }

  const [deleteFeedItem] = useMutation(DELETE_FEED_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('FeedItem deleted')
      navigate(routes.feedItems())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete FeedItem ' + id + '?')) {
      deleteFeedItem({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'title',
      prettyName: 'Title',
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
      type: 'boolean',
    },

    {
      name: 'feedId',
      prettyName: 'Feed id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditFeedItemById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'title',
      value: 'id',
      defaultValue: feedItem.feedId,
      defaultDisplay: feedItem?.feed?.title,
      QUERY: gql`
        query FindFeedsFromFeedItems($filter: String, $skip: Int) {
          search: feeds(filter: $filter, skip: $skip) {
            count
            take
            skip
            results {
              id
              title
            }
          }
        }
      `,
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
        title={`feedItem.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={feedItem}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
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
