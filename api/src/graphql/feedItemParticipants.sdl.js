export const schema = gql`
  type FeedItemParticipant {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    feedItemId: Int!
    feedItem: FeedItem!
    participantId: Int!
    participant: Participant!
  }

  type FeedItemParticipants {
    results: [FeedItemParticipant!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    feedItemParticipants(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): FeedItemParticipants! @skipAuth

    feedItemParticipant(id: Int!): FeedItemParticipant @skipAuth
  }

  input CreateFeedItemParticipantInput {
    feedItemId: Int!
    participantId: Int!
  }

  input UpdateFeedItemParticipantInput {
    feedItemId: Int
    participantId: Int
  }

  type Mutation {
    createFeedItemParticipant(
      input: CreateFeedItemParticipantInput!
    ): FeedItemParticipant!
      @requireAuth(roles: ["feedItemParticipantCreate", "admin"])
    updateFeedItemParticipant(
      id: Int!
      input: UpdateFeedItemParticipantInput!
    ): FeedItemParticipant!
      @requireAuth(roles: ["feedItemParticipantUpdate", "admin"])
    deleteFeedItemParticipant(id: Int!): FeedItemParticipant!
      @requireAuth(roles: ["feedItemParticipantDelete", "admin"])
  }
`
