import type { QueryInterface } from "sequelize";

export const up = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}): Promise<void> => {
  await queryInterface.bulkInsert("projects", [
    {
      id: 1,
      name: "Sample Project",
      description: "Demo project",
      files_count: 2,
      jobs_count: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async ({
  context: queryInterface,
}: {
  context: QueryInterface;
}): Promise<void> => {
  await queryInterface.bulkDelete("projects", {
    id: 1,
  });
};