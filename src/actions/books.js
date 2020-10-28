import axios from 'axios';

// define axios request for getting data from provided url
export function getBooks(success) {
  axios({
    method: 'get',
    responseType: 'json',
    url: 'https://ghibliapi.herokuapp.com/films',
  })
    .then(function (res) {
      success(res.data);
    })
    .catch(function (error) {
      console.log(error); // handle error
    });
}
