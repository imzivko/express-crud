import request from 'supertest';

import { Expenses } from './expenses.model';
import app from '../../app';

beforeAll(async () => {
  try {
    await Expenses.drop();
  } catch (err) {}
});

describe('GET /api/v1/expenses', () => {
  it('responds with an array of expenses', async () =>
    request(app)
      .get('/api/v1/expenses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
      }));
});

let id = '';
describe('POST /api/v1/expenses', () => {
  it('responds with an error if expense is invalid', async () =>
    request(app)
      .post('/api/v1/expenses')
      .set('Accept', 'application/json')
      .send({
        wpm: '',
      })
      .expect('Content-Type', /json/)
      .expect(422)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      }));

  it('responds with an inserted object', async () =>
    request(app)
      .post('/api/v1/expenses')
      .set('Accept', 'application/json')
      .send({
        wpm: '100',
      })
      .expect('Content-Type', /json/)
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        id = response.body._id;
        expect(response.body).toHaveProperty('wpm');
      }));
});

describe('GET /api/v1/expenses/:id', () => {
  it('responds with an single expense', async () =>
    request(app)
      .get(`/api/v1/expenses/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('wpm');
      }));

  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .get('/api/v1/expenses/2')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  // it('responds with a not found error', (done) => {
  //   request(app)
  //     .get('/api/v1/expenses/6342ce1cac37fbe559a67289')
  //     .set('Accept', 'application/json')
  //     .expect('Content-Type', /json/)
  //     .expect(404, done);
  // });
});

describe('PUT /api/v1/expenses/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .put('/api/v1/expenses/fjdksajlkdfs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  // it('responds with a not found error', (done) => {
  //   request(app)
  //     .put('/api/v1/expenses/6342ce1cac37fbe559a67289')
  //     .set('Accept', 'application/json')
  //     .send({
  //       expenseName: 'Christmas Shopping',
  //       completed: true,
  //     })
  //     .expect('Content-Type', /json/)
  //     .expect(404, done);
  // });

  it('responds with an single expense', async () =>
    request(app)
      .put(`/api/v1/expenses/${id}`)
      .set('Accept', 'application/json')
      .send({
        wpm: '100',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('_id');
        expect(response.body._id).toBe(id);
        expect(response.body).toHaveProperty('wpm');
      }));
});

describe('DELETE /api/v1/expenses/:id', () => {
  it('responds with an invalid ObjectId error', (done) => {
    request(app)
      .delete('/api/v1/expenses/fjdksajlkdfsfjdskkjs')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(422, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .delete('/api/v1/expenses/6342f1b34d801e28bf8e1f1c')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done);
  });

  it('responds with an 204 status code', (done) => {
    request(app).delete(`/api/v1/expenses/${id}`).expect(204, done);
  });

  it('responds with a not found error', (done) => {
    request(app)
      .get(`/api/v1/expenses/${id}`)
      .set('Accept', 'application/json')
      .expect(404, done);
  });
});
