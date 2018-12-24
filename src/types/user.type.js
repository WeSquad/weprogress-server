import { gql } from 'apollo-server-hapi';

export default gql`
    enum Role {
      admin
      user
    }

    type User {
      id: ID!
      email: String!
      firstName: String
      lastName: String
      role: Role!
      job: Job
    }

    input CreateUserInput {
      email: String!
      firstName: String
      lastName: String
      role: Role!
      jobID: ID
    }

    input UpdateUserInput {
      email: String
      firstName: String
      lastName: String
      role: Role
      jobID: ID
    }

    extend type Query {
      users: [User]
      user(id: ID!): User
    }

    extend type Mutation {
      createUser(input: CreateUserInput): User!
      updateUser(id: ID!, input: UpdateUserInput!): User!
      assignJob(id: ID!, jobId: String!): User!
    }
`;
