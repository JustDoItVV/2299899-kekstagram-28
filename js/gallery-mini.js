const thumbnailsTemplate = document.querySelector('#picture').content;
const thumbnailsElement = document.querySelector('.pictures');
const thumbnailsFragment = document.createDocumentFragment();

const renderThumbnails = (photoData) => {
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

export { renderThumbnails };
