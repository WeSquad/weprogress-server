import { gql } from 'apollo-server-hapi';

export default gql`
    type Assessment {
      id: ID!
      createdAt: String!
      rate: Int
    }

    input CreateAssessment {
      rate: Int
    }

    extend type Query {
      assessments: [Assessment]
      assessment(id: ID): Assessment
    }

    extend type Mutation {
      createAssessment(input: CreateAssessment): Assessment!
    }
`;
