import { useParams, useHistory } from 'react-router';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import LoadingSpinner from '../components/LoadingSpinner';


const ShowPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    //const history = useHistory();

    const getPost = () => { 
        axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
            setPost(res.data);
            setLoading(false);
        });
    }

    useEffect(()=>{
        getPost();
    }, [id]); 

    const printData = (timestamp) => {
        return new Date(timestamp).toLocaleString();
    }

    if(loading) {
        return (
            <LoadingSpinner/>
        );
    } 

    return (
        <div className='text-center'>
            <h1>{post.title}</h1>
            <small className='text-muted'>{printData(post.createdAt)}</small>

            <div className='d-flex'>
                <div className='flex-grow-1'></div>
                <Link className='btn btn-sm btn-secondary mx-2' to={`/blogs/${id}/edit`}>Edit</Link>
                <Link className='btn btn-sm btn-danger' to="#">Delete</Link>
            </div>

            <hr/>
            <p>{post.body}</p>
        </div>
    );
}

export default ShowPage;