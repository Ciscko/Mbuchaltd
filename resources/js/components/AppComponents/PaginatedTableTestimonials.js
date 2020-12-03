import React, { createRef } from 'react';
import ReactPaginate from 'react-paginate'
import 'materialize-css/dist/css/materialize.min.css'
import './tables.css'
import M from 'materialize-css'

import Preloader from '../AppComponents/Preloader';
import Axios from 'axios';
import authService from '../../authService';
import { getToken } from '../../authService';

class PaginatedTable extends React.Component {
    constructor(props) {
        super(props)
        this.columns = props.columns
        this.state = {
            perPage: 5, sort: true, activeSort: this.columns[0].key, filteredData: [],
             currentPage: 0, currentPageData: [], data: [], searchVal: '',  approving : false, deleteId:''
        }

        this.selectRef = createRef()
        this.modalRef = createRef()
        this.modalInst;
        this.setCurrentPageData = this.setCurrentPageData.bind(this)
        this.sortBy = this.sortBy.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handlePageCount = this.handlePageCount.bind(this)
        this.filterRows = this.filterRows.bind(this)
        this.toggle = this.toggle.bind(this)
        this.tokenSource = Axios.CancelToken.source()
    }

    componentDidMount() {
        M.FormSelect.init(this.selectRef.current)
        M.Modal.init(this.modalRef.current)
        this.modalInst = M.Modal.getInstance(this.modalRef.current) 
        Axios.get(`${authService.otherUrl}client`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            cancelToken : this.tokenSource.token
        }).then(res => {
            this.setState({ ...this.state, filteredData: res.data.data, data: res.data.data }, () => {
                this.setCurrentPageData()
            })
        }).catch(err => console.log(err))
    }
    
    componentDidUpdate(prevProps, prevState){
        //this.modalInst = M.Modal.getInstance(this.modalRef.current) 
        if(prevState.approving !== this.state.approving  ){
            
            Axios.get(`${authService.otherUrl}client`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                },
                cancelToken : this.tokenSource.token
            }).then(res => {
                this.setState({ ...this.state, filteredData: res.data.data, data: res.data.data }, () => {
                    this.setCurrentPageData()
                    M.Modal.init(this.modalRef.current)
                    this.modalInst = M.Modal.getInstance(this.modalRef.current) 
                })
            }).catch(err => console.log(err))
        }
    }

     toggle (id) {
        if(id !== ''){
            this.setState({...this.state, approving : true})
            Axios.post(`${authService.otherUrl}client/toggle/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
               
            }).then(res => { 
               
               this.setState({...this.state, approving : false})

            }).catch(err => console.log(err))
        }
    }

    confirmDelete(id){
        
        this.setState({...this.state, deleteId : id})
        this.modalInst.open()
    }

deleteTest(){
    //alert(this.state.deleteId)
    if(this.state.deleteId !== ''){
        this.setState({...this.state, approving : true})
        Axios.post(`${authService.otherUrl}client/delete/${this.state.deleteId}`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
           
        }).then(res => { 
           
           this.setState({...this.state, approving : false})

        }).catch(err => console.log(err))
    }
}

    filterRows(value) {
        if (!value.trim() === '') {
            this.data = this.props.data
        } else {
            this.setState({ ...this.state, searchVal: value.toString().trim().toLowerCase() }, () => {
                let filtered = [...this.data].filter((dataRow) => {
                    if (dataRow[this.state.activeSort].toString().toLowerCase().includes(this.state.searchVal)) {
                        return true
                    } else {
                        return false
                    }
                })
                this.setState({ ...this.state, filteredData: filtered }, () => {
                    this.setCurrentPageData()
                })
            })
        }
    }

    setCurrentPageData() {
        let offset = this.state.currentPage * this.state.perPage
        let filtered = this.state.filteredData
        this.currentPageData = filtered.slice(offset, parseInt(offset) + parseInt(this.state.perPage))
        this.setState({ ...this.state, currentPageData: this.currentPageData })
    }

    sortBy(key) {
        //Sequencial state updates need callback since they are asynchronous.
        this.setState({ ...this.state, sort: !this.state.sort }, () => {
            this.setState({ ...this.state, activeSort: key }, () => {
                this.state.filteredData.sort((a, b) => {
                    if ((a[key] > b[key])) { return this.state.sort ? 1 : -1 }
                    if ((a[key] < b[key])) { return this.state.sort ? -1 : 1 }
                    if ((a[key] === b[key])) { return 0 }
                })
                this.setCurrentPageData()
            })
        })
    }
    handleClick(current) {
        this.setState({ ...this.state, currentPage: current.selected }, () => {
            this.setCurrentPageData()
        })
    }

    handlePageCount(count) {
        this.setState({ ...this.state, perPage: count, currentPage: 0 }, () => {
            this.setCurrentPageData()
        })
    }
   
    render() {
        this.data = this.state.data
        return (
            <>
            {
                this.state.approving ? 
                <Preloader message="Processing..."/>
                :
                <div className="section">
                    
                        <div ref={this.modalRef} id="modal1" className="modal">
                            <div className="modal-content">
                                <h4>Are you sure to delete ?</h4>
                            </div>
                            <div className="center">
                                <a href="#!" onClick={() =>this.deleteTest()} className="btn modal-close red waves-effect">YES</a>
                                <a href="#!" className="btn modal-close green waves-effect">NO</a>
                            </div>
                            <br></br>
                        </div>
                    
                <div className="">
                    <div className="input-field" style={{'paddingLeft': '30px', 'paddingRight': '30px'}}>
                        <label htmlFor="filter" style={{'paddingLeft': '30px', 'paddingRight': '30px'}}>Search...</label>
                        <input onChange={(e) => this.filterRows(e.target.value)} name="filter" value={this.state.searchVal} type="text" id="filter" />
                    </div>
                </div>

                {
                    (this.data.length > 0) ?
                        <>
                            <table className="responsive-table highlight centered">
                                <thead>
                                    <tr>
                                        {
                                            this.columns.map((header, index) => {
                                                return (
                                                    <th onClick={() => this.sortBy(header.key)} key={index}>
                                                        {header.value}
                                                        <span>
                                                            {this.state.activeSort === header.key ?
                                                                <i className="material-icons right">{this.state.sort ? 'arrow_drop_down' : 'arrow_drop_up'}</i>
                                                                :
                                                                <i className="material-icons right">list</i>
                                                            }
                                                        </span>
                                                    </th>

                                                )
                                            })
                                        }
                                        <th style={{'minWidth': '200px'}}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.currentPageData.map((row, index) => {
                                            return (
                                                <tr key={index}>
                                                    {
                                                        Object.values(row).map((cellvalue, index) => {
                                                            return (
                                                                <td key={index}>
                                                                    {cellvalue}
                                                                </td>
                                                            )
                                                        })
                                                    }
                                                    <td>
                                                        <a onClick={() => this.toggle(Object.values(row)[0])} className="btn pink">
                                                        {
                                                            'Approved' === Object.values(row)[5] ? <i className="material-icons">done</i>
                                                            : 
                                                            <i className="material-icons">dehaze</i>
                                                        }
    
                                                        </a> 
                                                        <a onClick={() => this.confirmDelete(Object.values(row)[0])} className="btn red">
                                                                <i className="material-icons">delete</i>
                                                        </a>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                            <div className="row">
                                <div className="input-field col l2 m2 s12 center">
                                    <select className="browser-default" value={this.state.perPage} ref={this.selectRef} name="pageno" onChange={(e) => this.handlePageCount(e.target.value)}>
                                        {
                                            [5, 10, 20, 30, 50, 100, this.data.length].map((amt, index) => {
                                                return (
                                                    <option key={index} value={amt}>{amt}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col l10 m10 s12">
                                    <ReactPaginate
                                        pageCount={Math.ceil(this.data.length / this.state.perPage)}
                                        pageRangeDisplayed={5}
                                        marginPagesDisplayed={2}
                                        previousLabel="Previous"
                                        nextLabel="Next"
                                        nextClassName="waves-effect labelnp"
                                        previousClassName="waves-effect labelnp"
                                        breakLabel="..."
                                        onPageChange={(current => this.handleClick(current))}
                                        initialPage={this.state.currentPage}
                                        containerClassName="pagination center"
                                        pageClassName="waves-effect"
                                        activeClassName="active"
                                        disabledClassName="disabled"
                                    />
                                </div>
                            </div>
                        </>
                        :
                        <div className="center container">
                            <Preloader message="No data available!"/>
                        </div>
                }
            </div>
            }
            </>
        );
    }
}
export default PaginatedTable;