import React from 'react'
import './featuredChart.scss'
import { BiDotsVertical } from 'react-icons/bi'
import { CircularProgressbar } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'

const FeaturedChart = () => {
    return (
        <div className='featured'>
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <BiDotsVertical className='icon' />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">$420</p>
                <p className="description">Previous transactions processing. Last payments may not be included.</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult positive">
                            <BiUpArrowAlt />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Week</div>
                        <div className="itemResult">
                            <BiUpArrowAlt />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult negative">
                            <BiDownArrowAlt />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default FeaturedChart