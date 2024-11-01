
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../../index');
const Post = require('../../models/Post');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

let mongoServer;
let testUser;
let authToken;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create test user and generate token
  testUser = await User.create({
    username: 'testuser',
    email: 'test@test.com',
    password: 'password123',
    age: 25
  });

  authToken = jwt.sign(
    { userId: testUser._id },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await Post.deleteMany({});
});

describe('Post Controller', () => {
  describe('POST /api/posts/create', () => {
    it('should create a new post', async () => {
      const response = await request(app)
        .post('/api/posts/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          content: 'Test post content'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('content', 'Test post content');
      expect(response.body).toHaveProperty('author', testUser._id.toString());
    });

    it('should not create post without auth token', async () => {
      const response = await request(app)
        .post('/api/posts/create')
        .send({
          content: 'Test post content'
        });

      expect(response.status).toBe(401);
    });
  });

  describe('GET /api/posts', () => {
    beforeEach(async () => {
      await Post.create({
        content: 'Test post 1',
        author: testUser._id
      });
      await Post.create({
        content: 'Test post 2',
        author: testUser._id
      });
    });

    it('should return all posts', async () => {
      const response = await request(app).get('/api/posts');

      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(2);
      expect(response.body[0]).toHaveProperty('content');
      expect(response.body[0]).toHaveProperty('author');
    });
  });

  describe('POST /api/posts/:id/like', () => {
    let testPost;

    beforeEach(async () => {
      testPost = await Post.create({
        content: 'Test post',
        author: testUser._id
      });
    });

    it('should increment post likes', async () => {
      const response = await request(app)
        .post(`/api/posts/${testPost._id}/like`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body.likes).toBe(1);
    });
  });
});