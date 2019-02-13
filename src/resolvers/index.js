import user from './user.resolvers';
import assessment from './assessment.resolvers';
import sharedassessment from './sharedassessment.resolvers';
import job from './job.resolvers';
import axe from './axe.resolvers';
import skill from './skill.resolvers';
import notification from './notification.resolvers';

export default [
  notification,
  skill,
  axe,
  job,
  assessment,
  sharedassessment,
  user,
]
