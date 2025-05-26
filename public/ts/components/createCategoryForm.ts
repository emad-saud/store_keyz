import axios from 'axios';

import { showAlert } from '../utils/alerts';

export const createCategory = async (form: FormData) => {
  try {
    const res = await axios.post('/api/v1/categories/', form);
    showAlert('success', res.data.message);
    if (res.data.status === 'success') {
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  } catch (err) {
    console.log('ERROR MESSAGE:');
    console.log(err.message);
    console.log(err.response.data.message);
    console.log(err);
    showAlert('fail', err.response.data.message);
  }
};
