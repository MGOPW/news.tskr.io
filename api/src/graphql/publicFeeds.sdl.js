export const schema = gql`
  type PublicFeed {
    id: Int!
    createdAt: DateTime!
    rssUrl: String
    imageUrl: String
    feedIcon: String
    title: String!
    url: String!
  }

  type PublicFeeds {
    results: [PublicFeed!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    searchPublicFeeds(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): PublicFeeds @skipAuth
  }

  input CreatePublicFeedInput {
    title: String!
    url: String!
  }

  type Mutation {
    createPublicFeed(input: CreatePublicFeedInput!): PublicFeed! @skipAuth
  }
`
