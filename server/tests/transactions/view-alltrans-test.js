import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../../app';
import FakeUser from '../../mock/fakeUser';
import FakeAccount from '../../mock/fakeAccount';
import FakeTrans from '../../mock/fakeTrans';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;
const user = new FakeUser();
const accounts = new FakeAccount();
const account = accounts.generateFakeAccount();
const userCredentials = user.generateAdmin();
const fakeTrans = new FakeTrans();
const fkt = fakeTrans.generateFakeTrans();
let headerAuth = '';
let accountNumber = '';

describe('Test GET /api/transactions/', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
      });
    done();
  });

  before(done => {
    chai
      .request(app)
      .post('/api/accounts/create')
      .send({ ...account, headerAuth })
      .end((err, res) => {
        accountNumber = res.body.data.accountNumber;
      });
    done();
  });

  before(done => {
    fkt.accountNumber = accountNumber;
    chai
      .request(app)
      .post('/api/transactions/create')
      .send({ ...fkt, headerAuth })
      .end(() => {});
    done();
  });

  it('Should return 401 HTTP status code if no token provided', done => {
    chai
      .request(app)
      .get(`/api/transactions/${accountNumber}`)
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
      .get(`/api/transactions/${accountNumber}`)
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
