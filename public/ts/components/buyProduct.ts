import axios from 'axios';
import { showAlert } from '../utils/alerts';

export const buyProduct = async (productId: string) => {
  try {
    const res = await axios.post('/api/v1/orders', { productId });
    console.log(res.data);
    showAlert('success', res.data.message);
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
