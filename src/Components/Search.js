import React from "react";
import { STUDENTS } from "../studentsList";

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const [year, month, day] = joiningDate.split("-");
	const [yyyy, mm, dd] = validityDate.split("-");
	const maxValid = new Date(yyyy, mm - 1, dd);
	const selected = new Date(year, month - 1, day);
	return maxValid >= selected && maxValid >= today;
}

function Search({ setResidents, setError }) {
	const [name, setName] = React.useState("");
	const [joiningDate, setJoiningDate] = React.useState("");

	function validate() {
		if (!name || !joiningDate) {
			setError({
				show: true,
				message: "Please enter both fields!",
			});
			return;
		}

		const capitalName = name.charAt(0).toUpperCase() + name.slice(1);
		STUDENTS.forEach((student) => {
			let studentName = student.name.toLowerCase();
			let inputName = name.toLowerCase();
			if (studentName === inputName) {
				const valid = checkValidity(joiningDate, student.validityDate);
				valid
					? setResidents((prev) => [...prev, student.name])
					: setError({
							show: true,
							message: `Sorry, ${student.name}'s validity has Expired!`,
					  });
			}
		});
		if (!STUDENTS.map((student) => student.name).includes(capitalName)) {
			console.log(capitalName);
			setError((prev) => ({
				...prev,
				show: true,
				message: `Sorry, ${capitalName} is not a verified student!`,
			}));
		}
	}

	return (
		<div className="my-50 layout-row align-items-end justify-content-end">
			<label htmlFor="studentName">
				Student Name:
				<div>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						id="studentName"
						data-testid="studentName"
						type="text"
						className="mr-30 mt-10"
					/>
				</div>
			</label>
			<label htmlFor="joiningDate">
				Joining Date:
				<div>
					<input
						value={joiningDate}
						onChange={(e) => setJoiningDate(e.target.value)}
						id="joiningDate"
						data-testid="joiningDate"
						type="date"
						className="mr-30 mt-10"
					/>
				</div>
			</label>
			<button
				type="button"
				data-testid="addBtn"
				className="small mb-0"
				onClick={() => validate()}
			>
				Add
			</button>
		</div>
	);
}

export default Search;
