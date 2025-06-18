import './styles/Mainpage.css';
import CreateQuizForm from "./CreateQuizForm";


function Mainpage() {
    return (
        <div className="mainpage">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main content area of the application.</p>
            <CreateQuizForm />
        </div>
    );
}

export default Mainpage;