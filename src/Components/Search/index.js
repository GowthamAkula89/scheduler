import React from 'react';
import "./search.css";
const Search = ()=>{
    return(
        <div className='search-container'>
            <input className='search' type='text' placeholder='  Search'/>
            <img className='search-icon' src='search-icon.png' alt=''/>
        </div>
    )
}
export default Search;