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
const fakeAccount = new FakeAccount();
const account = fakeAccount.generateFakeAccount();
let headerAuth = '';
let accountNumber = '';

describe('Test PATCH /api/accounts/activation/:status', () => {
  before(done => {
    const data = {
      email: 'francoismugorozi@gmail.com',
      password: 'adminpass'
    };
    chai
      .request(app)
      .post('/api/auth/login')
      .send(data)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        account.headerAuth = headerAuth;
        done();
      });
  });

  before(done => {
    chai
      .request(app)
      .post('/api/accounts/create')
      .send(account)
      .end((err, res) => {
        accountNumber = res.body.data.accountNumber;
      });
    done();
  });

  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .get(`/api/accounts/activation/${accountNumber}`)
      .send({ status: 'active' })
      .end((err, res) => {
        expect(res)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res).to.have.property('error');
        done();
      });
  });
  it('Should return 404 HTTP status code no accounts found', done => {
    chai
      .request(app)
      .get(`/api/accounts/activation/${accountNumber}`)
      .send({ headerAuth, status: 'active' })
      .end((error, res) => {
        expect(res)
          .to.have.property('status')
          .equals(404)
          .that.is.a('number');
        expect(res).to.have.property('error');
        done();
      });
  });

  it('Should return 200 HTTP status code if successful', done => {
    chai
      .request(app)
      .get(`/api/accounts/activation/${accountNumber}`)
      .send({ headerAuth, status: 'active' })
      .end((err, res) => {
        expect(res)
          .to.have.property('status')
          .equals(200)
          .that.is.a('number');
        expect(res).to.have.property('message');
        done();
      });
  });
});
