
/**
 * Hreinsa börn úr elementi
 *
 * @param {object} element Element sem á að hreinsa börn úr
 */
export function empty(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

/**
 * Búa til element og aukalega setja börn ef send með
 *
 * @param {string} name Nafn á element
 * @param  {...any} children Börn fyrir element
 */
export function el(name, ...children) {
  const element = document.createElement(name);

  if (Array.isArray(children)) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else if (child) {
        element.appendChild(child);
      }
    });
  }

  return element;
}

/**
* Skilar tölu af handahófi á bilinu [min, max]
*/
export function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomDate() {
  // Elsta dagsetning sem nasa api getur unnið með er 16.júní 1995
  const oldDate = new Date('June 16, 1995 00::00:00');
  const minTime = oldDate.getTime();
  const maxTime = Date.now();
  const ourTime = randomNumber(minTime, maxTime);
  const ourDate = new Date(ourTime);
  const dd = ourDate.getDate();
  const mm = ourDate.getMonth();
  const yyyy = ourDate.getFullYear();
  return ''.concat(yyyy, '-', mm, '-', dd);
}
