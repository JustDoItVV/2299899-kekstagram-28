import { renderThumbnails } from './gallery-mini.js';
import { thumbnailsAddEventClick } from './gallery-fullsize.js';
import './form.js';
import { getData } from './api.js';

getData().then((data) => {
  renderThumbnails(data);
  thumbnailsAddEventClick(data);
});
