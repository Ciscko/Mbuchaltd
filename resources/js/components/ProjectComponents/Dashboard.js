import React from 'react';
import { Link } from 'react-router-dom';
import authService from '../../authService';

const Dashboard = () => {
    const items = [
        { link: '/admin', title: 'Dashboard' },
        { link: '/admin/about', title: 'About' },
        { link: '/admin/services', title: 'Services' },
        { link: '/admin/projects', title: 'Projects' },
        { link: '/admin/gallery', title: 'Gallery' },
        { link: '/admin/client', title: 'Testimonials' },
        // { link: '/admin', title: 'Dashboard' },
        { link: '/admin/register', title: 'Register' },
        { link: '/admin/slider', title: 'Slider' },
        { link: '/admin/contact', title: 'Contacts' },
        { link: '/admin/settings', title: 'Settings' }
    ]
    return (
        <div className="card main-card">
            <div className="container center">
                <h4>DASHBOARD</h4><hr></hr>
                <div className="row">
                    {
                        items.map((item, index) => {
                            return (
                                <Link to={item.link} key={index}>
                                    <div className="col s12 l4 m4">
                                        <div className="card-panel teal">
                                            <span className="white-text">
                                                <h5>{item.title}</h5>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                    <a href={authService.staticUrl}>
                                    <div className="col s12 l4 m4">
                                        <div className="card-panel teal">
                                            <span className="white-text">
                                                <h5>Site</h5>
                                            </span>
                                        </div>
                                    </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;