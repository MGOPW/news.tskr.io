export const schema = gql`
  type Participant {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    active: Boolean!
    name: String
    FeedItemParticipant: [FeedItemParticipant]!
  }

  type Participants {
    results: [Participant!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    participants(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Participants! @requireAuth(roles: ["participantRead", "admin"])

    participant(id: Int!): Participant
      @requireAuth(roles: ["participantRead", "admin"])
  }

  input CreateParticipantInput {
    active: Boolean!
    name: String
  }

  input UpdateParticipantInput {
    active: Boolean
    name: String
  }

  type Mutation {
    createParticipant(input: CreateParticipantInput!): Participant!
      @requireAuth(roles: ["participantCreate", "admin"])
    updateParticipant(id: Int!, input: UpdateParticipantInput!): Participant!
      @requireAuth(roles: ["participantUpdate", "admin"])
    deleteParticipant(id: Int!): Participant!
      @requireAuth(roles: ["participantDelete", "admin"])
  }
`
