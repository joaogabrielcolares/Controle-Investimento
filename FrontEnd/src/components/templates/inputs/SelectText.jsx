import React from 'react'

export default props =>

    <div className={`col-5 col-md-${props.col_md}`}>
        <div className="form-group">
            <label>{props.label}</label>
            <select name={props.name} className="form-control"
                onChange={props.onChange}
                value={props.value}>
                {props.children}
            </select>
        </div>
    </div >