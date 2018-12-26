import { gql } from 'apollo-server-express';

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
      password: String!
      role: Role!
      job: Job
    }

    type AuthPayload {
      token: String
      user: User
    }

    input CreateUserInput {
      email: String!
      firstName: String
      lastName: String
      role: Role
      jobID: ID
    }

    input UpdateUserInput {
      email: String
      firstName: String
      lastName: String
      role: Role
      jobID: ID
    }

    input RegisterUserInput {
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    }

    extend type Query {
      users: [User]
      user(id: ID!): User
    }

    extend type Mutation {
      createUser(input: CreateUserInput!): User!
      updateUser(id: ID!, input: UpdateUserInput!): User!
      assignJob(id: ID!, jobId: String!): User!
      register(input: RegisterUserInput!): AuthPayload
      login(email: String!, password: String!): AuthPayload
    }
`;
