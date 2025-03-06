import { catsData } from "./data";

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      emotionsArray.push(emotion);
    }
  }
  return emotionsArray;
}

const renderEmotionsRadios = (cats) => {
  const emotions = getEmotionsArray(cats);
  let radioItems = "";
  for (let emotion of emotions) {
    radioItems += `
      <div class='radio'>
        <label for='${emotion}'>${emotion}</label>
        <input
          type='radio'
          id=${emotion}
          value=${emotion}
          name='emotions'
        />
      </div>
  `;
  }
  emotionRadios.innerHTML = radioItems;
};

renderEmotionsRadios(catsData);

