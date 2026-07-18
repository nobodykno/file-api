import type { QueryInterface } from "sequelize";

export const up = async ({
    context: queryInterface,
}: {
    context: QueryInterface;
}): Promise<void> => {
    await queryInterface.bulkInsert("files", [
        {
            id: 1,
            project_id: 1,
            name: "Resume",
            file_name: "resume.pdf",
            size: 245760,
            mime_type: "application/pdf",
            path: "uploads/resume.pdf",
            uploadedAt: new Date(),
        },
        {
            id: 2,
            project_id: 1,
            name: "Profile Image",
            file_name: "profile.png",
            size: 120500,
            mime_type: "image/png",
            path: "uploads/profile.png",
            uploadedAt: new Date(),
        },
    ]);
};

export const down = async ({
    context: queryInterface,
}: {
    context: QueryInterface;
}): Promise<void> => {
    await queryInterface.bulkDelete("files", {
        project_id: 1,
    });
};