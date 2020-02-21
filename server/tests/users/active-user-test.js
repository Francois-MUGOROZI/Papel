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
let userEmail = '';
const data = { status: 'active' };

describe('Test POST /api/users/activation/:email', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        userEmail = userCredentials.email;
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
        done();
      });
  });
  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .patch(`/api/users/activation/${userEmail}`)
      .send(data)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('Should return 200 HTTP status code if successful', done => {
    data.headerAuth = headerAuth;
    chai
      .request(app)
      .patch(`/api/users/activation/${userEmail}`)
      .send(data)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(200)
          .that.is.a('number');
        expect(res.body).to.have.property('data');
        done();
      });
  });
});
