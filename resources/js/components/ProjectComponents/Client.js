import React, { useEffect, useState } from 'react';
import PaginatedTable from '../AppComponents/PaginatedTableTestimonials';
import Preloader from '../AppComponents/Preloader';
import Axios from 'axios';
import authService from '../../authService';
import { getToken } from '../../authService';

const Client = (props) => {

  

    const paginatedColumns = [
        { key: 'id', value: 'ID' }, 
        { key: 'name', value: 'Name' },
        { key: 'title', value: 'Title' },
        { key: 'message', value: 'Message' },
        { key: 'time', value: 'Time-Stamp' },
        { key: 'status', value: 'Status' }
    ]
   

    return (
        <div className="card main-card">
        <div className="container center">
                <h4>TESTIMONIALS</h4><hr></hr>
                    {
                        <div>
                           <PaginatedTable columns={paginatedColumns} />
                        </div>
                    }
        </div>
    </div>
    );
}
export default Client;