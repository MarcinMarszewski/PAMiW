import { TaskController } from "@/controllers/TaskController";
import ItemList from "../components/ItemList";
import {TaskService} from "../services/TaskService";

const Home = () => {
	return <ItemList controller ={new TaskController(new TaskService())} />;
};

export default Home;