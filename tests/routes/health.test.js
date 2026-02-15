import request from 'supertest';
import app from '../../app.js';

describe('GET /health', () => {
  it('returns 200 and OK status', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });
});
