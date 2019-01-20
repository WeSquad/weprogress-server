import { gql } from 'apollo-server-express';

export default gql`
    type Assessment {
      id: ID!
      createdAt: String!
      user: User!
      axes: [AssessmentAxe]
    }

    type AssessmentAxe {
      axe: Axe!
      skills: [AssessmentSkill]
    }

    type AssessmentSkill {
      skill: Skill!
      skillRate: Float!
    }

    type AssessmentRate {
      name: String
      skillsTotal: Float
      skillsCount: Float
      axePourcent: Float
    }

    input CreateAssessmentInput {
      userId: ID!
      axes: [CreateAssessmentAxeInput]
    }

    input CreateAssessmentAxeInput {
      axeId: ID!
      skills: [CreateAssessmentSkillInput]
    }

    input CreateAssessmentSkillInput {
      skillId: ID!
      skillRate: Float!
    }

    extend type Query {
      assessments: [Assessment]
      assessmentsByUser(user: ID!): [Assessment]
      assessment(id: ID!): Assessment
      assessmentRates(id: ID!): [AssessmentRate]
    }

    extend type Mutation {
      createAssessment(input: CreateAssessmentInput!): Assessment!
      deleteAssessment(id: ID!): Assessment!
    }
`;
