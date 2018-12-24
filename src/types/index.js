import User from './user.type';
import Assessment from './assessment.type';
import Job from './job.type';
import Axe from './axe.type';
import Skill from './skill.type';

const Root = /* GraphQL */ `
	# The dummy queries and mutations are necessary because
	# graphql-js cannot have empty root types and we only extend
	# these types later on
	# Ref: apollographql/graphql-tools#293
	type Query {
		dummy: String
	}
	type Mutation {
		dummy: String
	}
	type Subscription {
		dummy: String
	}
	schema {
		query: Query
		mutation: Mutation
		subscription: Subscription
	}
`

export default [
  Root,
  Skill,
  Axe,
  Job,
  Assessment,
  User
];
