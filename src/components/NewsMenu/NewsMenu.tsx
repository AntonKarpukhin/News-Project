import {IChangeChapter} from "./NewsMenuProps";

import './NewsMenu.scss';

export const NewsMenu = ({changeChapter}: IChangeChapter) => {

	return (
		<header className="menu">
			<div className="menu__line"></div>
			<div className="menu__wrapper">
				<button className="menu__item" onClick={() => changeChapter('ru')}>Russian</button>
				<button className="menu__item" onClick={() => changeChapter('us')}>USA</button>
				<button className="menu__item" onClick={() => changeChapter('fr')}>France</button>
				<button className="menu__item" onClick={() => changeChapter('de')}>Germany</button>
				<button className="menu__item" onClick={() => changeChapter('it')}>Italy</button>
				<button className="menu__item" onClick={() => changeChapter('jp')}>Japan</button>
			</div>
			<div className="menu__line"></div>
		</header>
	)
}




