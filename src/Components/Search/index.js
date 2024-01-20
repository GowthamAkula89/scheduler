import React from 'react';
import "./search.css";
const Search = ({onChange})=>{
    return(
        <div className='search-container'>
            <input className='search' type='text' placeholder='  Search' onChange={onChange}/>
            <img className='search-icon' src={process.env.PUBLIC_URL + '/search-icon.png'} alt=''/>
        </div>
    )
}
export default Search;