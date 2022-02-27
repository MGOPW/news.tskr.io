import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
import { Fragment } from 'react'

export const QUERY = gql`
  query EditFeedById($id: Int!) {
    feed: feed(id: $id) {
      id
      createdAt
      updatedAt
      active
      rssUrl
      title
      feedIcon
      description
      imageUrl
      groupId
      group {
        id
        name
      }
    }
  }
`
const UPDATE_FEED_MUTATION = gql`
  mutation UpdateFeedMutation($id: Int!, $input: UpdateFeedInput!) {
    updateFeed(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      active
      rssUrl
      title
      feedIcon
      description
      imageUrl
      groupId
      group {
        id
        name
      }
    }
  }
`
export const DELETE_FEED_MUTATION = gql`
  mutation DeleteFeedMutation($id: Int!) {
    deletedRow: deleteFeed(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ feed }) => {
  const [updateFeed, { loading, error }] = useMutation(UPDATE_FEED_MUTATION, {
    onCompleted: () => {
      toast.success('Feed updated')
      navigate(routes.feeds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    onSave(data, feed.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    updateFeed({ variables: { id, input: castInput } })
  }

  const [deleteFeed] = useMutation(DELETE_FEED_MUTATION, {
    onCompleted: () => {
      toast.success('Feed deleted')
      navigate(routes.feeds())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete Feed ' + id + '?')) {
      deleteFeed({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'active',
      prettyName: 'Active',
      type: 'boolean',
    },

    {
      name: 'rssUrl',
      prettyName: 'Rss url',
    },

    {
      name: 'feedIcon',
      prettyName: 'Feed Icon (Text, Audio, Video)',
    },

    {
      name: 'title',
      prettyName: 'Title',
      required: 'This is required',
    },

    {
      name: 'description',
      prettyName: 'Description',
      required: 'This is required',
    },

    {
      name: 'imageUrl',
      prettyName: 'Image url',
    },

    {
      name: 'groupId',
      prettyName: 'Group id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditFeedById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      defaultValue: feed.group.id,
      defaultDisplay: feed.group.name,
      QUERY: gql`
        query FindGroupFromFeeds($filter: String, $skip: Int, $take: Int) {
          search: groups(filter: $filter, skip: $skip, take: $take) {
            count
            take
            skip
            results {
              id
              name
            }
          }
        }
      `,
    },
  ]

  const roles = {
    update: ['feedUpdate'],
    delete: ['feedDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`feed.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={feed}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.feeds()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
