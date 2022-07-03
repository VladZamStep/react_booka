import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import OrdinaryChart from '../../components/ordinaryChart/OrdinaryChart'
import Sidebar from '../../components/sidebar/Sidebar'
import TableList from '../../components/table/TableList'
import './singlePage.scss'

const SinglePage = () => {
    return (
        <div className='singlePage'>
            <Sidebar />
            <div className="singlePageContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editBtn">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src="http://almode.ru/uploads/posts/2021-12/1639127930_28-almode-ru-p-devushka-v-plate-31.jpg"
                                alt=""
                                className='itemImg'
                            />
                            <div className="details">
                                <h1 className="itemTitle">Mary Erra</h1>
                                <div className="delailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">maryerra@gmail.com</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">1324123</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">Derrf erf maryerra@gmail.com</span>
                                </div>
                                <div className="delailItem">
                                    <span className="itemKey">Country:</span>
                                    <span className="itemValue">USA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <OrdinaryChart aspect={5 / 2} title="User Spendings (Last 6 Month)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <TableList />
                </div>
            </div>
        </ div>
    )
}

export default SinglePage