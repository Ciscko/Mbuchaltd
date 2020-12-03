
import React from 'react';
import Navigation from './Navigation';
import Dropdown from './Dropdown';
import authService from '../../authService';

const NavigationWrapper = ({children}) => {

    const navbarContent = {
        logo: `${authService.staticUrl}images/office.jpg`,
        items: [
            { link: '/admin', title: 'Dashboard' },
            { link: '/admin/about', title: 'About' },
            { link: '/admin/services', title: 'Services' },
            { link: '/admin/projects', title: 'Projects' },
            { link: '/admin/gallery', title: 'Gallery' },
            { link: '/admin/client', title: 'Testimonials' }
        ]
    }
    const dropdownItems = [
        // { link: '/admin', title: 'Dashboard' },
        { link: '/admin/register', title: 'Register' },
        { link: '/admin/slider', title: 'Slider'},
        { link: '/admin/contact', title: 'Contacts' },
        { link: '/admin/settings', title: 'Settings' }
    ]
    const navbarOptions = {
        edge: 'left'
    }
    return (
    <>
    <Navigation content={navbarContent} options={navbarOptions} navclass="purple">
        <Dropdown dropdownItems={dropdownItems} />
    </Navigation>
        <div>
        {
            children
        }
        </div>
    </>
    );
}
export default NavigationWrapper;