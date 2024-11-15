import { useEffect } from "react";
import { ItemViewModel } from "../viewmodels/ItemViewModel";
import ItemList from "../components/ItemList";

const Home = () => {
	const viewModel = new ItemViewModel();

	useEffect(() => {
		viewModel.fetchItems();
	}, []);

	return <ItemList viewModel={viewModel} />;
};

export default Home;