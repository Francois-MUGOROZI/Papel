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
let accountNumber = '';

describe('Test DELETE /api/accounts/delete/:accountNumber', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send(userCredentials)
      .end((err, res) => {
        headerAuth = res.body.data.token;
        account.headerAuth = headerAuth;
      });
    done();
  });
  before(done => {
    chai
      .request(app)
      .post('/api/accounts/create')
      .send(account)
      .end(() => {
        accountNumber = account.accountNumber;
      });
    done();
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
      .get(`/api/accounts/delete/4321`)
      .send({ headerAuth })
      .end((error, res) => {
        expect(res)
          .to.have.property('status')
          .equals(404)
          .that.is.a('number');
        expect(res).to.have.property('error');
        done();
      });
  });
});
