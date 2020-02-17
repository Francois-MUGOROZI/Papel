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
const userCredentials = user.generateFakeUser();
const staffCredentials = user.generateFakeUser();
let headerAuth = '';
let owner = '';

describe('Test GET /api/accounts/', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        owner = userCredentials.id;
        account.owner = owner;
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

  before(done => {
    staffCredentials.type = 'admin';
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(staffCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
      });
    done();
  });

  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .get('/api/accounts')
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return 404 HTTP status code no account found', done => {
    chai
      .request(app)
      .get('/api/accounts')
      .send({ headerAuth })
      .end((error, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(404)
          .that.is.a('number');
        expect(res.body)
          .to.have.property('error')
          .equals('Not found')
          .that.is.a('string');
        done();
      });
  });

  it('Should return 200 HTTP status code if successful', done => {
    chai
      .request(app)
      .get('/api/accounts')
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
