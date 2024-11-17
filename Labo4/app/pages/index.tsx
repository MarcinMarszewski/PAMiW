import { ItemViewModel } from "../viewmodels/ItemViewModel";
import ItemList from "../components/ItemList";
import {ItemService} from "../services/ItemService";

const Home = () => {
	return <ItemList viewModel={new ItemViewModel(new ItemService())} />;
};

export default Home;