import axios from 'axios';
import { showAlert } from '../utils/alerts';

export const createItem = async (content: string, productId: string) => {
  try {
    const res = await axios.post('/api/v1/items', { content, productId });

    showAlert('success', res.data.message);
  } catch (err) {
    console.log('ERROR MESSAGE:');
    console.log(err.message);
    console.log(err.response.data.message);
    console.log(err);
    showAlert('fail', err.response.data.message);
  }
};
