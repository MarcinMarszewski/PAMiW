/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from "react-chartjs-2";

import {
  CardBody
} from "reactstrap";

import PanelHeader from "components/PanelHeader/PanelHeader.js";


function Statistics() {
const [booksData, setBooksData] = useState({ labels: [], datasets: [] });

const fetchBooks = async () => {
	try {
	  const response = await axios.get('/api/books');

	  const genreCount = response.data.reduce((acc, book) => {
		acc[book.genre] = (acc[book.genre] || 0) + 1;
		return acc;
	  }, {});

	  const labels = Object.keys(genreCount).sort();
      const data = labels.map(label => genreCount[label]);

	  setBooksData({
		labels: labels,
		datasets: [
		  {
			label: 'Total Books',
			data: data,
			backgroundColor: 'rgba(75, 192, 192, 0.2)',
			borderColor: 'rgba(75, 192, 192, 1)',
			borderWidth: 1,
		  },
		],
	  });
	} catch (error) {
	  console.error('Error fetching books:', error);
	}
  };

useEffect(() => {
	fetchBooks()
}, []);

return (
	<>
	<PanelHeader size="sm" />
		<CardBody>
			<div className="chart-area" style={{ height: '500px' }}>
				<Bar
					data={booksData}
					options={{
						responsive: true,
						maintainAspectRatio: false,
						scales: {
							y: {
								beginAtZero: true,
							},
						},
					}}
				/>
			</div>
		</CardBody>
	</>
);
}

export default Statistics;
