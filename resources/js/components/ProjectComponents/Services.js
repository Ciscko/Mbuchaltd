import React, { createRef, useEffect, useState } from 'react';
import M from 'materialize-css'
import Axios from 'axios';
import authService from '../../authService';
import { getToken } from '../../authService';
import Preloader from '../AppComponents/Preloader';
import Card from '../AppComponents/CardComponents/Card';
import { Formik, Form } from 'formik';
import FormControl from '../FormComponents/FormBits/FormControl';
import * as Yup from 'yup'


const Services = () => {
    const tabRef = createRef()
    const modalRef = createRef()
    const boxedRef = createRef()

    const [ deleteId, setId] = useState()
    const [services, setServices] = useState([])
    let initService = { id: '', title: '', image: '', description: '', icon: ''}
    const [currentService, setCurrentService] = useState({ id: '', title: '', images: '', description: '', icon: ''})
    const [editMode, setEditMode] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [items, setItems] = useState([])
    
    const validationSchema = Yup.object({
        'title': Yup.string().required('Service title is required.'),
        'description': Yup.string().required('Service description is required.'),
        'icon': Yup.string().required('Service icon is required.')
    })
    
    const editValues = currentService

    const initialValues = { title: '', images: '', description: '', icon: '' }

    useEffect(() => {
         M.Tabs.init(tabRef.current)
         M.Modal.init(modalRef.current, {
            dismissible :false
        })
         M.Materialbox.init(boxedRef.current, {

        });
        return () => {
        }
    }, [])

    let tokenSource = Axios.CancelToken.source()
    useEffect(() => {
        Axios.get(`${authService.otherUrl}services`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            cancelToken : tokenSource.token
        }).then(res => {
            //console.log(res)
            setServices(res.data.data)
        }).catch(err => console.log(err))
        return () => {
            tokenSource.cancel('Cancelled request')
        }
    }, [editMode, services.length, currentService, items.length])

    const onSubmit = (values, submitProps) => {
        setSubmiting(true)
        let formdata = new FormData()
        for (let i = 0; i < values.images.length; i++) {
            formdata.append('image' + i, values.images[i], values.images[i].name)
            console.log(values.images[i].name)
        }
        formdata.append('count', values.images.length)
        formdata.append('title', values.title)
        formdata.append('description', values.description)
        formdata.append('icon', values.icon)

        let url = editMode ? `${authService.otherUrl}services/update/${currentService.id}` : `${authService.otherUrl}services/create`
        Axios({
            method: 'post',
            url: url,
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${getToken()}` }
            
        }).then(res => {
            //console.log(res)
            if(editMode){
                let newservices = services.filter((service) => {
                    return service.id !== res.data.service.id
                })
                setServices([...newservices, res.data.service])
            }
            setServices([...services, res.data.service])
            setEditMode(false)
            setSubmiting(false)
            //submitProps.resetForm()
        }).then(() => {
            const tab = M.Tabs.getInstance(tabRef.current)
            tab.select('services')
        }).catch(err => {
            console.log(err)
            setSubmiting(false)
        })
    }
    const deleteServ = (id) => {
        const modalInst = M.Modal.getInstance(modalRef.current).open()
        setId(id)
        modalInst.open()
    }
    const deleteService = () => {
        const modalInst =  M.Modal.getInstance(modalRef.current)
        modalInst.close();
        Axios({
            url: `${authService.otherUrl}services/delete/${deleteId}`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: {}
        }).then(res => {
             let newservices = services.filter((service) => {
                return service.id !== deleteId
            })
            setServices(newservices)
             }).catch(err => console.log(err))
    }

    const editService = (id) => {
        let tabInst = M.Tabs.getInstance(tabRef.current)
        let service = services.filter((service) => {
            return service.id === id
        })
        setCurrentService(service[0])
        setEditMode(true)
        tabInst.select('form')
    }
    
    const viewService = (id) => {
        let imagess;
        let service = services.filter((service) => {
            return service.id === id
        })
        imagess = service[0].images.split("|")
        //console.log(imagess)
        let paths = []
        for(let i = 0; i<imagess.length; i++){
            if(imagess[i] != ""){
                paths = [...paths,{ source : `${authService.staticUrl}storage/${imagess[i]}`} ]
           }
        }
        setItems(paths)
        let tabInst = M.Tabs.getInstance(tabRef.current)
        setCurrentService(service[0])
        //setEditMode(true) 
        tabInst.select('view')
    }
    return (
        <div className="main-card">
        <div className="container center">
            <h4>SERVICES</h4><hr></hr>
            <div className="row">
                <div className="col s12">
                    <ul className="tabs tabs-fixed-width" ref={tabRef}>
                        <li className="tab col s3"><a className="active" href="#services">All Services</a></li>
                        <li className="tab col s3"><a href="#form">Form</a></li>
                        <li className="tab col s3"><a href="#view">View</a></li>
                    </ul>
                </div>
                <div id="services" className="col s12">
                    <div>
                        <div ref={modalRef} id="modal1" className="modal">
                            <div className="modal-content">
                                <h4>Are you sure to delete ?</h4>
                            </div>
                            <div className="center">
                                <a href="#!" onClick={() => deleteService()} className="btn modal-close red waves-effect">YES</a>
                                <a href="#!" className="btn modal-close green waves-effect">NO</a>
                            </div>
                            <br></br>
                        </div>
                    </div>

                    {
                        services.length > 0 ?
                            services.map((service, index) => {
                                    return (
                                        <Card key={index} data={service} img = {`${authService.staticUrl}storage/`}>
                                            <a className="btn blue" onClick={() => viewService(service.id)}><i className="material-icons">visibility</i></a>
                                            <a className="btn red" onClick={() => deleteServ(service.id)}><i className="material-icons">delete</i></a><a onClick={() => editService(service.id)} className="btn green"><i className="material-icons">edit</i></a>
                                        </Card>
                                    )
                            })
                            :
                            <Preloader message="Loading Services..."/>
                    }
                </div>
                <div id="form" className="col s12">
                    <br></br>
                    <div className="card" style={{ 'padding': '5%' }}>
                        {
                            submiting ?
                                <Preloader message="Submitting Data..." />
                                :
                                <Formik enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit} initialValues={editMode ? editValues : initialValues} validateOnMount >
                                    {
                                        (formikProps) => {

                                            return (
                                                <Form>
                                                    <div className="row">
                                                        <div className="col l12 m12 s12">
                                                            <FormControl name="title" label="Service Title" type="text" />
                                                            <FormControl name="description" label="Description" type="textarea" />
                                                            <FormControl name="icon" label="Service Icon" type="text" />
                                                            <FormControl name="images" label="Service Images" type="file" setFieldValue={formikProps.setFieldValue} />
                                                            <button className="btn pink" onClick={(e) => { e.preventDefault(); setEditMode(false); setcurrentService(initService) }} >Reset</button>
                                                            <button disabled={!formikProps.isValid && formikProps.isSubmitting} className="btn green" type="submit">Save</button>
                                                        </div>
                                                    </div>
                                                </Form>
                                            )
                                        }
                                    }
                                </Formik>
                        }
                    </div>

                    <br></br>
                </div>

                <div id="view" className="col s12">
                    <div className="card" style={{ 'padding': '5%' }}>
                        {
                            currentService.title === '' ? <Preloader message='No Service is selected...' /> :
                                <div className="row">
                                    <br></br>
                                    <div className="col l8 m8 s12 center">

                                        <h5>{currentService.title}</h5>
                                        <p>{currentService.description}</p>
                                        <p><span className="bold">Icon: </span>{currentService.icon}</p>
                                    </div>
                                       {/* <Carousel items={items} options={options} classes="carousel carousel-slider"/> */}
                                        {
                                            items.map((image, index) => {
                                                return(
                                                     <div key={index} className="col l4 m4 s12">
                                                            <br></br>
                                                             <img className="materialboxed responsive-img" ref={boxedRef} src={image.source}/>
                                                            
                                                    </div>
                                                )
                                            }) 
                                        }
                                </div>
                        }
                    </div>

                </div>
            </div>
        </div>
    </div>
    );
}
export default Services;