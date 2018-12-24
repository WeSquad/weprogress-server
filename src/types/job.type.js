import { gql } from 'apollo-server-hapi';

export default gql`
    type Job {
      id: ID!
      name: String!
      axes: [Axe]
    }

    input JobInput {
      name: String!,
      axesIds: [ID]
    }

    extend type Query {
      jobs: [Job]
      job(id: ID!): Job
    }

    extend type Mutation {
      createJob(input: JobInput!): Job!
      updateJob(id: ID!, input: JobInput!): Job!
      deleteJob(id: ID!): Job!
      addAxes(id: ID!, axes: [ID]!): Job!
      removeAxes(id: ID!, axes: [ID]!): Job!
    }
`;
