import { photoDescriptions } from './data.js';

const miniaturesTemplate = document.querySelector('#picture').content;
const miniaturesElement = document.querySelector('.pictures');
const miniaturesFragment = document.createDocumentFragment();

photoDescriptions.forEach((photoDescription) => {
  const miniature = miniaturesTemplate.cloneNode(true);

  miniature.querySelector('.picture__img').src = photoDescription.url;
  miniature.querySelector('.picture__likes').textContent =
    photoDescription.likes;
  miniature.querySelector('.picture__comments').textContent =
    photoDescription.comments.length;
  miniature
    .querySelector('.picture')
    .setAttribute('data-photo-id', photoDescription.id);

  miniaturesFragment.appendChild(miniature);
});

miniaturesElement.appendChild(miniaturesFragment);
