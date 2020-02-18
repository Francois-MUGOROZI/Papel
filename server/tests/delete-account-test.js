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
const adminCredentials = user.generateFakeUser();
let headerAuth = '';
let owner = '';
let accountNumber;

describe('Test DELETE /api/accounts/delete/:accountNumber', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        owner = userCredentials.id;
        account.owner = owner;
        chai
          .request(app)
          .post('/api/accounts/create')
          .send(account)
          .end(() => {
            accountNumber = account.accountNumber;
            adminCredentials.type = 'admin';
          });
      });
    before(() => {
      chai
        .request(app)
        .post('/api/auth/signup')
        .send(adminCredentials)
        .end((err, res) => {
          headerAuth = res.body.data.token;
          done();
        });
    });
  });

  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .get(`/api/accounts/delete/${accountNumber}`)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('Should return 404 HTTP status code no accounts found', done => {
    chai
      .request(app)
      .get(`/api/accounts/delete/${accountNumber}`)
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
      .get(`/api/accounts/delete/${accountNumber}`)
      .send({ headerAuth })
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(200)
          .that.is.a('number');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});