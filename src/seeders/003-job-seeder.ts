import type { QueryInterface } from "sequelize";

export const up = async ({
    context: queryInterface,
  }: {
    context: QueryInterface;
  }): Promise<void> => {

  await queryInterface.bulkInsert("jobs", [
    {
      id: 1,
      project_id: 1,
      status: "COMPLETED",
      progress: 100,
      fileIds: [1, 2],
      outputPath: "outputs/project-1.zip",
      completedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down = async ({
    context: queryInterface,
  }: {
    context: QueryInterface;
  }): Promise<void>  => {
  await queryInterface.bulkDelete("jobs", {
    id: 1,
  });
};