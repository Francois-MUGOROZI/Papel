import devAdmin from './devAdmin';
import prodAdmin from './prodAdmin';

const defAdmin = process.env.NODE_ENV === 'production' ? prodAdmin : devAdmin;
export default defAdmin;
