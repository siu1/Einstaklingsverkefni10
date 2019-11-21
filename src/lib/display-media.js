// todo vísa í rétta hluti með import
import getRandomImage from './nasa-api';
import { save, load } from './storage';
import { el } from './helpers';

// breytur til þess að halda utan um html element nodes
let title; // titill fyrir mynd á forsíðu
let text; // texti fyrir mynd á forsíðu
let img; // mynd á forsíðu, ef viðeigandi
let video; // myndband á forsíðu, ef viðeigandi

let image; // object sem inniheldur núverandi mynd á forsíðu.

/*
 * Sækir nýja Mynd af handahófi frá Nasa API og birtir hana á forsíðunni
 * ásamt titli og texta.
 */
async function getNewImage() {
  image = await getRandomImage();
  title.textContent = image.title;
  text.textContent = image.text;
  if (image.type === 'image') {
    img.src = image.mediaUrl;
    img.style.display = 'visible';
    video.style.display = 'none';
  } else {
    video.src = image.mediaUrl;
    video.style.display = 'visible';
    img.style.display = 'none';
  }
}

/*
 * Vistar núverandi mynd í storage.
 */
function saveCurrentImage() {
  save(image.type, image.mediaUrl, image.text, image.title);
}

/*
 * Upphafsstillir forsíðuna. Setur event listeners á takkana, og sækir eina mynd.
 *
 */
export default function init(apod) {  /* eslint-disable-line */
  img = document.querySelector('.apod__image');
  text = document.querySelector('.apod__text');
  title = document.querySelector('.apod__title');
  video = document.querySelector('.apod__video');
  document.querySelector('#new-image-button').addEventListener('click', getNewImage);
  document.querySelector('#save-image-button').addEventListener('click', saveCurrentImage);
  getNewImage();
}

/*
 * Fall fyrir favourites.html. Sér um að sækja allar vistuðu myndirnar og birta þær ásamt
 * titlum þeirra.
 */
export function loadFavourites() {
  const mainDocument = document.querySelector('main');
  const ourImages = load();
  ourImages.forEach((obj) => {
    const ourTitle = document.createElement('h1');
    ourTitle.textContent = obj.title;
    let ourMedia;
    if (obj.type === 'image') {
      ourMedia = document.createElement('img');
      ourMedia.src = obj.mediaUrl;
      ourMedia.classList.add('apod__image');
    } else {
      ourMedia = document.createElement('video');
      ourMedia.src = obj.mediaUrl;
      ourMedia.classList.add('apod__video');
    }
    const newDiv = el('div', ourTitle, ourMedia);
    newDiv.classList.add('apod');
    mainDocument.appendChild(newDiv);
  });
}
