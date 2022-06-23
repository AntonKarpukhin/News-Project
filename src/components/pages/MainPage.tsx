import React, {useState} from "react";

import {NewsList, NewsSlider, NewsMenu} from "../index";

export const MainPega = () => {

	const [select, setSelect] = useState<string>('ru')

	const changeChapter = (chapter: string) => {
		setSelect(() => chapter)
	}

	return (
		<>
			<NewsMenu changeChapter={changeChapter}/>
			<NewsSlider select={select}/>
			<NewsList  select={select}/>
		</>
	)
}