export const schema = gql`
  type Item {
    id: Int!
    createdAt: DateTime!
    title: String!
    url: String!
    FeedItemParticipant: [FeedItemParticipant]
    feedId: Int!
    feed: Feed!
    _feedTitle: String!
    _feedId: Int!
    _participants: [ItemParticipants]!
  }

  type ItemParticipants {
    name: String!
    id: Int!
  }
  type PublicFeed {
    name: String!
  }

  type Items {
    results: [Item!]!
    count: Int!
    take: Int!
    skip: Int!
    q: String
  }

  type Query {
    searchPublicItems(
      filter: String
      skip: Int
      take: Int
      orderBy: OrderByInput
      q: String
    ): Items @skipAuth
  }

  input CreateItemInput {
    title: String!
    url: String!
    feedId: Int
  }

  type Mutation {
    createPublicItem(input: CreateItemInput!): Item! @skipAuth
  }
`
