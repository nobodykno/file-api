import request from "supertest";
import app from "../app.js";

describe("AUTH API", () => {
  describe("POST /v1/api/login", () => {
    it("should login successfully", async () => {
      const response = await request(app).post("/v1/api/login").send({
        email: "admin@example.com",
        password: "Admin@123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("token");
      expect(response.body.token).toEqual(expect.any(String));
    });

    it("should return 401 for wrong password", async () => {
      const response = await request(app).post("/v1/api/login").send({
        email: "paramjit@gmail.com",
        password: "wrong",
      });

      expect(response.status).toBe(401);
    });

    it("should return 401 for invalid email", async () => {
      const response = await request(app).post("/v1/api/login").send({
        email: "abc@test.com",
        password: "123456",
      });
      expect(response.status).toBe(401);
    });

    it("should return 400 when email is missing", async () => {
      const response = await request(app).post("/v1/api/login").send({
        email: "",
        password: "1234",
      });

      expect(response.status).toBe(400);
    });

    it("should return 400 when password is missing", async () => {
      const response = await request(app).post("/v1/api/login").send({
        email: "paramjit@gmail.com",
        password: "",
      });

      expect(response.status).toBe(400);
    });
  });
});