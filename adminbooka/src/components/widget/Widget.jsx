import React from 'react'
import './widget.scss'
import { BiUpArrowAlt } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { MdOutlineShoppingBag } from 'react-icons/md'
import { BiCoinStack } from 'react-icons/bi'

const Widget = (props) => {
    let data;

    const amount = 100;
    const percentage = 20;

    switch (props.type) {
        case "user":
            data = {
                title: "USERS",
                isMoney: false,
                link: "See All Users",
                icon: <FaUserCircle className='icon' style={{
                    backgroundColor: "rgba(255,0,0,0.2)",
                    color: "red"
                }} />
            };
            break;
        case "order":
            data = {
                title: "ORDERS",
                isMoney: false,
                link: "View All Users",
                icon: <MdOutlineShoppingBag className='icon' style={{
                    backgroundColor: "rgba(0,128,0,0.2)",
                    color: "green"
                }} />
            };
            break;
        case "earnings":
            data = {
                title: "USERS",
                isMoney: true,
                link: "View Net Earnings",
                icon: <BiCoinStack className='icon' style={{
                    backgroundColor: "rgba(0,0,128,0.2)",
                    color: "blue"
                }} />
            };
            break;
        case "balance":
            data = {
                title: "BALANCE",
                isMoney: true,
                link: "See Details",
                icon: <FaUserCircle className='icon' style={{
                    backgroundColor: "rgba(128,0,128,0.2)",
                    color: "purple"
                }} />
            };
            break;
        default:
            break;
    }

    return (
        <div className='widget'>
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.isMoney && "$"} {amount}</span>
                <span className="link">{data.link}</span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <BiUpArrowAlt />
                    {percentage}%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

export default Widget