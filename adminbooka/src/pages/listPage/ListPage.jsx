import Datatable from '../../components/datatable/Datatable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './listPage.scss'

const ListPage = ({ columns }) => {
    return (
        <div className='listPage'>
            <Sidebar />
            <div className="listPageContainer">
                <Navbar />
                <Datatable columns={columns} />
            </div>
        </div>
    )
}

export default ListPage