import { gql } from 'apollo-server-hapi';

export default gql`
    type Axe {
      id: ID!
      name: String!
      skills: [Skill]
    }

    input AxeInput {
      name: String!
      skillsIds: [ID]
    }

    extend type Query {
      axes: [Axe]
    }

    extend type Mutation {
      createAxe(input: AxeInput!): Axe!
      updateAxe(id: ID!, input: AxeInput!): Axe!
      deleteAxe(id: ID!): Axe!
      addSkills(id:ID!, skills:[ID]!): Axe!
      removeSkills(id:ID!, skills:[ID]!): Axe!
    }
`;
