export const uploadPlan = (file) => async dispatch => {
  async function postData(url, data) {
    const response = await fetch(url, {
      method: 'POST', 

      headers: {
        'Content-Type': 'media'
      },
      body: data // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData('', file)
    .then((data) => {
      console.log(data); // JSON data parsed by `response.json()` call
    dispatch({ type: 'PLAN_UPLOAD', payload: data });
  });
}
