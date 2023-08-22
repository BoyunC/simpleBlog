import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { bool } from 'prop-types';
import { v4 as uuidv4} from 'uuid';

import propTypes from 'prop-types';
import axios from 'axios';

import Toast from './Toast';
import useToast from '../hooks/toast';

// const BlogForm = ({ editing, addToast }) => {
const BlogForm = ({ editing }) => {

    const { id } = useParams();
    
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const [originalTitle, setOriginalTitle] = useState("");
    const [originalBody, setOriginalBody] = useState("");

    const [publish, setPublish] = useState(false);
    const [originalPublish, setOriginalPublish] = useState(false);

    const [titleError, setTitleError] = useState(false);
    const [bodyError, setBodyError] = useState(false);

    // const [toasts, setToasts] = useState([]);
    // const toasts = useRef([]);
    // const [toastRerender, setToastRerender] = useState(false);

    //custom hook
    //const [toasts, addToast, deleteToast] = useToast()

    const history = useHistory();
    const {addToast} = useToast();

    useEffect(() => {
        if(editing) {
            axios.get(`http://localhost:3001/posts/${id}`).then((res) => {
                setTitle(res.data.title);
                setOriginalTitle(res.data.title);
                setBody(res.data.body);
                setOriginalBody(res.data.body);
                setPublish(res.data.publish);
                setOriginalPublish(res.data.publish);
            });
        }
    }, [id, editing]);

    const isEdited = () => {
        return title !== originalTitle || body !== originalBody || publish !== originalPublish;
    }

    const validateForm = () => {
        let validated = true;
        
        if (title === '') {
            setTitleError(true);
            validated = false;
        } 
        
        if ( body === '') {
            setBodyError(true);
            validated = false;
        }

        return validated;
    }


    const onSubmit = () => { 

        setTitleError(false);
        setBodyError(false);

        if(validateForm()) {
            if(editing) {

                axios.patch(`http://localhost:3001/posts/${id}`, {
                    title,
                    body,
                    publish,
                }).then((res) => {
                    history.push('/blogs');
                    console.log(res);
                })
            
            } else {
    
                // 서버로 데이터 값 전달 => 통신 필요 (axios)
                axios.post('http://localhost:3001/posts', {
                title : title,
                body : body,
                publish : publish,
                createdAt : Date.now()
                }).then(() => {
                    addToast({
                        text: 'Successfully Create New Post',
                        type: 'success',
                    });
                    history.push('/admin');
                });
            
            }
        }

    } 

    const goBack = () => {
        if(editing) {
            history.push(`/blogs/${id}`);
        } else {
            history.push(`/blogs`);
        }
    }

    const onChangePublish = (e) => {
        setPublish(e.target.checked);
    }


    return (
        <div >
            {/* <Toast toasts={toasts} deleteToast={deleteToast}/> */}
            <h1 className='mb-3'>{editing ? 'Edit' : 'Create'} a Blog Post</h1>
            
            <div className='mb-3'>
                <label className='form-label'>Title</label>
                <input 
                    className={`form-control ${titleError ? 'border-danger' : ''}`}
                    value = {title}
                    onChange={(e) => {
                    setTitle(e.target.value);
                    }}
                />
                {
                    titleError &&
                    <div className='text-danger'>
                        Title is isRequired
                    </div>
                }
            </div>

            <div className='mb-3'>
                <label className='form-label'>Body</label>
                <textarea 
                    className={`form-control ${bodyError ? 'border-danger' : ''}`}
                    rows={10} 
                    value = {body} 
                    onChange={(e) => {
                    setBody(e.target.value);
                    }}
                />
                {
                    bodyError && 
                    <div className='text-danger'>
                        Body is isRequired
                    </div>
                }
            </div>

            <div className='form-check mb-3'>
                <input 
                    className='form-check-input' 
                    type='checkbox' 
                    checked={publish}
                    onChange={onChangePublish}
                />
                <label className='form-check-label'> Publish </label>
            </div>
            
            <div className='d-flex'>
                <div className='flex-grow-1'></div>
                <button 
                    className='btn btn-primary'
                    onClick={onSubmit}
                    disabled={editing && !isEdited()}
                >
                    { editing? 'EDIT' : 'POST' }
                </button>
                <button 
                    className='btn btn-danger ms-2'
                    onClick={goBack}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}

BlogForm.protoTypes = {
    editing : bool,
}

BlogForm.defaultProps = {
    editing : false,
}

export default BlogForm;