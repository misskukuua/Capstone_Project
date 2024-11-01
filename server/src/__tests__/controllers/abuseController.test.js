const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../index');
const AbuseReport = require('../../models/abuseReport');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await AbuseReport.deleteMany({});
});

describe('Abuse Report Controller', () => {
  describe('POST /api/abuse-reports', () => {
    it('should create a new abuse report', async () => {
      const reportData = {
        fullName: 'John Doe',
        email: 'john@test.com',
        typeOfAbuse: 'harassment',
        address: '123 Test St',
        contact: '1234567890',
        age: 25
      };

      const response = await request(app)
        .post('/api/abuse-reports')
        .send(reportData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('reportId');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/abuse-reports')
        .send({
          fullName: 'John Doe',
          email: 'john@test.com'
          // Missing required fields
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/abuse-reports', () => {
    beforeEach(async () => {
      await AbuseReport.create({
        fullName: 'John Doe',
        email: 'john@test.com',
        typeOfAbuse: 'harassment',
        address: '123 Test St',
        contact: '1234567890',
        age: 25
      });
    });

    it('should return all abuse reports', async () => {
      const response = await request(app)
        .get('/api/abuse-reports');

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.reports).toHaveLength(1);
      expect(response.body.reports[0]).toHaveProperty('fullName', 'John Doe');
    });
  });
});