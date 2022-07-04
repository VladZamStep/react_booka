import React, { useState } from 'react'
import useFetch from '../../../components/hooks/useFetch';
import '../newPage.scss'

const Featured = (props) => {
    return (
        <div className="selectOption">
            <label>Featured</label>
            <select id="featured" onChange={props.handleChange}>
                <option value={false}>No</option>
                <option value={true}>Yes</option>
            </select>
        </div>
    )
}

export default Featured