import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
import { Fragment } from 'react'

export const QUERY = gql`
  query EditFeedItemParticipantById($id: Int!) {
    feedItemParticipant: feedItemParticipant(id: $id) {
      id
      createdAt
      updatedAt
      feedItemId
      participantId
    }
  }
`
const UPDATE_FEED_ITEM_PARTICIPANT_MUTATION = gql`
  mutation UpdateFeedItemParticipantMutation(
    $id: Int!
    $input: UpdateFeedItemParticipantInput!
  ) {
    updateFeedItemParticipant(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      feedItemId
      participantId
    }
  }
`
export const DELETE_FEED_ITEM_PARTICIPANT_MUTATION = gql`
  mutation DeleteFeedItemParticipantMutation($id: Int!) {
    deletedRow: deleteFeedItemParticipant(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ feedItemParticipant }) => {
  const [updateFeedItemParticipant, { loading, error }] = useMutation(
    UPDATE_FEED_ITEM_PARTICIPANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('FeedItemParticipant updated')
        navigate(routes.feedItemParticipants())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, feedItemParticipant.id)
  }
  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      feedItemId: parseInt(input.feedItemId),
      participantId: parseInt(input.participantId),
    })
    updateFeedItemParticipant({ variables: { id, input: castInput } })
  }

  const [deleteFeedItemParticipant] = useMutation(
    DELETE_FEED_ITEM_PARTICIPANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('FeedItemParticipant deleted')
        navigate(routes.feedItemParticipants())
      },
    }
  )

  const onDelete = (id) => {
    if (
      confirm('Are you sure you want to delete FeedItemParticipant ' + id + '?')
    ) {
      deleteFeedItemParticipant({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'feedItemId',
      prettyName: 'Feed item id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditFeedItemParticipantById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // defaultValue: feeditemparticipant._referencedModelHere_.id,
      // defaultDisplay: feeditemparticipant._referencedModelHere_._displayColumn_,
      // QUERY: gql`
      //   query Find_referencedModelHere_FromFeedItemParticipants(
      //     $filter: String
      //     $skip: Int
      //     $take: Int
      //   ) {
      //     search: _referencedPluralModelHere_(filter: $filter, skip: $skip, take: $take) {
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
    {
      name: 'participantId',
      prettyName: 'Participant id',
      required: 'This is required',
      // If this is a reference you probably want this below
      // update the query above "EditFeedItemParticipantById"
      // to include the referenced data
      // and uncomment and edit below to your needs
      // type: 'reference',
      // display: 'name',
      // value: 'id',
      // defaultValue: feeditemparticipant._referencedModelHere_.id,
      // defaultDisplay: feeditemparticipant._referencedModelHere_._displayColumn_,
      // QUERY: gql`
      //   query Find_referencedModelHere_FromFeedItemParticipants(
      //     $filter: String
      //     $skip: Int
      //     $take: Int
      //   ) {
      //     search: _referencedPluralModelHere_(filter: $filter, skip: $skip, take: $take) {
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
        title={`feedItemParticipant.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={feedItemParticipant}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
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
