import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import FormComponent from 'src/components/FormComponent'

const CREATE_PARTICIPANT_MUTATION = gql`
  mutation CreateParticipantMutation($input: CreateParticipantInput!) {
    createParticipant(input: $input) {
      id
    }
  }
`

const NewParticipant = () => {
  const [createParticipant, { loading, error }] = useMutation(
    CREATE_PARTICIPANT_MUTATION,
    {
      onCompleted: () => {
        toast.success('Participant created')
        navigate(routes.participants())
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
    createParticipant({ variables: { input } })
  }
  const fields = [
    {
      name: 'active',
      prettyName: 'Active',
      defaultValue: 'true',
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
        title="New Participant"
        description="New Participant form"
        /* you should un-comment description and add a unique description, 155 characters or less
      You can look at this documentation for best practices : https://developers.google.com/search/docs/advanced/appearance/good-titles-snippets */
      />

      <FormComponent
        fields={fields}
        roles={roles}
        onSubmit={onSubmit}
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

export default NewParticipant
