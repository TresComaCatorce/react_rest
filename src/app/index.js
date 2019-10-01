import React from "react";
import { render } from "react-dom";

import { Header } from "./components/Header";
import { Home } from "./components/Home";

class App extends React.Component
{
	render()
	{
		let headerData = {
			"name": "Cristian Ferrero",
			"links":
			[
				{"displayName":"Linkedin", "url":"https://www.linkedin.com/in/ferrerocristian92/", "key":"1"}
			]
		}

		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12 col-sm-12">
						<Header data={headerData}/>
					</div>
				</div>
				<br/>
				<div className="row">
					<div className="col-xs-12 col-sm-12">
						<Home/>
					</div>
				</div>
			</div>
		);
	}
}

render( <App/>, window.document.getElementById("react_rest") );