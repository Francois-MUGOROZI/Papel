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

describe('Test GET /api/users/:role', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(userCredentials)
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
        done();
      });
  });
  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .get('/api/users/client')
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
    chai
      .request(app)
      .get('/api/users/client')
      .send({ headerAuth })
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
