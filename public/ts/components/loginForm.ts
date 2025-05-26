import axios from 'axios';

import { showAlert } from '../utils/alerts';

export const login = async (email: string, password: string) => {
  try {
    const res = await axios.post('/api/v1/users/login', { email, password });
    console.log(res.data);
    showAlert('success', res.data.message);

    if (res.data.status === 'success') {
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    }
  } catch (err) {
    console.log('ERROR MESSAGE:');
    console.log(err.message);
    console.log(err.response.data.message);
    console.log(err);
    showAlert(
      'fail',
      err?.response?.data?.message || 'Something Went Very Wrong!'
    );
  }
};
