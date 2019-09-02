import React from 'react'

export default props =>
    <div className={`col-5 col-md-${props.col_md}`} >
        <div className="form-group">
            <label>{props.label}</label>
            <input type="text" className="form-control"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder} />
        </div>
    </div >