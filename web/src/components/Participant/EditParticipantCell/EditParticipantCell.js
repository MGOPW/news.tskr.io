import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import FormComponent from 'src/components/FormComponent'
import { useForm } from 'react-hook-form'
import { Fragment } from 'react'

export const QUERY = gql`
  query EditParticipantById($id: Int!) {
    participant: participant(id: $id) {
      id
      createdAt
      updatedAt
      active
      name
    }
  }
`
const UPDATE_PARTICIPANT_MUTATION = gql`
  mutation UpdateParticipantMutation(
    $id: Int!
    $input: UpdateParticipantInput!
  ) {
    updateParticipant(id: $id, input: $input) {
      id
      createdAt
      updatedAt
      active
      name
    }
  }
`
export const DELETE_PARTICIPANT_MUTATION = gql`
  mutation DeleteParticipantMutation($id: Int!) {
    deletedRow: deleteParticipant(id: $id) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
)

export const Success = ({ participant }) => {
  const [updateParticipant, { loading, error }] = useMutation(
    UPDATE_PARTICIPANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Participant updated')
        navigate(routes.participants())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSubmit = (data) => {
    onSave(data, participant.id)
  }
  const onSave = (input, id) => {
    updateParticipant({ variables: { id, input } })
  }

  const [deleteParticipant] = useMutation(DELETE_PARTICIPANT_MUTATION, {
    onCompleted: () => {
      toast.success('Participant deleted')
      navigate(routes.participants())
    },
  })

  const onDelete = (id) => {
    if (confirm('Are you sure you want to delete Participant ' + id + '?')) {
      deleteParticipant({ variables: { id } })
    }
  }
  const fields = [
    {
      name: 'active',
      prettyName: 'Active',
      type: 'boolean',
    },

    {
      name: 'name',
      prettyName: 'Name',
    },
  ]

  const roles = {
    update: ['participantUpdate'],
    delete: ['participantDelete'],
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()
  return (
    <Fragment>
      <MetaTags
        title={`participant.id`}
        description="Replace me with 155 charactes about this page"
      />

      <FormComponent
        record={participant}
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
        onDelete={onDelete}
        loading={loading}
        error={error}
        returnLink={routes.participants()}
        handleSubmit={handleSubmit}
        register={register}
        formState={{ errors, isSubmitting }}
      />
    </Fragment>
  )
}
