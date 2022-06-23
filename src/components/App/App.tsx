import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {NewsFooter, NewsLogo, MainPega, Page404} from "../index";

import './App.scss';
import {useMemo} from "react";


function App() {

	return (
		<Router>
			<div className="App">
				<NewsLogo/>
				<Routes>
					<Route path="/" element={<MainPega/>}/>
					<Route path="*" element={<Page404/>}/>
				</Routes>
				<NewsFooter/>
			</div>
		</Router>
  );
}

export default App;




