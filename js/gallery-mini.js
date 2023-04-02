import { sortRandom, sortPopular } from './util.js';
import { openBigPicture } from './gallery-fullsize.js';
import { debounce } from './util.js';

const Filters = {
  'filter-default': (array) => array.slice(),
  'filter-random': (array) => array.slice().sort(sortRandom).slice(0, 10),
  'filter-discussed': (array) => array.slice().sort(sortPopular),
};

let serverData;

const thumbnailsTemplate = document.querySelector('#picture').content;
const thumbnailsElement = document.querySelector('.pictures');
const thumbnailsFragment = document.createDocumentFragment();
const filtersElement = document.querySelector('.img-filters');

const clearThumbnails = () => {
  const currentThumbnails = thumbnailsElement.querySelectorAll('.picture');
  currentThumbnails.forEach((thumbnail) => thumbnail.remove());
};

const renderThumbnails = (photoData) => {
  clearThumbnails();
  photoData.forEach((photo) => {
    const thumbnail = thumbnailsTemplate.cloneNode(true);
    thumbnail.querySelector('.picture__img').src = photo.url;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.querySelector('.picture__comments').textContent =
      photo.comments.length;
    thumbnail.querySelector('.picture').setAttribute('data-photo-id', photo.id);
    thumbnailsFragment.appendChild(thumbnail);
  });
  thumbnailsElement.appendChild(thumbnailsFragment);
};

const onThumbnailsClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if (thumbnail) {
    evt.preventDefault();
    const pictureId = thumbnail.getAttribute('data-photo-id');
    const pictureData = serverData.find(
      (element) => element.id === Number(pictureId)
    );
    openBigPicture(pictureData);
  }
};

const setOnThumbnailsClick = () => {
  thumbnailsElement.addEventListener('click', onThumbnailsClick);
};

const setOnFiltersClick = (data, callback) => {
  filtersElement.addEventListener('click', (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      const activeButton = filtersElement.querySelector(
        '.img-filters__button--active'
      );
      if (
        activeButton.textContent === evt.target.textContent &&
        activeButton.textContent !== 'Случайные'
      ) {
        return;
      }
      activeButton.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const filterName = evt.target.id;
      callback(Filters[filterName](data));
      setOnThumbnailsClick();
    }
  });
};

const initGallery = (data) => {
  serverData = data;
  const debouncedRenderThumbnails = debounce(renderThumbnails);
  filtersElement.classList.remove('img-filters--inactive');
  setOnFiltersClick(data, debouncedRenderThumbnails);
  renderThumbnails(data);
  setOnThumbnailsClick();
};

export { initGallery };
