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
const bigPictureCommentsCounter = bigPictureSection.querySelector(
  '.social__comment-count'
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
    bigPictureCommentsCounter.querySelector('span').textContent,
    10
  );
  for (let i = 1; i <= COMMENT_COUNT; i++) {
    currentComment.classList.remove('hidden');
    currentComment = bigPictureCommentsSection.querySelector('.hidden');

    const counterSpan = bigPictureCommentsCounter.querySelector('span');
    currentCommentNumber += 1;
    counterSpan.textContent = currentCommentNumber;

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
  const commentsAmount = pictureData.comments.length;
  if (commentsAmount !== 0) {
    bigPictureCommentsCounter.innerHTML = `
      <span>0</span>
      из
      <span class="comments-count">${commentsAmount}</span>
      комментариев`;
    pictureData.comments.forEach((comment) =>
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
          <p class="social__text">${comment.message}</p>
        </li>
      `
      )
    );
    bigPictureCommentsLoader.addEventListener('click', onButtonLoadMoreClick);
    bigPictureCommentsLoader.click();
  } else {
    bigPictureCommentsCounter.innerHTML = 'Нет комментариев';
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
