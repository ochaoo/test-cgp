import { faker } from "@faker-js/faker";

export default {
  up: async (queryInterface) => {
    const users = Array.from({ length: 10000 }).map(() => ({
      name: faker.person.fullName(),
      city: faker.location.city(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
