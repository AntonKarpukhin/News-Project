export interface INewsSlide {
	source: {id: string, name: string}
	id: string;
	name: string;
	content: string;
	description: string;
	publishedAt: string;
	title: string;
	urlToImage: string;
	url: string
}

export interface INewsSlides{
	articles: INewsSlide[]
}








