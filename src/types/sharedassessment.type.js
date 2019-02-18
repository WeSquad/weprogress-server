import { gql } from 'apollo-server-express';

export default gql`
  type SharedAssessment {
    id: ID!
    from: User!
    to: User!
    assessment: Assessment!
    comments: String
    createdAt: Date!
    updatedAt: Date
  }

  input CreateSharedAssessmentInput {
    fromId: ID!
    toId: ID!
    assessmentId: ID!
    comments: String
  }

  extend type Query {
    sharedAssessmentsTo: [SharedAssessment]
    sharedAssessment(id: ID!): SharedAssessment!
  }

  extend type Mutation {
    createSharedAssessment(input: CreateSharedAssessmentInput!): SharedAssessment!
    updateSharedAssessment(id: ID!, input:CreateSharedAssessmentInput!): SharedAssessment!
    deleteSharedAssessment(id: ID!): SharedAssessment!
  }
`;
