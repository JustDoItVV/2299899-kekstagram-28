import { isEscapeKey } from './util.js';

const COMMENT_COUNT = 5;

const bigPictureSection = document.querySelector('.big-picture');
const bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');
const bigPictureImage = bigPictureSection.querySelector(
  '.big-picture__img > img'
);
const bigPictureLikesCount = bigPictureSection.querySelector('.likes-count');
const bigPictureDescription =
  bigPictureSection.querySelector('.social__caption');
const bigPictureCommentsSection =
  bigPictureSection.querySelector('.social__comments');
const bigPictureCommentsCounterShown = bigPictureSection.querySelector(
  '.comments-count-shown'
);
const bigPictureCommentsCounterAll = bigPictureSection.querySelector(
  '.comments-count-all'
);
const bigPictureCommentsLoader =
  bigPictureSection.querySelector('.comments-loader');

const onDocumentKeydownEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose.click();
  }
};

const onButtonLoadMoreClick = () => {
  let currentComment = bigPictureCommentsSection.querySelector('.hidden');
  let currentCommentNumber = parseInt(
    bigPictureCommentsCounterShown.textContent,
    10
  );
  for (let i = 1; i <= COMMENT_COUNT; i++) {
    currentComment.classList.remove('hidden');
    currentComment = bigPictureCommentsSection.querySelector('.hidden');

    currentCommentNumber += 1;
    bigPictureCommentsCounterShown.textContent = currentCommentNumber;

    if (!currentComment) {
      bigPictureCommentsLoader.classList.add('hidden');
      break;
    }
  }
};

const openBigPicture = (pictureData) => {
  document.body.classList.add('modal-open');
  bigPictureSection.classList.remove('hidden');
  bigPictureCommentsLoader.classList.remove('hidden');
  bigPictureImage.src = pictureData.url;
  bigPictureImage.alt = pictureData.url;
  bigPictureLikesCount.textContent = pictureData.likes;
  bigPictureDescription.textContent = pictureData.description;
  bigPictureCommentsSection.innerHTML = '';
  bigPictureCommentsCounterShown.textContent = 0;
  bigPictureCommentsCounterAll.textContent = pictureData.comments.length;
  if (pictureData.comments.length !== 0) {
    pictureData.comments.forEach((comment) => {
      bigPictureCommentsSection.insertAdjacentHTML(
        'beforeend',
        `
        <li class="social__comment hidden">
          <img
            class="social__picture"
            src="${comment.avatar}"
            alt="${comment.name}"
            width="35" height="35"
          >
          <p class="social__text"></p>
        </li>
      `
      );
      const lastComment =
        bigPictureCommentsSection.querySelector('li:last-child p');
      lastComment.textContent = comment.message;
    });
    bigPictureCommentsLoader.addEventListener('click', onButtonLoadMoreClick);
    bigPictureCommentsLoader.click();
  } else {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  document.addEventListener('keydown', onDocumentKeydownEsc);
};

const closeBigPicture = () => {
  bigPictureSection.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydownEsc);
  bigPictureCommentsLoader.removeEventListener('click', onButtonLoadMoreClick);
};

bigPictureClose.addEventListener('click', closeBigPicture);

export { openBigPicture };
