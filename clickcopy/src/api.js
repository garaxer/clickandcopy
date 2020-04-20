import axios from 'axios';

export const uploadPlan = (file) => async dispatch => {
  console.log(file)
  let fd = new FormData();
  fd.append('file', file);
  
  process.env.API_URL ? console.log(process.env.API_URL) : console.log('no env')

  const response = await axios.post(process.env.API_URL ? `${process.env.API_URL}`:'http://localhost:8080/', fd, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).catch((error) => {
    console.error('Error:', error);
    dispatch({ type: 'PLAN_UPLOAD', payload: error });
  });

  dispatch({ type: 'PLAN_UPLOAD', payload: response.data });
}

export const uploadPlanOld = (file) => dispatch => {

  let formData = new FormData();
  formData.append('file', file);

  fetch('http://localhost:8080/', {
    method: 'POST',
    body: formData,
  })
  .then((response) => response.json())
  .then((result) => {
    console.log('Success:', result);
    dispatch({ type: 'PLAN_UPLOAD', payload: result });
  })
  .catch((error) => {
    console.error('Error:', error);
    dispatch({ type: 'PLAN_UPLOAD', payload: error });
  });
  

}
