import propTypes from 'prop-types';


// limit : 페이지 얼만큼 보이게 할지
const Pagination = ({ currentPage, numberOfPages, onClick, limit }) =>{

    const currentSet = Math.ceil(currentPage/limit);  
    const strartPage = limit * (currentSet - 1) + 1;

    const lastSet = Math.ceil(numberOfPages/limit);
    const numberOfPageForSet = currentSet === lastSet &&
                               numberOfPages % limit !== 0 ? numberOfPages % limit : limit; // 마지막 세트일때 남은 페이지 개수  
    
    

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
                { currentSet !== 1 &&
                    <li className="page-item">
                        <div 
                            className="page-link cursor-pointer"
                            onClick={() => onClick(strartPage - limit)}
                        >
                            Previous
                        </div>
                    </li>
                }

                {
                    Array(numberOfPageForSet).fill(strartPage)
                                        .map((value, index) => value + index)
                                        .map((pageNumber) => {
                                            return (
                                                <li 
                                                    key = {pageNumber} 
                                                    className={`page-item ${currentPage === pageNumber ? 'active' : ''} `}
                                                >
                                                    <div 
                                                        className="page-link cursor-pointer" 
                                                        onClick={() => {onClick(pageNumber)}}
                                                    >
                                                        {pageNumber}
                                                    </div>
                                                </li>
                                            );
                                        })
                }

                { currentSet !== lastSet && 
                    <li className="page-item">
                        <div 
                            className="page-link cursor-pointer"
                            onClick={() => onClick(strartPage + limit)}
                        >
                            Next
                        </div>
                    </li>
                }
            </ul>
        </nav>
    );
}

Pagination.propTypes = {
    currentPage : propTypes.number,
    numberOfPages : propTypes.number.isRequired,
    onClick : propTypes.func.isRequired,
    limit : propTypes.number,
}

Pagination.defaultProps ={
    currentPage : 1,
    limit : 5, 
}

export default Pagination;