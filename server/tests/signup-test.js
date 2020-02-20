import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import FakeUser from '../mock/fakeUser';
import app from '../app';

chai.use(chaiHttp);
chai.use(chaiThings);
const { expect } = chai;

const user = new FakeUser();
const data = user.generateFakeUser();

describe('Test POST /api/auth/signup/', () => {
  it('Should return 201 Status code on success', done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(data)
      .end(() => {
        chai
          .request(app)
          .post('/api/auth/signup')
          .send(data)
          .end((er, res) => {
            expect(res.body)
              .to.have.property('status')
              .equals(201)
              .that.is.a('number');
            expect(res.body)
              .to.have.property('message')
              .that.is.a('string');
          });
      });
    done();
  });

  it('Should return 500 In case of server error', done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(data)
      .end(() => {
        chai
          .request(app)
          .post('/api/auth/signup')
          .send(data)
          .end((er, res) => {
            expect(res.body)
              .to.have.property('status')
              .equals(500)
              .that.is.a('number');
            expect(res.body)
              .to.have.property('error')
              .that.is.a('string');
          });
      });
    done();
  });

  it('Should return 409 HTTP status code if user already exists', done => {
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(data)
      .end(() => {
        chai
          .request(app)
          .post('/api/auth/signup')
          .send(data)
          .end((er, res) => {
            expect(res.body)
              .to.have.property('status')
              .equals(409)
              .that.is.a('number');
            expect(res.body)
              .to.have.property('error')
              .equals('User Already exists')
              .that.is.a('string');
          });
      });
    done();
  });

  it('Should return 422 HTTP status code for invalid inputs', done => {
    const newUser = {
      firstName: user.firstName,
      lastName: user.lastName
    };
    chai
      .request(app)
      .post('/api/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(422)
          .that.is.a('number');
        expect(res.body)
          .to.have.property('error')
          .equals('invalid input')
          .that.is.a('string');
      });
    done();
  });
});
