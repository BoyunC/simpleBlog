import { Link } from 'react-router-dom';
import BlogList from "../components/BlogList";


const AdminPage = ({addToast}) => {

    return (

        <div>
            <div className="d-flex justify-content-between">
                <h1 className="mb-5">Admin Page</h1>
                <Link to="/blogs/create" className="btn btn-success h-25 align-self-center">
                    Create New
                </Link>
            </div>
            {/* <BlogList isAdmin = {true} addToast={addToast}/> */}
            <BlogList isAdmin = {true}/>
        </div>
    );
}


export default AdminPage;