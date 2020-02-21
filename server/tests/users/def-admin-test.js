import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import app from '../../app';

process.env.NODE_ENV = 'test';

chai.use(chaiHttp);
chai.use(chaiThings);

const { expect } = chai;

describe('Test POST /api/users/init', () => {
  before(done => {
    chai
      .request(app)
      .post('/api/users/init')
      .end(() => {
        done();
      });
  });

  it('Should return 409 HTTP status code if already exists', done => {
    chai
      .request(app)
      .post('/api/users/init')
      .end((err, res) => {
        expect(res.body)
          .to.have.property('status')
          .equals(409)
          .that.is.a('number');
        done();
      });
  });
});
