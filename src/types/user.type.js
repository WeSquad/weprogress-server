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
      fullName: String
      picture: String
      role: Role!
      jobs: [Job]
      mentors: [User]
      mentees: [User]
    }

    type AuthPayload {
      token: String
      user: User
    }

    input CreateUserInput {
      email: String!
      firstName: String
      lastName: String
      jobsIds: [ID]
      mentorsIds: [ID]
      menteesIds: [ID]
    }

    input UpdateUserInput {
      firstName: String
      lastName: String
      jobsIds: [ID]
      mentorsIds: [ID]
      menteesIds: [ID]
    }

    extend type Query {
      users: [User]
      user(id: ID!): User
      me: User
    }

    extend type Mutation {
      createUser(input: CreateUserInput!): User!
      updateUser(id: ID!, input: UpdateUserInput!): User!
      addJobs(id: ID!, jobs: [ID!]!): User!
      removeJobs(id: ID!, jobs: [ID!]!): User!
      setJobs(id: ID!, jobsIds: [ID]): User!
      addMentor(id: ID!, mentorId: ID!): User!
      removeMentor(id: ID!, mentorId: ID!): User!
      glogin(token: String!): AuthPayload
    }
`;
