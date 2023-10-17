import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '39266843-dca356c7db7211016842c48b9';
// const URL =
//   'https://pixabay.com/api/?q=cat&page=1&key=39266843-dca356c7db7211016842c48b9&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = async params => {
  console.log(params);
  const { data } = await axios.get(axios.defaults.baseURL, {
    params: {
      key: API_KEY,
      q: 'tree',
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      page: 1,
      ...params,
    },
  });
  // console.log('data:', data);
  return data;
};
