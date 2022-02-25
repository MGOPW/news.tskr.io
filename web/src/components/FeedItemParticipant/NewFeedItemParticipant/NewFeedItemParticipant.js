import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import FormComponent from 'src/components/FormComponent'

const CREATE_FEED_ITEM_PARTICIPANT_MUTATION = gql`
  mutation CreateFeedItemParticipantMutation(
    $input: CreateFeedItemParticipantInput!
  ) {
    createFeedItemParticipant(input: $input) {
      id
    }
  }
`

const NewFeedItemParticipant = () => {
  const [createFeedItemParticipant, { loading, error }] = useMutation(
    CREATE_FEED_ITEM_PARTICIPANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('FeedItemParticipant created')
        navigate(routes.feedItemParticipants())
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
    const castInput = Object.assign(input, {
      feedItemId: parseInt(input.feedItemId),
      participantId: parseInt(input.participantId),
    })
    createFeedItemParticipant({ variables: { input: castInput } })
  }
  const fields = [
    {
      name: 'feedItemId',
      prettyName: 'Feed item',

      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'title',
      value: 'id',
      QUERY: gql`
        query FindfeedItemIdHereFromFeedItemParticipants(
          $filter: String
          $skip: Int
        ) {
          search: feedItems(filter: $filter, skip: $skip) {
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
    {
      name: 'participantId',
      prettyName: 'Participant id',

      required: 'This is required',
      // If this is a reference you probably want this below
      // uncomment and edit below to your needs
      type: 'reference',
      display: 'name',
      value: 'id',
      QUERY: gql`
        query FindparticipantIdHereFromFeedItemParticipants(
          $filter: String
          $skip: Int
        ) {
          search: participants(filter: $filter, skip: $skip) {
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
    update: ['feedItemParticipantUpdate'],
    delete: ['feedItemParticipantDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title="New FeedItemParticipant"
        description="New FeedItemParticipant form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        loading={loading}
        error={error}
        returnLink={routes.feedItemParticipants()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}

export default NewFeedItemParticipant
