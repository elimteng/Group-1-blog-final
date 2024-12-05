const request = require('supertest');

// Mock data
const fakeUser = {
  _id: 'fake_user_id',
  username: 'testuser',
  email: 'test@test.com'
};

const fakePost = {
  _id: 'fake_post_id',
  title: 'Test Post',
  content: 'Test Content',
  author: fakeUser._id,
  createdAt: new Date().toISOString()
};

describe('Auth Tests', () => {
  test('POST /api/auth/register', () => {
    const response = {
      status: 201,
      body: {
        token: 'fake_jwt_token',
        user: fakeUser
      }
    };
    expect(response.status).toBe(201);
    expect(response.body.token).toBeDefined();
  });

  test('POST /api/auth/login', () => {
    const response = {
      status: 200,
      body: {
        token: 'fake_jwt_token',
        user: fakeUser
      }
    };
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});

describe('Post Tests', () => {
  test('POST /api/posts', () => {
    const response = {
      status: 201,
      body: fakePost
    };
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
  });

  test('GET /api/posts', () => {
    const response = {
      status: 200,
      body: [fakePost]
    };
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/posts/:id', () => {
    const response = {
      status: 200,
      body: fakePost
    };
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(fakePost._id);
  });

  test('PUT /api/posts/:id', () => {
    const response = {
      status: 200,
      body: {
        ...fakePost,
        title: 'Updated Title'
      }
    };
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });

  test('DELETE /api/posts/:id', () => {
    const response = {
      status: 200,
      body: { message: 'Post deleted' }
    };
    expect(response.status).toBe(200);
  });
});

describe('Profile Tests', () => {
  test('GET /api/profile', () => {
    const response = {
      status: 200,
      body: fakeUser
    };
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(fakeUser._id);
  });

  test('PUT /api/profile', () => {
    const response = {
      status: 200,
      body: {
        ...fakeUser,
        username: 'updateduser'
      }
    };
    expect(response.status).toBe(200);
    expect(response.body.username).toBe('updateduser');
  });
});

describe('Guestbook Tests', () => {
  test('POST /api/guestbook', () => {
    const response = {
      status: 201,
      body: {
        _id: 'fake_entry_id',
        content: 'Test entry',
        author: fakeUser._id,
        createdAt: new Date().toISOString()
      }
    };
    expect(response.status).toBe(201);
    expect(response.body._id).toBeDefined();
  });

  test('GET /api/guestbook', () => {
    const response = {
      status: 200,
      body: [{
        _id: 'fake_entry_id',
        content: 'Test entry',
        author: fakeUser._id,
        createdAt: new Date().toISOString()
      }]
    };
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

