import React, { useEffect, useState } from "react";
import "./App.css";
import ResidentsList from "./Components/ResidentsList";
import Search from "./Components/Search";
import Error from "./Components/Error";
import "h8k-components";

const title = "Hacker Dormitory";
function App() {
	const [residents, setResidents] = useState([]);
	const [error, setError] = useState({
		message: "",
		show: false,
	});

	useEffect(() => {
		setError({
			message: "",
			show: false,
		}); // reset error
	}, [residents]);

	return (
		<div className="App">
			<h8k-navbar header={title}></h8k-navbar>
			<div className="layout-column justify-content-center align-items-center w-50 mx-auto">
				<Search setResidents={setResidents} setError={setError} />
				{error.show && <Error message={error.message} />}
				<ResidentsList residents={residents} />
			</div>
		</div>
	);
}

export default App;
