import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import FormComponent from 'src/components/FormComponent'

const CREATE_FEED_MUTATION = gql`
  mutation CreateFeedMutation($input: CreateFeedInput!) {
    createFeed(input: $input) {
      id
    }
  }
`

const NewFeed = () => {
  const [createFeed, { loading, error }] = useMutation(CREATE_FEED_MUTATION, {
    onCompleted: () => {
      toast.success('Feed created')
      navigate(routes.feeds())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data) => {
    onSave(data)
  }

  const onSave = (input) => {
    const castInput = Object.assign(input, { groupId: parseInt(input.groupId) })
    createFeed({ variables: { input: castInput } })
  }
  const fields = [
    {
      name: 'active',
      prettyName: 'Active',
      type: 'boolean',
      defaultValue: 'true',
    },

    {
      name: 'rssUrl',
      prettyName: 'Rss url',
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
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindgroupIdHereFromFeeds(
          $filter: String
          $skip: Int
          $take: Int
        ) {
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
        title="New Feed"
        description="New Feed form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewFeed
