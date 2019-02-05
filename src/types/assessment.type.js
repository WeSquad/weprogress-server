import { gql } from 'apollo-server-express';

export default gql`
    scalar Date
    scalar BsonID

    type Assessment {
      id: ID!
      createdAt: Date!
      updatedAt: Date
      user: User!
      job: Job!
      axes: [AssessmentAxe]
    }

    type AssessmentAxe {
      axeId: BsonID
      axeName: String!
      skills: [AssessmentSkill]
    }

    type AssessmentSkill {
      skillId: BsonID
      skillName: String!
      skillRate: Float!
      wishes: Wishes
    }

    type Wishes {
      training: Boolean
      interest: Boolean
      noMore: Boolean
    }

    type AssessmentRate {
      name: String
      skillsTotal: Float
      skillsCount: Float
      axePourcent: Float
    }

    input CreateAssessmentInput {
      userId: ID!
      jobId: ID!
      axes: [CreateAssessmentAxeInput]
    }

    input CreateAssessmentAxeInput {
      axeId: ID!
      skills: [CreateAssessmentSkillInput]
    }

    input CreateAssessmentSkillInput {
      skillId: ID!
      skillRate: Float!
      wishes: WishesInput
    }

    input WishesInput {
      training: Boolean
      interest: Boolean
      noMore: Boolean
    }

    extend type Query {
      assessments: [Assessment]
      assessmentsByUser(userId: ID!, limit: Float): [Assessment]
      assessment(id: ID!): Assessment
      assessmentRates(id: ID!): [AssessmentRate]
    }

    extend type Mutation {
      createAssessment(input: CreateAssessmentInput!): Assessment!
      updateAssessment(id: ID!, input:CreateAssessmentInput!): Assessment!
      deleteAssessment(id: ID!): Assessment!
    }
`;
