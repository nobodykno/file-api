import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../app.js";

describe("PROJECT API", () => {
  let token: string;
  beforeAll(() => {
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
  });

  describe("POST /v1/api/projects", () => {
    it("should create project successfully", async () => {

      const response = await request(app)
        .post("/v1/api/projects")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: Number(1),
          name: "Testtesttest",
          description: "Test test",
        });


      expect(response.status).toBe(201);

      expect(response.body.result).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: "Testtesttest",
          description: "Test test",
          files_count: 0,
          jobs_count: 0,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      );
    });

    it("should return 401 unauthorized", async () => {
      const response = await request(app)
        .post("/v1/api/projects")
        .send({
          name: "project1",
          description: "dnfdk",
        });

      expect(response.status).toBe(401);
    });

    it("should return 400 if name is missing", async () => {
      const response = await request(app)
        .post("/v1/api/projects")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "",
          description: "dnfdk",
        });

      expect(response.status).toBe(400);
    });

    it("should return 400 if description is missing", async () => {
      const response = await request(app)
        .post("/v1/api/projects")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "project1",
          description: "",
        });

      expect(response.status).toBe(400);
    });
  });

  describe("PATCH /v1/api/projects/:projectId", () => {

    let projectId: number;
    beforeEach(async () => {
      const response = await request(app)
        .post("/v1/api/projects")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: 1,
          name: "Test Project",
          description: "Test Description",
        });


      projectId = response.body.result.id;
    });

    it("should update project successfully", async () => {
      const response = await request(app)
        .patch(`/v1/api/projects/${projectId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Project",
          description: "Updated Description",
        });

      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(
        expect.objectContaining({
          id: projectId,
          name: "Updated Project",
          description: "Updated Description",
          files_count: expect.any(Number),
          jobs_count: expect.any(Number),
          updatedAt: expect.any(String),
          createdAt: expect.any(String),

        })
      );
    });

    it("should return 401 unauthorized", async () => {
      const response = await request(app)
        .patch(`/v1/api/projects/${projectId}`)
        .send({
          name: "Updated Project",
          description: "Updated Description",
        });

      expect(response.status).toBe(401);
    });

    it("should return 400 if name is missing", async () => {
      const response = await request(app)
        .patch(`/v1/api/projects/${projectId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "",
          description: "Updated Description",
        });

      expect(response.status).toBe(400);
    });

    it("should return 400 if description is missing", async () => {
      const response = await request(app)
        .patch(`/v1/api/projects/${projectId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Updated Project",
          description: "",
        });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /v1/api/projects", () => {
    it("should return all projects", async () => {
      const response = await request(app)
        .get("/v1/api/projects")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(Array.isArray(response.body.result)).toBe(true);
    });

    it("should return 401 unauthorized", async () => {
      const response = await request(app).get("/v1/api/projects");

      expect(response.status).toBe(401);
    });
  });

  describe("GET /v1/api/projects/:projectId", () => {
    let projectId: number;

    beforeEach(async () => {
      const response = await request(app)
        .post("/v1/api/projects")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id: 1,
          name: "Project Details",
          description: "DemoDemo demo",
        });
      projectId = response.body.result.id;
    });

    it("should return project details", async () => {
      const response = await request(app)
        .get(`/v1/api/projects/${projectId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body.result).toEqual(
        expect.objectContaining({
          id: projectId,
          name: "Project Details",
          description: "DemoDemo demo",
          files_count: expect.any(Number),
          jobs_count: expect.any(Number),
         updatedAt: expect.any(String),
         createdAt:expect.any(String)
        })
      );
    });

    it("should return 401 unauthorized", async () => {
      const response = await request(app).get(
        `/v1/api/projects/${projectId}`
      );

      expect(response.status).toBe(401);
    });
  });

  describe("DELETE /v1/api/projects/:projectId", () => {
    let projectId: number;

    beforeEach(async () => {
      const response = await request(app)
        .post("/v1/api/projects")
        .set("Authorization", `Bearer ${token}`)
        .send({
          user_id:1,
          name: "Delete Project",
          description: "Demo Demo",
        });

      projectId = response.body.result.id;
    });

    it("should delete project successfully", async () => {
      const response = await request(app)
        .delete(`/v1/api/projects/${projectId}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        message: "Project deleted successfully!",
      });
    });

    it("should return 401 unauthorized", async () => {
      const response = await request(app).delete(
        `/v1/api/projects/${projectId}`
      );

      expect(response.status).toBe(401);
    });
  });
});