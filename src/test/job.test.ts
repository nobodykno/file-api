import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import request from "supertest";

import app from "../app.js";

describe("JOB API", () => {
    let token: string;
    let projectId: number;
    let fileId: number;
    let jobId: number;

    beforeAll(async () => {
        // Generate JWT
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

        // Create Project
        const projectResponse = await request(app)
            .post("/v1/api/projects")
            .set("Authorization", `Bearer ${token}`)
            .send({
                user_id: 1,
                name: "Test Project",
                description: "Test Project Description",
            });

        expect(projectResponse.status).toBe(201);

        projectId = projectResponse.body.result.id;

        // Upload File
        const filePath = path.join(
            process.cwd(),
            "src/",
            "test/",
            "fixtures/",
            "simple.pdf"
        );

        expect(fs.existsSync(filePath)).toBe(true);

        const uploadResponse = await request(app)
            .post(`/v1/api/projects/${projectId}/files`)
            .set("Authorization", `Bearer ${token}`)
            .attach("files", filePath);

        expect(uploadResponse.status).toBe(201);

        expect(uploadResponse.body.result.length).toBeGreaterThan(0);

        fileId = uploadResponse.body.result[0].id;

        // Create Job
        const jobResponse = await request(app)
            .post(`/v1/api/projects/${projectId}/jobs`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                fileIds: [fileId],
            });

        expect(jobResponse.status).toBe(201);

        jobId = jobResponse.body.result.id;
    });

    describe("POST /v1/api/projects/:projectId/jobs", () => {
        it("should create another job successfully", async () => {
            const response = await request(app)
                .post(`/v1/api/projects/${projectId}/jobs`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    fileIds: [fileId],
                });

            expect(response.status).toBe(201);

            expect(response.body.result).toEqual(
                expect.objectContaining({
                    id: expect.any(Number),
                })
            );
        });

        it("should return 401 without token", async () => {
            const response = await request(app)
                .post(`/v1/api/projects/${projectId}/jobs`)
                .send({
                    fileIds: [fileId],
                });

            expect(response.status).toBe(401);
        });
    });

    describe("GET /v1/api/projects/:projectId/jobs", () => {
        it("should return all jobs", async () => {
            const response = await request(app)
                .get(`/v1/api/projects/${projectId}/jobs`)
                .set("Authorization", `Bearer ${token}`);

                console.log(response.body);

            expect(response.status).toBe(200);

            expect(response.body).toEqual(
                expect.objectContaining({
                  message: expect.any(String),
                  result: expect.arrayContaining([
                    expect.objectContaining({
                      id: expect.any(Number),
                      project_id: expect.any(Number),
                      status: expect.any(String),
                      progress: expect.any(Number),
                    }),
                  ]),
                })
              );
        });
    });

    describe("GET /v1/api/projects/:projectId/jobs/:jobId", () => {
        it("should return job status", async () => {
            const response = await request(app)
                .get(`/v1/api/projects/${projectId}/jobs/${jobId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(response.status).toBe(200);

            expect(response.body.result).toEqual(
                expect.objectContaining({
                    id: jobId,
                })
            );
        });
    });
});