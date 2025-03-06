import { catsData } from "./data";

const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn");
const gifsOnlyBtn = document.getElementById("gifs-only-option");
const memeModal = document.getElementById("meme-modal");
const memeModalCloseBtn = document.getElementById("meme-modal-close-btn");
const memeModalInner = document.getElementById("meme-modal-inner");

emotionRadios.addEventListener("change", highlightCheckedOption);

memeModalCloseBtn.addEventListener("click", closeModal);

getImageBtn.addEventListener("click", renderCat);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

function closeModal() {
  memeModal.style.display = "none";
}

function renderCat() {
  const catObject = getSingleCatObject();
  memeModalInner.innerHTML = `
  <img 
    class='cat-img'
    src='./images/${catObject.image}'
    alt='${catObject.alt}'

  />
`;
  memeModal.style.display = "flex";
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();
  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomNumber = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomNumber];
  }
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

    return matchingCatsArray;
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

