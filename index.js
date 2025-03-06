import { catsData } from "./data";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyBtn = document.getElementById("gifs-only-option");

emotionRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", getMatchingCatsArray);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const checkedEmotion = document.querySelector(
      'input[type="radio"]:checked',
    ).value;
    const isGifChecked = gifsOnlyBtn.checked;

    const matchingCatsArray = catsData.filter((cat) => {
      if (isGifChecked) {
        return cat.isGif && cat.emotionTags.includes(checkedEmotion);
      } else {
        return cat.emotionTags.includes(checkedEmotion);
      }
    });

    console.log(matchingCatsArray);
  }
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
    }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
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
}

renderEmotionsRadios(catsData);

