export const testimageurl = "testImage.jpg";

export const testData = async (dispatch) => {
  const data = await fetch("testJson.json");
  const json = await data.json();
  console.log(json);
  dispatch(json);
};
