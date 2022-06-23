export interface ISelectSlider {
	select: string
}

export interface ISliderProps {
	id: string;
	name: string;
	content: string;
	description: string;
	publishedAt: string;
	title: string;
	urlToImage: string;
	url: string
}

export interface ViewProps {
	slider: ISliderProps,
	nSlide: number,
	handleClick: (move: number) => void
	opened: (url: string) => void
}


