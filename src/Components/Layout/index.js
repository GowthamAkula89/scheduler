import React from 'react';
import SchedulerData from "../SchedulerData";
import "./layout.css";
const Layout=()=>{
    return(
        <div className='layout'>
            <div className='left-nav'>
            </div>
            <div className='right-layout'>
                <div className='tab'></div>
                <SchedulerData/>
            </div>
        </div>
    )
}
export default Layout;