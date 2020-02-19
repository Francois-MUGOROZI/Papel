import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../app';
import FakeUser from '../mock/fakeUser';
import FakeAccount from '../mock/fakeAccount';
import FakeTrans from '../mock/fakeTrans';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;
// const user = new FakeUser();
const fakeAccount = new FakeAccount();
const account = fakeAccount.generateFakeAccount();
// const fakeTrans = new FakeTrans();
let trsansaction = {
  accountNumber: '',
  type: 'debit',
  amount: 50
};
// const userCredentials = user.generateFakeUser();
let headerAuth = '';
let accountNumber = '';

describe('Test POST /api/transactions/create', () => {
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
        trsansaction.accountNumber = accountNumber;
      });
    done();
  });
  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .post('/api/transactions/create')
      .send(trsansaction)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('Should return 422 HTTP status code if invalid inputs', done => {
    trsansaction = {
      description: 'new trsansaction description'
    };
    trsansaction.headerAuth = headerAuth;
    chai
      .request(app)
      .post('/api/transactions/create')
      .send(trsansaction)
      .end((error, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(422)
          .that.is.a('number');
        expect(res.body)
          .to.have.property('error')
          .equals('invalid input')
          .that.is.a('string');
        done();
      });
  });

  it('Should return 422 HTTP status code if transaction is empty', done => {
    trsansaction = {};
    trsansaction.headerAuth = headerAuth;
    chai
      .request(app)
      .post('/api/transactions/create')
      .send(trsansaction)
      .end((error, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(422)
          .that.is.a('number');
        expect(res.body)
          .to.have.property('error')
          .equals('invalid input')
          .that.is.a('string');
        done();
      });
  });
});
