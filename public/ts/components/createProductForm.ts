import axios from 'axios';
import { showAlert } from '../utils/alerts';

export const createProduct = async (form: FormData) => {
  try {
    const res = await axios.post('/api/v1/products', form);
    if (res.data.status === 'success') {
      showAlert('success', res.data.message);
      setTimeout(() => {
        window.location.href = '/';
      }, 2500);
    }
  } catch (err) {
    showAlert('fail', err.response.data.message);
  }
};
