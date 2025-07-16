export default {
  up: async (queryInterface) => {
    const users = await queryInterface.sequelize.query(`SELECT id FROM "Users";`);
    const userIds = users[0].map((u) => u.id);
    const images = [];

    for (let i = 0; i < 100000; i++) {
      images.push({
        image: `https://picsum.photos/seed/${i}/200/300`,
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert("UserImages", images, {});
  },

  down: (queryInterface) => queryInterface.bulkDelete("UserImages", null, {}),
};
