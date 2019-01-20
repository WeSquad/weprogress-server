import { gql } from 'apollo-server-express';

export default gql`
    type Skill {
      id: ID!
      name: String!
      multiplier: Float
      description: String
    }

    input SkillInput {
      name: String!
      multiplier: Float
      description: String
    }

    extend type Query {
      skills: [Skill]
    }

    extend type Mutation {
      createSkill(input: SkillInput!): Skill!
      updateSkill(id: ID!, input: SkillInput!): Skill!
      deleteSkill(id: ID!): Skill!
    }
`;
