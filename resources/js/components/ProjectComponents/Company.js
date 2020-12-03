import React, { useEffect, createRef, useState } from 'react';
import M from 'materialize-css'
import { Form, Formik } from 'formik';
import * as Yup from 'yup'
import FormControl from '../FormComponents/FormBits/FormControl';
import authService from '../../authService';
import { getToken } from '../../authService';
import Preloader from '../AppComponents/Preloader';
import Axios from 'axios';

const Company = (props) => {

    const tabRef = createRef()
    const [editMode, setEditMode] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [tiem, setTiem] = useState('')
    const [bios, setBios] = useState([])
    const initialValues = {
        email: '', location: '', phone: '', workingDays: '', facebook: '', twitter: '', instagram: '',
        mission: '', vision: '', objective: '', linkedin: '', image: ''
    }
    const setValues = bios[0]

    const validationSchema = Yup.object({
        email: Yup.string().required('Email is required.'),
        phone: Yup.string().required('Phone is required.'),
        location: Yup.string().required('Location is required.'),
        workingDays: Yup.string().required('Working Days is required.'),
        facebook: Yup.string().required('Facebook Link is required.'),
        twitter: Yup.string().required('Twitter Link is required.'),
        instagram: Yup.string().required('Instagram Link is required.'),
        mission: Yup.string().required('Mission is required.'),
        vision: Yup.string().required('Vision is required.'),
        objective: Yup.string().required('Objective is required.'),
        linkedin: Yup.string().required('Linkedin Link is required.')
        //logo : Yup.midex().required('Logo is required.'),
    })
    let tabins;
    useEffect(() => {
        M.Tabs.init(tabRef.current)
        tabins = M.Tabs.getInstance(tabRef.current)

    })
    let tokenSource = Axios.CancelToken.source()

    useEffect(() => {
        Axios.get(`${authService.otherUrl}company`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            cancelToken: tokenSource.token
        }).then(res => {
            //console.log(res.data.bio)
            setBios(res.data.bio)
        }).catch(err => console.log(err))
        return () => {
            tokenSource.cancel('Cancelled request')
        }
    }, [editMode, tiem])

    const onSubmit = (values, submitProps) => {
        console.log(values)
        setSubmiting(true)
        let formdata = new FormData()
        formdata.append('image', values.image[0], values.image[0].name)
        formdata.append('email', values.email)
        formdata.append('phone', values.phone)
        formdata.append('location', values.location)
        formdata.append('workingDays', values.workingDays)
        formdata.append('facebook', values.facebook)
        formdata.append('instagram', values.instagram)
        formdata.append('twitter', values.twitter)
        formdata.append('linkedin', values.linkedin)
        formdata.append('mission', values.mission)
        formdata.append('vision', values.vision)
        formdata.append('objective', values.objective)

        //let url = editMode ? `${authService.otherUrl}company/update/${1}` : `${authService.otherUrl}company/create`
        let url = `${authService.otherUrl}company/update/${1}`
        Axios({
            method: 'post',
            url: url,
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${getToken()}` }

        }).then(res => {
            //console.log(res)
            let today = new Date();
            let date = today.getHours() + '-' + (today.getMinutes() + 1) + '-' + today.getSeconds();
            setTiem(date)
            setSubmiting(false)
            //submitProps.resetForm()
            tabins.select('info')

        }).catch(err => {
            console.log(err)
            setSubmiting(false)
        })
    }
    const editBio = () => {
        setEditMode(true)
        M.Tabs.getInstance(tabRef.current).select('form')
    }

    return (
        <div className="card main-card">
            <div className="container center">
                <h4>COMPANY DATA</h4><hr></hr>
                {
                    <div className="row">
                        <div className="col s12">
                            <ul className="tabs tabs-fixed-width" ref={tabRef}>
                                <li className="tab col s3"><a className="active" href="#info">INFO</a></li>
                                <li className="tab col s3"><a href="#form">FORM</a></li>
                            </ul>
                        </div>
                        <div id="info" className="col s12 center">
                            {
                                bios.length > 0 ?
                                    <div className="">
                                        <div className="row"><button disabled={bios.length === 0} className="btn pink right" onClick={() => editBio()}><i className="material-icons">edit</i></button></div>
                                        <div className="row">
                                            <div className="col s12 l4 m4">
                                                <div className="card-panel teal">
                                                    <span className="white-text">
                                                        <h5>Email</h5>
                                                        {bios[0].email}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col s12 l4 m4">
                                                <div className="card-panel teal">
                                                    <span className="white-text">
                                                        <h5>Phone</h5>
                                                        {bios[0].phone}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col s12 l4 m4">
                                                <div className="card-panel teal">
                                                    <span className="white-text">
                                                        <h5>Location</h5>
                                                        {bios[0].location}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col s12 l3 m3">
                                                    <div className="card-panel teal">
                                                        <span className="white-text">
                                                            <h5>Facebook</h5>
                                                            {bios[0].facebook}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col s12 l3 m3">
                                                    <div className="card-panel teal">
                                                        <span className="white-text">
                                                            <h5>LinkedIn</h5>
                                                            {bios[0].linkedin}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col s12 l3 m3">
                                                    <div className="card-panel teal">
                                                        <span className="white-text">
                                                            <h5>Instagram</h5>
                                                            {bios[0].instagram}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col s12 l3 m3">
                                                    <div className="card-panel teal">
                                                        <span className="white-text">
                                                            <h5>Twitter</h5>
                                                            {bios[0].twitter}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col s12 l6 m6">
                                                    <div className="card-panel teal">
                                                        <span className="white-text">
                                                            <h5>Mission</h5>
                                                            {bios[0].mission}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="col s12 l6 m6">
                                                    <div className="card-panel teal">
                                                        <span className="white-text">
                                                            <h5>Vision</h5>
                                                            {bios[0].vision}
                                                        </span>
                                                    </div>
                                                   
                                                </div>
                                                <div className="row">
                                                <div className="col s12 l6 m6 offset-l3 offset-m3">
                                                        <div className="card-panel teal">
                                                            <span className="white-text">
                                                                <h5>Objective</h5>
                                                                {bios[0].objective}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col s12 l12 m12">
                                                        <img className="responsive-img" src={`${authService.staticUrl}storage/${bios[0].image}`} />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <Preloader message="Loading Company Data" />
                                    </div>
                            }

                        </div>
                        <div id="form" className="col s12">
                            <div className="card">
                                {
                                    submiting ?
                                        <Preloader message="Submitting Data" />
                                        :
                                        <div className="container section">
                                            <br></br>
                                            <Formik initialValues={editMode ? setValues : initialValues} onSubmit={onSubmit} validateOnMount enableReinitialize validationSchema={validationSchema}>
                                                {
                                                    (formikProps) => {
                                                        return (
                                                            <Form>
                                                                <div className="row">
                                                                    <div className="col l6 m6 s12">
                                                                        <FormControl type="text" name="email" label="Email" />
                                                                        <FormControl type="text" name="phone" label="Phone" />
                                                                        <FormControl type="text" name="location" label="Location" />
                                                                        <FormControl type="text" name="workingDays" label="Working Days" />
                                                                    </div>
                                                                    <div className="col l6 m6 s12">
                                                                        <FormControl type="text" name="facebook" label="Facebook" />
                                                                        <FormControl type="text" name="twitter" label="Twitter" />
                                                                        <FormControl type="text" name="linkedin" label="LinkedIn" />
                                                                        <FormControl type="text" name="instagram" label="Instagram" />
                                                                    </div>
                                                                </div>
                                                                <div className="row">
                                                                    <div className="col l12 m12 s12">
                                                                        <FormControl type="textarea" name="mission" label="Mission" />
                                                                        <FormControl type="textarea" name="vision" label="Vision" />
                                                                        <FormControl type="textarea" name="objective" label="Objective" />
                                                                        <FormControl type="file" name="image" setFieldValue={formikProps.setFieldValue} label="LOGO" />
                                                                    </div>
                                                                </div>
                                                                <button disabled={formikProps.isSubmitting && !formikProps.isValid} className="btn" type="submit">Update</button>
                                                            </Form>
                                                        );
                                                    }
                                                }
                                            </Formik>
                                        </div>
                                }

                            </div>
                        </div>

                    </div>
                }
            </div>
        </div>
    );
}

export default Company;