import { initGallery } from './gallery-mini.js';
import { setFormSubmit, closeLoadForm } from './form.js';
import { showSendSuccess } from './form-messages.js';
import { getData } from './api.js';

getData().then((data) => {
  initGallery(data);
});

setFormSubmit(() => {
  closeLoadForm();
  showSendSuccess();
});
