import { refs } from './refs';
import MovieApiService from './MovieApiService';
import { loadAnimationAction } from './renderTrendingPage';
// import './renderTrendingPage';
import './renderSearchResult';
import { clearMarkup } from './renderSearchResult';
import { idItemMarkup } from './markup/markupById';
import { onWatchedBtnClick } from './renderWatchedLib';
import '../js/language/translateOnLangChange';
import '../js/language/language-translate-static';
import { languageTranslate } from './language/language-translate-static';
import { modalTranslate } from './language/translateOnLangChange';

let idsForRender = [];
const movieApiService = new MovieApiService();

refs.queueBtn.addEventListener('click', onQueueBtnClick);

export async function onQueueBtnClick() {
  // const asd = JSON.stringify(localStorage.setItem('set', onQueueBtnClick()));
  refs.watchedBtn.classList.remove('selected');
  refs.queueBtn.classList.add('selected');
  refs.pagination.innerHTML = '';
  refs.paginationSearch.innerHTML = '';

  clearMarkup();
  refs.queueBtn.removeEventListener('click', onQueueBtnClick);

  refs.watchedBtn.addEventListener('click', onWatchedBtnClick);
  refs.queueBtn.removeEventListener('click', onQueueBtnClick);

  const queueMovieId =
    JSON.parse(localStorage.getItem('queue')) === null
      ? []
      : JSON.parse(localStorage.getItem('queue'));

  queueMovieId.length === 0
    ? refs.clockFrame.classList.remove('is-hiden')
    : refs.clockFrame.classList.add('is-hiden');

  queueMovieId.forEach(item =>
    refs.mainMarkup.insertAdjacentHTML('beforeend', idItemMarkup(item))
  );
}
