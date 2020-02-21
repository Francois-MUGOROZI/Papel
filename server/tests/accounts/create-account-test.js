import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../../app';
import FakeUser from '../../mock/fakeUser';
import FakeAccount from '../../mock/fakeAccount';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;
const user = new FakeUser();
const accounts = new FakeAccount();
let account = accounts.generateFakeAccount();
const userCredentials = user.generateFakeUser();
let headerAuth = '';

describe('Test POST /api/accounts/create', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        done();
      });
  });

  it('Should return 201 HTTP status code on success', done => {
    chai
      .request(app)
      .post('/api/accounts/create')
      .send({ ...account, headerAuth })
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
      .post('/api/accounts/create')
      .send(account)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return 422 HTTP status code if account is empty', done => {
    account = {};
    chai
      .request(app)
      .post('/api/accounts/create')
      .send({ ...account, headerAuth })
      .end((error, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(422)
          .that.is.a('number');
        expect(res.body)
          .to.have.property('error')
          .that.is.a('string');
        done();
      });
  });
});
