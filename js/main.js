import { initGallery } from './gallery-mini.js';
import { setFormSubmit, closeLoadForm } from './form.js';
import { showSendSuccess } from './form-messages.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

getData()
  .then((data) => initGallery(data))
  .catch((err) => showAlert(err.message));

setFormSubmit(() => {
  closeLoadForm();
  showSendSuccess();
});
