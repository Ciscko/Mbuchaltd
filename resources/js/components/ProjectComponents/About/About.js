import React, { createRef, useEffect, useState } from 'react';
import M from 'materialize-css'
import Axios from 'axios';
import authService from '../../../authService';
import { getToken } from '../../../authService';
import Preloader from '../../AppComponents/Preloader';
import { Formik, Form } from 'formik';
import FormControl from '../../FormComponents/FormBits/FormControl';
import * as Yup from 'yup'

const About = () => {
    const tabRef = createRef()
    const [content, setContent] = useState('')
    const [modeEdit, setMode] = useState(false)
    const btnRef = createRef()
    const initialValues = { content: '' }
    let initialEdit = { content: content }
    const validationSchema = Yup.object({
        content: Yup.string().required('Content is required.')
    })
    useEffect(() => {
        M.Tabs.init(tabRef.current, {
            swipeable: false
        });
    }, [])

    useEffect(() => {
        Axios.get(`${authService.otherUrl}about/1`).then(res => {
            setContent(res.data.data.content)
        }).catch(err => console.log(err));
    }, [modeEdit])

    useEffect(() => {
        M.FloatingActionButton.init(btnRef.current, {
        });
    })

    const editAbout = () => {
        setMode(true)
        let formInst = M.Tabs.getInstance(tabRef.current)
        console.log(initialEdit, modeEdit)
        formInst.select('form')

    }
    const onSubmit = (values, onSubmitProps) => {
        //setContent('')
        //console.log(values.content)
        let url = modeEdit ? `${authService.otherUrl}about/update/1` : `${authService.otherUrl}about/create`
        Axios.post(url, {
            content: values.content
        }, {
            header: {
                Authorization: `Bearer ${getToken()}`
            }
        }).then(res => {
            console.log(res)
        }).catch(err => console.log(err))

        onSubmitProps.resetForm()
        let formInst = M.Tabs.getInstance(tabRef.current)
        setMode(false)
        formInst.select('content')
    }

    return (
        <div className="card main-card">
            <div className="container">
                <h4 className="center">ABOUT</h4><hr></hr>
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs tabs-fixed-width" ref={tabRef}>
                            <li className="tab col s3"><a className="active" href="#content">Content</a></li>
                            <li className="tab col s3"><a href="#form">Form </a></li>
                        </ul>
                    </div>
                    <div id="content" className="col s12">
                        <br></br><br></br>
                        {
                            content === '' ?
                                <Preloader />
                                :
                                <div className="card">
                                    <div className="right contaainer">
                                        <a onClick={() => editAbout()} className={`btn`}>
                                            <i className="material-icons">edit</i></a>
                                    </div>
                                    <div className="container section">
                                        {
                                            content
                                        }
                                    </div>
                                </div>
                        }
                    </div>
                    <div id="form" className="col s12">
                        <Formik enableReinitialize initialValues={modeEdit ? initialEdit : initialValues} validateOnMount onSubmit={onSubmit} validationSchema={validationSchema}>
                            {
                                (formikProps) => (
                                    <Form>
                                        <FormControl label="About Content" name="content" type="textarea" />
                                        <button disabled={!formikProps.isValid && formikProps.isSubmitting} type="submit" className="btn green">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default About;
