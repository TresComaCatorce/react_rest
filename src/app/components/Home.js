import React from "react";

import { Loading } from "./Loading";
import { ResultList } from "./ResultList";

export class Home extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state =
		{
			error: null,
			isLoaded: false,
			items: []
		};
	};

	componentDidMount() {
		const errorOnLoadData = (error) => {
			this.setState
			(
				{
					isLoaded: true,
					error: error
				}
			);
		};

		const dataLoaded = (data) =>
		{
			console.log("asd", data);
			this.setState
			(
				{
					isLoaded: true,
					items: data.items,
					percent: data.percent
				}
			);
		}

		processData(dataLoaded, errorOnLoadData);
	};

	render()
	{
		const {error, isLoaded, items, percent} = this.state;

		if(error)
		{
			<div>Error</div>
		}
		if(!isLoaded)
		{
			return <Loading/>
		}
		else
		{
			return (
				<div>
					<ResultList items={items}/>
					<br/>
					<div className="alert alert-primary border shadow p-3 mb-5 rounded">
						<h4>Porcentaje de personas cuyo nombre y apellido sumados tienen mas de 12 caracteres es: <b>{percent}%</b></h4>
					</div>
				</div>
			  );
		}
	};
}

const processData = (dataLoaded, errorOnLoadData) =>
{
	let retorno =
	{
		percent: undefined,
		items: []
	};
	let totalPages, actualPage;

	const succGetPage = (result) =>
	{
		totalPages ? undefined : totalPages = result.total_pages;
		actualPage = result.page;

		result.data.forEach( (item) =>
		{
			retorno.items.push(item);
		});

		if( totalPages > actualPage )
		{
			getPage( parseInt(actualPage)+1, succGetPage, errorOnLoadData);
		}
		else if( totalPages === actualPage )
		{
			retorno.percent = calculatePercent(retorno.items);
			dataLoaded(retorno);
		}
	}

	getPage( undefined, succGetPage, errorOnLoadData);
};

const getPage = (pageNumber, succ, error) =>
{
	let queryPageParam = pageNumber ? "?page="+pageNumber : "";
	fetch("https://reqres.in/api/users"+queryPageParam)
		.then(res => res.json())
		.then(
			succ,
			error
		);
};



const calculatePercent = (items) =>
{
	let retorno;
	let cantLetras;
	let superanDoce = 0;
	const totalPersonas = items.length;

	items.forEach( (item) =>
	{
		let cantLetras = item.first_name.length + item.last_name.length;

		if(cantLetras>12)
		{
			superanDoce++;
		}

		cantLetras = undefined;
	});

	retorno = Math.round( ((superanDoce * 100)/totalPersonas)*100 )/100;

	return retorno;
}