import React from "react";

export const ResultList = (props) => {
	return (
		<ul className="list-group list-group-flush">
			{props.items.map(item => (
			<li className="list-group-item list-group-item" key={item.id}>
				<h6>{item.first_name}, {item.last_name} <span class="badge badge-info float-right">Caracteres: {item.first_name.length+item.last_name.length}</span></h6>
			</li>
			))}
		</ul>
	);
};