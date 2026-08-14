import { Link } from "react-router-dom";
import ApiTest from "../components/ApiTest";

function Home() {
    return (
        <div>

            <h1>Home Component</h1>
            <Link to={"/tasks"}>My Tasks</Link>

            <ApiTest />
        </div>


    );

}

export default Home;