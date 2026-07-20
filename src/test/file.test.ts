
import path from "path";
import jwt from "jsonwebtoken";
import request from "supertest";

import app from "../app.js";

describe("FILE API", () => {
    let token: string;
    let projectId: number;
    let fileId: number;

    beforeAll(async () => {
        token = jwt.sign(
            {
                id: 1,
                email: "admin@test.com",
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h",
            }
        );

        const projectResponse = await request(app)
            .post("/v1/api/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({
                user_id: 1,
                name: "Test Project",
                description: "Test Project Description",
            });

        projectId = projectResponse.body.result.id;
    });

    describe("POST /v1/api/projects/:projectId/files", () => {
        it("should upload file successfully", async () => {
    
            const filePath = path.join(process.cwd(),
                "src/",
                "test/",
                "fixtures/",
                "simple.pdf");

            const response = await request(app)
                .post(`/v1/api/projects/${projectId}/files`)
                .set("Authorization", `Bearer ${token}`)
                .attach("files", filePath);

            expect(response.status).toBe(201);

            expect(response.body.result).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        id: expect.any(Number),
                        name: expect.any(String),
                    }),
                ])
            );

            fileId = response.body.result[0].id;
        });

        it("should return 401 without token", async () => {
            const filePath = path.join(process.cwd(),
            "src/",
            "test/",
            "fixtures/",
            "simple.pdf");

            const response = await request(app)
                .post(`/v1/api/projects/${projectId}/files`)
                .attach("files", filePath);

            expect(response.status).toBe(401);
        });
    });

    describe("GET /v1/api/projects/:projectId/files", () => {
        it("should return project files", async () => {
            const response = await request(app)
                .get(`/v1/api/projects/${projectId}/files`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body.result)).toBe(true);
        });

        it("should return 401 without token", async () => {
            const response = await request(app).get(
                `/v1/api/projects/${projectId}/files`
            );

            expect(response.status).toBe(401);
        });
    });

    describe("DELETE /v1/api/projects/:projectId/files/:fileId", () => {
        it("should delete file successfully", async () => {
            const response = await request(app)
                .delete(`/v1/api/projects/${projectId}/files/${fileId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body).toEqual({
                message: "File deleted successfully!",
            });
        });

        it("should return 401 without token", async () => {
            const response = await request(app).delete(
                `/v1/api/projects/${projectId}/files/${fileId}`
            );

            expect(response.status).toBe(401);
        });
    });
});