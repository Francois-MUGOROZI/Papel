import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../app';
import FakeUser from '../mock/fakeUser';
import FakeAccount from '../mock/fakeAccount';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;
const user = new FakeUser();
const account = new FakeAccount().generateFakeAccount();
const userCredentials = user.generateAdmin();
let headerAuth = '';

describe('Test GET /api/accounts/:email', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        done();
      });
  });

  before(done => {
    account.headerAuth = headerAuth;
    chai
      .request(app)
      .post('/api/accounts/create')
      .send(account)
      .end(() => {
        done();
      });
  });

  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .get(`/api/accounts/user/${userCredentials.email}`)
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
      .get(`/api/accounts/user/${userCredentials.email}`)
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
