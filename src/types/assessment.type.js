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

    input CreateAssessmentInput {
      userId: ID!
      axes: [CreateAssessmentSkillInput]
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
    }

    extend type Mutation {
      createAssessment(input: CreateAssessmentInput!): Assessment!
      deleteAssessment(id: ID!): Assessment!
    }
`;
