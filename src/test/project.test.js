const request = require('supertest');

const app = require('../app');
const { NUMBER } = require('sequelize');



describe('PROJECT API', () => {

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJwYXJhbWppdEBnbWFpbC5jb20iLCJpYXQiOjE3ODM5MDE4NzIsImV4cCI6MTc4Mzk4ODI3Mn0.rcDV1MthFNLOltbAxwZqm3UQiNsGuiqEd87FDppbErw';
  describe('POST /v1/api/projects', () => {

    it('should create project successfully', async () => {
      const response = await request(app)
        .post('/v1/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'project1',
          description: 'dnfdk'
        });

      expect(response.status).toBe(201);
      expect(response.body.result).toEqual(expect.objectContaining({
        name: 'project1',
        description: 'dnfdk',
        files_count: 0,
        jobs_count: 0,
        created_at: new Date().toLocaleString(),
        updated_at: new Date().toLocaleString(),
      }));


    });
    it('should return 401 unauthorize', async () => {
      const response = await request(app)
        .post('/v1/api/projects')
        .send({
          name: 'project1',
          description: 'dnfdk'
        });

      expect(response.status).toBe(401);
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .post('/v1/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          description: 'dnfdk'
        });

      expect(response.status).toBe(400);
    });


    it('should return 400 if description is missing', async () => {
      const response = await request(app)
        .post('/v1/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'project1',
          description: ''
        });

      expect(response.status).toBe(400);
    });
  });

  describe('PATCH /v1/api/projects', () => {

    it('should update project successfully', async () => {
      const response = await request(app)
        .patch('/v1/api/projects/5')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'paramjit',
          description: 'paramjit5'
        });
      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(expect.objectContaining({
        name: 'paramjit',
        description: 'paramjit5',
        files_count: 0,
        jobs_count: 0,
        created_at: '2026-07-10T15:34:05.000Z'
   
      }));


    });
    it('should return 401 unauthorize', async () => {
      const response = await request(app)
        .patch('/v1/api/projects/5')
        .send({
          name: '',
          description: 'dnfdk'
        });

      expect(response.status).toBe(401);
    });

    it('should return 400 if name is missing', async () => {
      const response = await request(app)
        .patch('/v1/api/projects/5')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: '',
          description: 'dnfdk'
        });

      expect(response.status).toBe(400);
    });


    it('should return 400 if description is missing', async () => {
      const response = await request(app)
        .post('/v1/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'project1',
          description: ''
        });

      expect(response.status).toBe(400);
    });
  });

  describe('GET /v1/api/projects', () => {


    it('should return all projects list', async () => {
      const response = await request(app)
        .get('/v1/api/projects')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(
        expect.arrayContaining([
          expect.objectContaining(
            {
              id: expect.any(Number),
              name: 'project1',
              description: 'dnfdk',
              files_count: expect.any(Number),
              jobs_count: expect.any(Number),
              updated_at: expect.any(String)
            }
          )
        ])
      );
    });

    it('should return 401 unauthorize', async () => {
      const response = await request(app)
        .get('/v1/api/projects')
        .send();

      expect(response.status).toBe(401);
    });
  });

  describe('GET /v1/api/projects/:projectId', () => {


    it('should return detail of a project', async () => {
      const response = await request(app)
        .get('/v1/api/projects/5')
        .set('Authorization', `Bearer ${token}`)
        .send();


      expect(response.status).toBe(200);
      expect(response.body.result).toEqual(
        expect.objectContaining(
          {
            id: 5,
            name: 'paramjit',
            description: 'paramjit5',
            files_count: 0,
            jobs_count: 0,
            created_at: '2026-07-10T15:34:05.000Z',
          }
        )
      );
    });

    it('should return 401 unauthorize', async () => {
      const response = await request(app)
        .get('/v1/api/projects/:projectId')
        .send();

      expect(response.status).toBe(401);
    });
  });

  describe('DELETE /v1/api/projects/:projectId', () => {


    it('should delete a particular project', async () => {
      const response = await request(app)
        .delete('/v1/api/projects/1')
        .set('Authorization', `Bearer ${token}`)
        .send();
      expect(response.status).toBe(200);

      expect(response.body).toEqual({
        message: 'Project deleted successfully!'
      });
    });


    it('should return 401 unauthorize', async () => {
      const response = await request(app)
        .get('/v1/api/projects')
        .send();

      expect(response.status).toBe(401);
    });
  });


});