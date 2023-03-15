import { getRandomInteger, createIdGenerator } from './util.js';

const NAMES = [
  'Артем',
  'Михаил',
  'Александр',
  'Дмитрий',
  'Роман',
  'Иван',
  'Ева',
  'София',
  'Анна',
  'Виктория',
  'Алиса',
  'Полина',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const PHOTO_DESCRIPTIONS = [
  'Отдельный собственный пляж отеля',
  'Вот такой указатель на пляж',
  'Тут снимали первый клип Артура Пирожкова',
  'Персональный оператор',
  'Азиатская кухня',
  'Трансфер до аэропорта',
  'Завтрак чемпионов',
  'Настойка из волчьих ягод',
  'Добраться на остров можно только на таком самолете',
  'Удобно спрячь свои глиномесы под лавку',
  'Пляж огорожен зеленой линией с таким проходом',
  'Продам авто',
  'Кому больше фоток моей еды?',
  'Мой хозяин идиот',
  'Теплый домашние тапки',
  'Скоро будем подниматься пешком на эти горы',
  'Не в моем темпе',
  'Продам гараж',
  'Вырвиглазные ночные тапки',
  'Балкончик с пальмами',
  'Я есть хочу',
  'Море волнуется раз',
  'Клешнеобразное',
  'Тайная сходка иллюминатов',
  'Как настоящий, но не настоящий',
];

const generatePhotoDescriptionId = createIdGenerator();
const generateCommentId = createIdGenerator();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: MESSAGES[getRandomInteger(0, MESSAGES.length - 1)],
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
});

const createPhotoDescription = () => {
  const photoId = generatePhotoDescriptionId();
  const commentArray = Array.from(
    { length: getRandomInteger(0, 16) },
    createComment
  );
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: PHOTO_DESCRIPTIONS[photoId - 1],
    likes: getRandomInteger(15, 200),
    comments: commentArray,
  };
};

const photoDescriptions = Array.from({ length: 25 }, createPhotoDescription);

export { photoDescriptions };
