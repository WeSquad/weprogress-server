import { gql } from 'apollo-server-hapi';

export default gql`
    type Assessment {
      id: ID!
      createdAt: String!
      user: User!
      assessmentSkills: [AssessmentSkill]
    }

    type AssessmentSkill {
      axe: Axe!
      skill: Skill!
      skillRate: Float!
    }

    input CreateAssessmentInput {
      userId: ID!
      assessmentSkills: [CreateAssessmentSkillInput]
    }

    input CreateAssessmentSkillInput {
      axeId: ID!
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
