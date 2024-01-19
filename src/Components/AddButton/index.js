import React from "react";
import "./addButton.css";
const AddButton = ({onClick})=>{
    return(
        <div className="addButton" onClick={onClick}>
            <img className="add-icon" src="add-icon.png" alt=""/>
            <p className="button-text">Add</p>
        </div>
    )
}
export default AddButton;