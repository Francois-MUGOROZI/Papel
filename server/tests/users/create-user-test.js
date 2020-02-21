import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../../app';
import FakeUser from '../../mock/fakeUser';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;
const user = new FakeUser();
const userCredentials = user.generateFakeUser();
const adminCredentials = user.generateAdmin();
let headerAuth = '';

describe('Test POST /api/users/create-user', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/users/init')
      .send(adminCredentials)
      .end(() => {
        done();
      });
  });
  before(done => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send(adminCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        userCredentials.role = 'staff';
        done();
      });
  });

  it('Should return 201 HTTP status code if successful', done => {
    chai
      .request(app)
      .post('/api/users/create-user')
      .send({ ...userCredentials, headerAuth })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(201)
          .that.is.a('number');
        expect(res.body).to.have.property('data');
        done();
      });
  });

  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .post('/api/users/create-user')
      .send(userCredentials)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('Should return 409 HTTP status code if already exists', done => {
    chai
      .request(app)
      .post('/api/users/create-user')
      .send({ ...userCredentials, headerAuth })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(409)
          .that.is.a('number');
        done();
      });
  });
});
