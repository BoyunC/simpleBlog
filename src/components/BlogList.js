import axios from "axios";

import { useState, useEffect , useCallback, useRef } from "react";
import { useHistory, useLocation } from 'react-router-dom';
import { bool } from 'prop-types';
import { useSelector } from "react-redux";

// import { v4 as uuidv4} from 'uuid';

import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "./Pagination";
import useToast from "../hooks/toast";

// import Toast from "./Toast";
//import useToast from "../hooks/toast";


// const BlogList = ({isAdmin, addToast}) => {
const BlogList = ({isAdmin}) => {   
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');
    
    
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [numberOfPosts, setNumberOfPosts] = useState(0);  // 총 포스트 수 
    const [numberOfPages, setNumberOfPages] = useState(0);  // 총 페이지 수
    const limit = 5;                                        // 페이지당 글 개수 
    
    const [searchText, setSearchText] = useState('');

    const { addToast } = useToast();



    // const toasts = useSelector((state) => {
    //     return state.toast.toasts;
    // }) // state: 전체 redux, state.name.initailize안의 값 

    // console.log('hello : ' , toasts);

    //const [toasts, addToast, deleteToast] = useToast();

    //const [toasts, setToasts] = useState([]);
    // const toasts = useRef([]);
    // const [toastRerender, setToastRerender] = useState(false);

    
    const onClickPageButton = (page) => {
        history.push(`${location.pathname}?page=${page}`);
        setCurrentPage(page);
        getPosts(page);
    }


    const onSearch = (e) => {
        if (e.key === 'Enter') {
            getPosts(1);
        }
    }
    
    // getPosts= useCallback((page=1) => {}, [isAdmin, searchText])
    const getPosts = ( page = 1 ) => { 
        
        //setCurrentPage(page);
        
        let params = {
            _page : page,
            _limit : limit,
            _sort : 'id',
            _order : 'desc',
            title_like : searchText, 
        };
        
        if (!isAdmin) {
            params = {...params, publish : true};
        }

        axios.get(`http://localhost:3001/posts`, {
            params, 
        }).then((res) => {
            setPosts(res.data);
            console.log(posts);
            setLoading(false);
            setNumberOfPosts(res.headers.get('X-Total-Count'));
        });
    };

    const deleteBlog = (e, id) => {
        e.stopPropagation();
        axios.delete(`http://localhost:3001/posts/${id}`).then(()=>{
            
            setPosts( prevPosts =>  prevPosts.filter(post => post.id !== id ));
            
            addToast({
                text: "Successfully Delete",
                type : "success"
            });

                // setPosts( prevPosts => {
                //     return prevPosts.filter(post => {
                    //         return post.id !== id; // 아닌 경우만 return 한다는것, 같은 경우엔 filter 처리
                    //     })
                    // })
        });
    }
            
    const renderBlogList = () =>{
        if(loading) {
            return (
                <LoadingSpinner />
            );
        }

        if(posts.length === 0 ){
            return (
                <div className="text-center mt-5"><h3>No Blog Posts Found</h3></div>
            )
        }
                
        return posts.map((post) => { 
            return (
                        
                //<Card key={post.id} title={post.title}/>
                // 컴포넌트들에는 이벤트를 걸수가 없음 => 함수를 파라미터값으로 전달 
                <Card 
                key={post.id} 
                title={post.title}
                onClick={() => history.push(`/blogs/${post.id}`)}
                >

                { 
                    isAdmin ? 
                    <button 
                    className="btn btn-danger btn-sm"
                    onClick={(e) => deleteBlog(e, post.id)}>
                            Delete
                        </button> : null
                }

                </Card>
            );
        });
    }
    

    useEffect(() => {
        setNumberOfPages(Math.ceil(numberOfPosts / limit));
    }, [numberOfPosts]); // 글이 추가되거나 삭제되는 경우 재실행되게 하기 위함


    // pageParam, getPosts
    useEffect(()=>{
        //pageParam은 String 타입이기 때문에 형변환 필수
        setCurrentPage(parseInt(pageParam) || 1);
        currentPage(parseInt(pageParam) || 1);
    }, []); // 빈배열일 경우 단 한번만 실행됨 
    
    
    return (
        <div>
            {/* <Toast toasts={toasts} deleteToast={deleteToast}/> */}
            <input 
                type="text"
                placeholder="Search..."
                className="form-control"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={onSearch}
            />
            <hr/>
            {renderBlogList()}
            <div className="mt-5"></div>
            {
                numberOfPages > 1 && 
                <Pagination currentPage={currentPage} numberOfPages={numberOfPages} onClick={onClickPageButton}/>
            }
        </div>
    );

}

BlogList.propTypes = {
    isAdmin : bool,
}

BlogList.defaultProps = {
    isAdmin : false,
}

export default BlogList;
