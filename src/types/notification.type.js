import { gql } from 'apollo-server-express';

export default gql`
  type Notification {
    id: ID!
    message: String!
    read: Boolean
  }

  input CreateNotificationInput {
    userId: ID!,
    message: String!
  }

  extend type Query {
    notifications(userId: ID!): [Notification]
    unReadNotifications(userId: ID!): [Notification]
  }

  extend type Mutation {
    createNotification(input: CreateNotificationInput!): Notification!
    readNotification(id: ID!): Notification!
  }
`;
