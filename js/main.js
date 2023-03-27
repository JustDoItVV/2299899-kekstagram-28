import { renderThumbnails } from './gallery-mini.js';
import { setThumbnailsClick } from './gallery-fullsize.js';
import { setFormSubmit, closeLoadForm } from './form.js';
import { showSendSuccess } from './form-messages.js';
import { getData } from './api.js';

getData().then((data) => {
  renderThumbnails(data);
  setThumbnailsClick(data);
});

setFormSubmit(() => {
  closeLoadForm();
  showSendSuccess();
});
