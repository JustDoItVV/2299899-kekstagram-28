import { photoDescriptions } from './data.js';

const thumbnailsTemplate = document.querySelector('#picture').content;
const thumbnailsElement = document.querySelector('.pictures');
const thumbnailsFragment = document.createDocumentFragment();

photoDescriptions.forEach((photoDescription) => {
  const thumbnail = thumbnailsTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = photoDescription.url;
  thumbnail.querySelector('.picture__likes').textContent =
    photoDescription.likes;
  thumbnail.querySelector('.picture__comments').textContent =
    photoDescription.comments.length;
  thumbnail
    .querySelector('.picture')
    .setAttribute('data-photo-id', photoDescription.id);

  thumbnailsFragment.appendChild(thumbnail);
});

thumbnailsElement.appendChild(thumbnailsFragment);
