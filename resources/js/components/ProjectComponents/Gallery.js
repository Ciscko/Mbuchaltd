import React, { createRef, useEffect, useState } from 'react';
import M from 'materialize-css'
import Axios from 'axios';
import authService from '../../authService';
import { getToken } from '../../authService';
import Preloader from '../AppComponents/Preloader';
import Card from '../AppComponents/CardComponents/CardG';
import { Formik, Form } from 'formik';
import FormControl from '../FormComponents/FormBits/FormControl';
import * as Yup from 'yup'

const Gallery = (props) => {
    const tabRef = createRef()
    const modalRef = createRef()
    const boxedRef = createRef()

    const [ deleteId, setId] = useState()
    const [gallerys, setGallery] = useState([])

    const [currentGallery, setCurrentGallery] = useState({ id: '', title: '', images: '', description: ''})
    const [editMode, setEditMode] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [items, setItems] = useState([])
    
    const validationSchema = Yup.object({
        'title': Yup.string().required('Gallery title is required.'),
        'description': Yup.string().required('Description is required.')
    })
    
     
    const editValues = currentGallery

    const initGallery = { id: '', title: '', images: '', description: ''}

    const initialValues = { id: '', title: '', images: '', description: ''}

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
        Axios.get(`${authService.otherUrl}gallery`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            cancelToken : tokenSource.token
        }).then(res => {
            //console.log(res)
            setGallery(res.data.data)
        }).catch(err => console.log(err))
        return () => {
            tokenSource.cancel('Cancelled request')
        }
    }, [editMode, gallerys.length, currentGallery, items.length])

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

        let url = editMode ? `${authService.otherUrl}gallery/update/${currentGallery.id}` : `${authService.otherUrl}gallery/create`
        Axios({
            method: 'post',
            url: url,
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${getToken()}` }
            
        }).then(res => {
            //console.log(res)
            if(editMode){
                let newGallery = gallerys.filter((gallery) => {
                    return gallery.id !== res.data.gallery.id
                })
                setGallery([...newGallery, res.data.gallery])
            }
            setGallery([...gallerys, res.data.gallery])
            setEditMode(false)
            setSubmiting(false)
            //submitProps.resetForm()
        }).then(() => {
            const tab = M.Tabs.getInstance(tabRef.current)
            tab.select('gallery')
        }).catch(err => {
            console.log(err)
            setSubmiting(false)
        })
    }
    const deleteGall = (id) => {
        const modalInst = M.Modal.getInstance(modalRef.current).open()
        setId(id)
        modalInst.open()
    }
    const deleteGallery = () => {
        const modalInst =  M.Modal.getInstance(modalRef.current)
        modalInst.close();
        Axios({
            url: `${authService.otherUrl}gallery/delete/${deleteId}`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: {}
        }).then(res => {
             let newGallery = gallerys.filter((gallery) => {
                return gallery.id !== deleteId
            })
            setGallery(newGallery)
             }).catch(err => console.log(err))
    }

    const editGallery = (id) => {
        let tabInst = M.Tabs.getInstance(tabRef.current)
        let gallery = gallerys.filter((gallery) => {
            return gallery.id === id
        })
        setCurrentGallery(gallery[0])
        setEditMode(true)
        tabInst.select('form')
    }
    
    const viewGallery = (id) => {
        let imagess;
        let gallery = gallerys.filter((gallery) => {
            return gallery.id === id
        })
        imagess = gallery[0].images.split("|")
        //console.log(imagess)
        let paths = []
        for(let i = 0; i<imagess.length; i++){
            if(imagess[i] != ""){
                paths = [...paths,{ source : `${authService.staticUrl}storage/${imagess[i]}`} ]
           }
        }
        setItems(paths)
        let tabInst = M.Tabs.getInstance(tabRef.current)
        setCurrentGallery(gallery[0])
        //setEditMode(true) 
        tabInst.select('view')
    }
    return (
        <div className="main-card">
        <div className="container center">
            <h4>GALLERY</h4><hr></hr>
            <div className="row">
                <div className="col s12">
                    <ul className="tabs tabs-fixed-width" ref={tabRef}>
                        <li className="tab col s3"><a className="active" href="#gallerys">All Images</a></li>
                        <li className="tab col s3"><a href="#form">Form</a></li>
                        <li className="tab col s3"><a href="#view">View</a></li>
                    </ul>
                </div>
                <div id="gallerys" className="col s12">
                    <div>
                        <div ref={modalRef} id="modal1" className="modal">
                            <div className="modal-content">
                                <h4>Are you sure to delete ?</h4>
                            </div>
                            <div className="center">
                                <a href="#!" onClick={() => deleteGallery()} className="btn modal-close red waves-effect">YES</a>
                                <a href="#!" className="btn modal-close green waves-effect">NO</a>
                            </div>
                            <br></br>
                        </div>
                    </div>

                    {
                        gallerys.length > 0 ?
                            gallerys.map((gallery, index) => {
                                    return (
                                        <Card key={index} data={gallery} img = {`${authService.staticUrl}storage/`}>
                                            <a className="btn blue" onClick={() => viewGallery(gallery.id)}><i className="material-icons">visibility</i></a>
                                            <a className="btn red" onClick={() => deleteGall(gallery.id)}><i className="material-icons">delete</i></a><a onClick={() => editGallery(gallery.id)} className="btn green"><i className="material-icons">edit</i></a>
                                        </Card>
                                    )
                            })
                            :
                            <Preloader message="Loading Gallery..."/>
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
                                                            <FormControl name="title" label="Gallery Title" type="text" />
                                                            <FormControl name="description" label="Description" type="textarea" />
                                                            <FormControl name="images" label="Gallery Images" type="file" setFieldValue={formikProps.setFieldValue} />
                                                            <button className="btn pink" onClick={(e) => { e.preventDefault(); setEditMode(false); setCurrentGallery(initGallery) }} >Reset</button>
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
                            currentGallery.title === '' ? <Preloader message='No Gallery is selected...' /> :
                                <div className="row">
                                    <br></br>
                                    <div className="col l8 m8 s12 center">

                                        <h5>{currentGallery.title}</h5>
                                        <p>{currentGallery.description}</p>
                
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
export default Gallery;