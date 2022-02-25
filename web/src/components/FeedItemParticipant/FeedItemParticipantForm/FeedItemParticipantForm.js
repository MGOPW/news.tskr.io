import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

const formatDatetime = (value) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}

const FeedItemParticipantForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.feedItemParticipant?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="feedItemId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Feed item id
        </Label>
        <NumberField
          name="feedItemId"
          defaultValue={props.feedItemParticipant?.feedItemId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="feedItemId" className="rw-field-error" />

        <Label
          name="participantId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Participant id
        </Label>
        <NumberField
          name="participantId"
          defaultValue={props.feedItemParticipant?.participantId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="participantId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default FeedItemParticipantForm
