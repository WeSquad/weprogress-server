import { User, Skill, Axe, Job } from '../src/models';
import { POAxe1, POAxe2, POAxe3, POAxe4, POAxe5, POAxe6, POAxe7 } from './fixtures/skills.fixtures';
import { POSkills1, POSkills2, POSkills3, POSkills4, POSkills5, POSkills6, POSkills7 } from './fixtures/skills.fixtures';
import { ObjectID } from 'mongodb';

describe('Create Users', function() {
  let user1 = {
    firstName: 'Nicolas',
    lastName: 'Pinon',
    password: 'test',
    role: 'admin',
    email: 'npinon@wemanity.com'
  };

  let user2 = {
    firstName: 'Chiara',
    lastName: 'Pettinelli',
    password: 'test',
    role: 'user',
    email: 'cpettinelli@wemanity.com'
  };

  test('created users have correct role Admin & User', async () => {
    let adminUser = await User.create(user1);
    let userUser = await User.create(user2);

    expect(adminUser).toHaveProperty('role', 'admin');
    expect(userUser).toHaveProperty('role', 'user');
  });
});

describe('Create Jobs & Axes & Skills', function() {
  var skillsIds = [];
  var axeId = null;
  var axesIds = [];

  test('should add axe 1 & skills 1', async () => {
    POSkills1.map(async (skill) => {
      let createdskill = await Skill.create(skill);
      let generatedId = new ObjectID(createdskill._id);
      skillsIds.push(generatedId);
      expect(skillsIds).not.toBeNull();
    });

    let createdAxe = await Axe.create({
      "name": POAxe1.name,
    });
    axeId = createdAxe._id;
    axesIds.push(axeId);
    expect(createdAxe._id).not.toBeNull();

    let linked = await Axe.findByIdAndUpdate({ _id: axeId }, { $addToSet: { skillsIds: skillsIds } }, { new: true });
    expect(linked.skillsIds).not.toBeNull();
  });

  test('should add axe 2 & skills 2', async () => {
    skillsIds.length = 0;
    POSkills2.map(async (skill) => {
      let createdskill = await Skill.create(skill);
      let generatedId = new ObjectID(createdskill._id);
      skillsIds.push(generatedId);
      expect(skillsIds).not.toBeNull();
    });

    let createdAxe = await Axe.create({
      "name": POAxe2.name,
    });
    axeId = createdAxe._id;
    axesIds.push(axeId);
    expect(createdAxe._id).not.toBeNull();

    let linked = await Axe.findByIdAndUpdate({ _id: axeId }, { $addToSet: { skillsIds: skillsIds } }, { new: true });
    expect(linked.skillsIds).not.toBeNull();
  });

  test('should add axe 3 & skills 3', async () => {
    skillsIds.length = 0;
    POSkills3.map(async (skill) => {
      let createdskill = await Skill.create(skill);
      let generatedId = new ObjectID(createdskill._id);
      skillsIds.push(generatedId);
      expect(skillsIds).not.toBeNull();
    });

    let createdAxe = await Axe.create({
      "name": POAxe3.name,
    });
    axeId = createdAxe._id;
    axesIds.push(axeId);
    expect(createdAxe._id).not.toBeNull();

    let linked = await Axe.findByIdAndUpdate({ _id: axeId }, { $addToSet: { skillsIds: skillsIds } }, { new: true });
    expect(linked.skillsIds).not.toBeNull();
  });

  test('should add axe 4 & skills 4', async () => {
    skillsIds.length = 0;
    POSkills4.map(async (skill) => {
      let createdskill = await Skill.create(skill);
      let generatedId = new ObjectID(createdskill._id);
      skillsIds.push(generatedId);
      expect(skillsIds).not.toBeNull();
    });

    let createdAxe = await Axe.create({
      "name": POAxe4.name,
    });
    axeId = createdAxe._id;
    axesIds.push(axeId);
    expect(createdAxe._id).not.toBeNull();

    let linked = await Axe.findByIdAndUpdate({ _id: axeId }, { $addToSet: { skillsIds: skillsIds } }, { new: true });
    expect(linked.skillsIds).not.toBeNull();
  });

  test('should add axe 5 & skills 5', async () => {
    skillsIds.length = 0;
    POSkills5.map(async (skill) => {
      let createdskill = await Skill.create(skill);
      let generatedId = new ObjectID(createdskill._id);
      skillsIds.push(generatedId);
      expect(skillsIds).not.toBeNull();
    });

    let createdAxe = await Axe.create({
      "name": POAxe5.name,
    });
    axeId = createdAxe._id;
    axesIds.push(axeId);
    expect(createdAxe._id).not.toBeNull();

    let linked = await Axe.findByIdAndUpdate({ _id: axeId }, { $addToSet: { skillsIds: skillsIds } }, { new: true });
    expect(linked.skillsIds).not.toBeNull();
  });

  test('should add axe 6 & skills 6', async () => {
    skillsIds.length = 0;
    POSkills6.map(async (skill) => {
      let createdskill = await Skill.create(skill);
      let generatedId = new ObjectID(createdskill._id);
      skillsIds.push(generatedId);
      expect(skillsIds).not.toBeNull();
    });

    let createdAxe = await Axe.create({
      "name": POAxe6.name,
    });
    axeId = createdAxe._id;
    axesIds.push(axeId);
    expect(createdAxe._id).not.toBeNull();

    let linked = await Axe.findByIdAndUpdate({ _id: axeId }, { $addToSet: { skillsIds: skillsIds } }, { new: true });
    expect(linked.skillsIds).not.toBeNull();
  });

  test('should add axe 7 & skills 7', async () => {
    skillsIds.length = 0;
    POSkills7.map(async (skill) => {
      let createdskill = await Skill.create(skill);
      let generatedId = new ObjectID(createdskill._id);
      skillsIds.push(generatedId);
      expect(skillsIds).not.toBeNull();
    });

    let createdAxe = await Axe.create({
      "name": POAxe7.name,
    });
    axeId = createdAxe._id;
    axesIds.push(axeId);
    expect(createdAxe._id).not.toBeNull();

    let linked = await Axe.findByIdAndUpdate({ _id: axeId }, { $addToSet: { skillsIds: skillsIds } }, { new: true });
    expect(linked.skillsIds).not.toBeNull();
  });

  test('should create PO Job and link Axes', async () => {
    let createdJob = await Job.create({"name": "Product Owner", "axesIds": [...axesIds]});

    expect(createdJob.axesIds).toContain(axeId);
  })
});
