import BlogList from "../components/BlogList";


const ListPage = ({ addToast }) => {

    return (

        <div>
            <div className="d-flex justify-content-between mb-5">
                <h1 className="mb-1">Blogs</h1>
            </div>
            <BlogList addToast = {addToast} />
        </div>
    );
}


export default ListPage;