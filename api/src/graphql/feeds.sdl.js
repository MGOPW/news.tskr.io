export const schema = gql`
  type Feed {
    id: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    active: Boolean!
    rssUrl: String
    title: String!
    feedIcon: String
    description: String!
    imageUrl: String
    groupId: Int!
    group: Group!
    FeedItem: [FeedItem]!
  }

  type Feeds {
    results: [Feed!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    feeds(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Feeds! @requireAuth(roles: ["feedRead", "admin"])

    feed(id: Int!): Feed @skipAuth #@requireAuth(roles: ["feedRead", "admin"])
  }

  input CreateFeedInput {
    active: Boolean!
    rssUrl: String
    title: String!
    description: String!
    imageUrl: String
    groupId: Int!
  }

  input UpdateFeedInput {
    active: Boolean
    rssUrl: String
    title: String
    feedIcon: String
    description: String
    imageUrl: String
    groupId: Int
  }

  type Mutation {
    createFeed(input: CreateFeedInput!): Feed!
      @requireAuth(roles: ["feedCreate", "admin"])
    updateFeed(id: Int!, input: UpdateFeedInput!): Feed!
      @requireAuth(roles: ["feedUpdate", "admin"])
    deleteFeed(id: Int!): Feed! @requireAuth(roles: ["feedDelete", "admin"])
  }
`
