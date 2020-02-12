import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { before } from 'mocha';
import FakeUser from '../mock/fakeUser';
import app from '../app';

chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;

const user = new FakeUser();
const userCredentials = user.generateFakeUser();

describe('Test POST /api/auth/login/', () => {
  let loginData = {};
  before(done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(userCredentials)
      .end(() => {
        loginData = {
          email: userCredentials.email,
          password: userCredentials.password
        };
        done();
      });
  });

  it('Should return 200 HTTP status code on success', done => {
    chai
      .request(app)
      .post('/api/auth/login')
      .send(loginData)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(200)
          .that.is.a('number');
        expect(res.body)
          .to.have.property('data')
          .that.includes.property('token')
          .that.is.a('string');
        done();
      });
  });
  it('Should return 401 HTTP status code if invalid credentials', done => {
    const newUser = user.generateFakeUser();
    loginData = {
      email: newUser.email,
      password: newUser.password
    };
    chai
      .request(app)
      .post('/api/auth/login')
      .send(loginData)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(401)
          .that.is.a('number');
        expect(res.body)
          .to.have.property('error')
          .equals('Invalid credentials')
          .that.is.a('string');
        done();
      });
  });
  it('Should return 422 HTTP status code if invalid inputs', done => {
    const newUser = user.generateFakeUser();
    loginData = {
      password: newUser.password
    };
    chai
      .request(app)
      .post('/api/auth/login')
      .send(loginData)
      .end((err, res) => {
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
