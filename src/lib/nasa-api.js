import { randomDate } from './helpers';
/**
 * Sækir Myndir frá nasa API. Til þess að sjá dæmi um json svari sjá apod.json
 */

// API lykill til að fá aðgang að nasa gögnum.
const API_KEY = 'AohJz564IVYcWmkAoaFe1SASXOsLuPJhF8gS1FMx';
// Slóð að sækja myndir frá. Dæmi um heila slóð https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2019-11-10
const URL = 'https://api.nasa.gov/planetary/apod';


/**
 * Sækir mynd af handahófi frá APOD API hjá nasa
 *
 * @returns {Promise} sem mun innihalda upplýsingar um mynd/myndband hjá nasa.
 */
export default async function getRandomImage() {
  const ourRandomDate = randomDate();
  const ourUrl = URL.concat('?api_key=', API_KEY, '&date=', ourRandomDate);
  const data = await fetch(ourUrl);
  const {
    media_type: type,
    url: mediaUrl,
    explanation: text,
    title,
  } = await data.json();

  return {
    type, mediaUrl, text, title,
  };
}
