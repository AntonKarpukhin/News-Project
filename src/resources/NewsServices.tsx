import {useHttp} from "../hooks/http.hook";
import {INewsSlide, INewsSlides} from "./NewsServicesProps";

const NewsServices = () => {

	const {loading, error, request, clearError, opened} = useHttp();

	const _apiBase = 'https://newsapi.org/v2/top-headlines?'
	const _apiKey = '4ea227669cb64ee7aa6529eed0563f2e';
	// const _apiKey = 'd951f8ab8c794a349f297acfcd4cf7c5';
	const _baseOffset = 1;

	const getSlide = async (country: string, id: number) => {
		const res = await request<INewsSlides>(`${_apiBase}country=${country}&apiKey=${_apiKey}`);
		if (!res) throw new Error('Error')
		return _transformNews(res.articles[id])
	}

	const getSlides = async (country: string, arg: number = _baseOffset) => {
		const res = await request<INewsSlides>(`${_apiBase}country=${country}&apiKey=${_apiKey}`);
		if (!res) throw new Error('Error')
		return res.articles.filter((item, i) => i <= arg)
	}

	 const _transformNews = (news: INewsSlide) => {
		return {
			id: news.source.id,
			name: news.source.name,
			content: news.content,
			description: news.description ? `${news.description.slice(0, 100)}...` : 'There is no description for this character',
			publishedAt: news.publishedAt,
			title: news.title ? `${news.title.slice(0, 100)}...` : 'There is no description for this character',
			urlToImage: news.urlToImage,
			url: news.url
		}
	 };

	return {loading, error, getSlide, getSlides, clearError, opened}
}


export default NewsServices;