"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const expenses_model_1 = require("./expenses.model");
const app_1 = __importDefault(require("../../app"));
beforeAll(async () => {
    try {
        await expenses_model_1.Expenses.drop();
    }
    catch (err) { }
});
describe('GET /api/v1/expenses', () => {
    it('responds with an array of expenses', async () => (0, supertest_1.default)(app_1.default)
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
    it('responds with an error if expense is invalid', async () => (0, supertest_1.default)(app_1.default)
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
    it('responds with an inserted object', async () => (0, supertest_1.default)(app_1.default)
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
    it('responds with an single expense', async () => (0, supertest_1.default)(app_1.default)
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
        (0, supertest_1.default)(app_1.default)
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
        (0, supertest_1.default)(app_1.default)
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
    it('responds with an single expense', async () => (0, supertest_1.default)(app_1.default)
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
        (0, supertest_1.default)(app_1.default)
            .delete('/api/v1/expenses/fjdksajlkdfsfjdskkjs')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(422, done);
    });
    it('responds with a not found error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .delete('/api/v1/expenses/6342f1b34d801e28bf8e1f1c')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404, done);
    });
    it('responds with an 204 status code', (done) => {
        (0, supertest_1.default)(app_1.default).delete(`/api/v1/expenses/${id}`).expect(204, done);
    });
    it('responds with a not found error', (done) => {
        (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/expenses/${id}`)
            .set('Accept', 'application/json')
            .expect(404, done);
    });
});
//# sourceMappingURL=expenses.test.js.map