
import {useEffect, useState} from "react";
import NewsServices from "../../resources/NewsServices";
import {ReactComponent as Arrow} from './arrow.svg'
import Spinner from '../Spinner/Spinner';
import {ISelectSlider, ISliderProps, ViewProps} from "./NewsSliderProps";
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import s1 from "../NewsList/icon/11.png";
import './NewsSlider.scss'


export const NewsSlider = ({select}: ISelectSlider): JSX.Element => {

	let defaultISlide = {
		id: '',
		name: '',
		content: '',
		description: '',
		publishedAt: '',
		title: '',
		urlToImage: '',
		url: ''
	}

	const [slider, setSlider] = useState<ISliderProps>(defaultISlide);
	const [nSlide, setNslide] = useState<number>(7);
	const [newItem, setNewItem] = useState<boolean>(true);

	const {loading, error, getSlide, clearError, opened} = NewsServices();

	useEffect(() => {
		updateNews(select, nSlide, true);
		// const timerId = setInterval(updateNews, 5000);
		//
		// return () => {
		// 	clearInterval(timerId);
		// }
	}, [select]);

	const onSliderLoading = (data: ISliderProps) => {
		setSlider(() => data);
	}

	const updateNews = (select: string, nSlide: number, initial: boolean) => {
		clearError();
		initial ? setNewItem(true) : setNewItem(false);
		getSlide(select, nSlide)
			.then(onSliderLoading)
	}


	const handleClick = (move:number) => {
		setNslide((slide) => slide + move)
		updateNews(select, nSlide, false);
	}

	const errors = error ? <ErrorMessage/> : null;
	const loaded = loading && newItem ? <Spinner/> : null;


	return (
		<>
			{errors}
			{loaded}
			<View slider={slider} nSlide={nSlide} handleClick={handleClick} opened={opened}></View>
		</>
	)
}

const View = ({slider , nSlide, handleClick, opened}: ViewProps ): JSX.Element => {
	return (
		<>
			<h1>Hot Topics</h1>
			<div className="slider">
				<div className="slider__left">
					{(slider.urlToImage && slider.urlToImage.endsWith('png')) || (slider.urlToImage && slider.urlToImage.endsWith('jpg')) ?
						<img src={slider.urlToImage} alt="slide" className="slider__img"/> :
						<img src={s1} alt="slide" className="slider__img"/>}
					{nSlide > 0 && <button className="slider__arrow slider__arrow-left" onClick={() => handleClick(- 1)}>
                        <Arrow/>
                    </button>}
					{nSlide < 19 && <button className="slider__arrow slider__arrow-right" onClick={() => handleClick(+ 1)} >
                        <Arrow/>
                    </button>}
				</div>
				<div className="slider__right">
					<div className="slider__title">{slider?.description ? slider.description : 'News Portal'}</div>
					<div className="slider__substr">{slider?.title ? slider.title : 'News Portal' }</div>
					<div className="slider__author">{slider?.name ? slider.name : 'News Portal'}</div>
					<button className="slider__button" onClick={() => opened(slider.url)}>read more</button>
				</div>
			</div>
		</>
	)
}
