import React, { useEffect, useState } from 'react';
import PaginatedTable from '../AppComponents/PaginatedTableContacts';
import Preloader from '../AppComponents/Preloader';
import Axios from 'axios';
import authService from '../../authService';
import { getToken } from '../../authService';

const Contact = (props) => {
    const [ contacts, setContacts ] = useState([])
    let tokenSource = Axios.CancelToken.source()

    useEffect(() => {
        Axios.get(`${authService.otherUrl}contact`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            
            cancelToken : tokenSource.token
        }).then(res => {
           //console.log(res.data.data) 
            setContacts(res.data.data)
           
        }).catch(err => console.log(err))
        return () => {
            tokenSource.cancel('Cancelled request')
        }
    }, [contacts.length])

    const paginatedColumns = [
        { key: 'id', value: 'ID' },
         { key: 'name', value: 'Name' },
        { key: 'email', value: 'Email' },
        { key: 'phone', value: 'Phone' }, 
        { key: 'message', value: 'Message' }
        //{ key: 'created_at', value: 'Time-Stamp' },
         //{ key: 'updated_at', value: 'Updated At' }
    ]
   
    return (
        <div className="card main-card">
        <div className="container center">
                <h4>CONTACT/QUERIES</h4><hr></hr>
                
                    {
                      contacts.length > 0 ?
                        <div>
                           <PaginatedTable data={contacts} columns={paginatedColumns} />
                        </div>
                        :
                        <Preloader message="Loading Client Queries..."/>
                    }
        </div>
    </div>
    );
}
export default Contact;