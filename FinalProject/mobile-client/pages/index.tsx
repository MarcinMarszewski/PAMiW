import { TaskViewModel } from "../viewmodels/TaskViewModel";
import ItemList from "../components/ItemList";
import {TaskService} from "../services/TaskService";

const Home = () => {
	return <ItemList viewModel={new TaskViewModel(new TaskService())} />;
};

export default Home;