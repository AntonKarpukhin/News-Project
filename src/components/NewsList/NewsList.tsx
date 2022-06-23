import {useEffect, useState} from "react";
import NewsServices from "../../resources/NewsServices";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Spinner from "../Spinner/Spinner";
import {INewListProps, ISelectList} from "./NewsListProps";

import s1 from './icon/11.png'
import './NewsList.scss';

export const NewsList = ({select}: ISelectList) => {

	const [slider, setSlider] = useState<INewListProps[]>([]);
	const [nSlide, setNslide] = useState<number>(7);
	const [newItem, setNewItem] = useState<boolean>(true);

	const {loading, error, getSlides, clearError, opened} = NewsServices();

	useEffect(() => {
		updateNews(0, true);
		clearSlide();
	}, [select]);


	const onSlidersLoaded = (data: INewListProps[]) => {
		setSlider(() => data);
	}

	const updateNews = (offset: number, initial: boolean) => {
		clearError();
		initial ? setNewItem(true) : setNewItem(false);
		getSlides(select, nSlide + offset)
			.then(onSlidersLoaded);
	}

	const doLoadSlide = (offset: number) => {
		setNslide((nSlide) => nSlide + offset)
		updateNews(offset, false);
	}

	const clearSlide = () => {
		setNslide(7)
	}

	const renderSlider = (arr: INewListProps[]) => {
		let slideItem = arr.map((item, i) => {
			return (
				<li key={i} className="list__item">
						{(item.urlToImage && item.urlToImage.endsWith('png')) || (item.urlToImage && item.urlToImage.endsWith('jpg')) ?
							<img src={item.urlToImage} alt="img" className="list__img"/> :
							<img src={s1} alt="slide" className="list__img"/>}
						<div className="list__title">{item.title ? `${item.title.slice(0, 123)}...` : 'There is no description for this character'} </div>
						<button className="list__button list__button-next" onClick={() => opened(item.url)}>read more</button>
				</li>
			)
		})
		return (
			<ul className='list__wrapper'>
				{slideItem}
			</ul>
		)
	};
	const slide = renderSlider(slider);

	const errors = error ? <ErrorMessage/> : null;
	const loaded = loading && newItem ?  <Spinner/> : null;


	return (
		<div className="list">
			<h2>Latest News</h2>
			{errors}
			{loaded}
			{slide}
			<button disabled={nSlide > 19} onClick={() => doLoadSlide(+ 8)} className="list__button list__button-down">Load more</button>
		</div>

	)
}


