export const schema = gql`
  type FeedItem {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    title: String!
    url: String!
    active: Boolean!
    FeedItemParticipant: [FeedItemParticipant]!
    feedId: Int!
    feed: Feed!
  }

  type FeedItems {
    results: [FeedItem!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    feedItems(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): FeedItems! @requireAuth(roles: ["feedItemRead", "admin"])

    feedItem(id: Int!): FeedItem @requireAuth(roles: ["feedItemRead", "admin"])
  }

  input CreateFeedItemInput {
    title: String!
    url: String!
    active: Boolean!
    feedId: Int!
  }

  input UpdateFeedItemInput {
    title: String
    url: String
    active: Boolean
    feedId: Int
  }

  type Mutation {
    createFeedItem(input: CreateFeedItemInput!): FeedItem!
      @requireAuth(roles: ["feedItemCreate", "admin"])
    updateFeedItem(id: Int!, input: UpdateFeedItemInput!): FeedItem!
      @requireAuth(roles: ["feedItemUpdate", "admin"])
    deleteFeedItem(id: Int!): FeedItem!
      @requireAuth(roles: ["feedItemDelete", "admin"])
  }
`
