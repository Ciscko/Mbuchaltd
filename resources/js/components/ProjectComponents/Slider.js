import React, { createRef, useEffect, useState } from 'react';
import M from 'materialize-css'
import Axios from 'axios';
import authService from '../../authService';
import { getToken } from '../../authService';
import Preloader from '../AppComponents/Preloader';
import Card from '../AppComponents/CardComponents/CardSl';
import { Formik, Form } from 'formik';
import FormControl from '../FormComponents/FormBits/FormControl';
import * as Yup from 'yup'

const Slider = () => {
    const tabRef = createRef()
    const modalRef = createRef()
    const boxedRef = createRef()

    const [ deleteId, setId] = useState()
    const [sliders, setSlider] = useState([])

    let initSlider = { id: '', title1: '', title2: '', title3: ''}

    const [currentSlider, setCurrentSlider] = useState({ id: '', title1: '', title2: '', title3: '', images : ''})
    const [editMode, setEditMode] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [items, setItems] = useState([])
    
    const validationSchema = Yup.object({
        'title1': Yup.string().required('Title1 is required.'),
        'title2': Yup.string().required('Title 2 is required.'),
        'title3': Yup.string().required('Title 3 is required.')
    })
    
    const editValues = currentSlider

    const initialValues = { id: '', title1: '', title2: '', title3: ''}

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
        Axios.get(`${authService.otherUrl}slider`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            cancelToken : tokenSource.token
        }).then(res => {
            //console.log(res)
            setSlider(res.data.data)
        }).catch(err => console.log(err))
        return () => {
            tokenSource.cancel('Cancelled request')
        }
    }, [editMode, sliders.length, currentSlider, items.length])

    const onSubmit = (values, submitProps) => {
        setSubmiting(true)
        let formdata = new FormData()
        for (let i = 0; i < values.images.length; i++) {
            formdata.append('image' + i, values.images[i], values.images[i].name)
            console.log(values.images[i].name)
        }
        formdata.append('count', values.images.length)
        formdata.append('title1', values.title1)
        formdata.append('title2', values.title2)
        formdata.append('title3', values.title3)

        let url = editMode ? `${authService.otherUrl}slider/update/${currentSlider.id}` : `${authService.otherUrl}slider/create`
        Axios({
            method: 'post',
            url: url,
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${getToken()}` }
            
        }).then(res => {
            //console.log(res)
            if(editMode){
                let newSlider = sliders.filter((slider) => {
                    return slider.id !== res.data.slider.id
                })
                setSlider([...newSlider, res.data.slider])
            }
            setSlider([...sliders, res.data.slider])
            setEditMode(false)
            setSubmiting(false)
            //submitProps.resetForm()
        }).then(() => {
            const tab = M.Tabs.getInstance(tabRef.current)
            tab.select('slider')
        }).catch(err => {
            console.log(err)
            setSubmiting(false)
        })
    }
    const deleteSlide = (id) => {
        const modalInst = M.Modal.getInstance(modalRef.current).open()
        setId(id)
        modalInst.open()
    }
    const deleteSlider = () => {
        const modalInst =  M.Modal.getInstance(modalRef.current)
        modalInst.close();
        Axios({
            url: `${authService.otherUrl}slider/delete/${deleteId}`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: {}
        }).then(res => {
             let newSlider = sliders.filter((slider) => {
                return slider.id !== deleteId
            })
            setSlider(newSlider)
             }).catch(err => console.log(err))
    }

    const editSlider = (id) => {
        let tabInst = M.Tabs.getInstance(tabRef.current)
        let slider = sliders.filter((slider) => {
            return slider.id === id
        })
        setCurrentSlider(slider[0])
        setEditMode(true)
        tabInst.select('form')
    }
    
    const viewSlider = (id) => {
        let imagess;
        let slider = sliders.filter((slider) => {
            return slider.id === id
        })
        imagess = slider[0].images.split("|")
        //console.log(imagess)
        let paths = []
        for(let i = 0; i<imagess.length; i++){
            if(imagess[i] != ""){
                paths = [...paths,{ source : `${authService.staticUrl}storage/${imagess[i]}`} ]
           }
        }
        setItems(paths)
        let tabInst = M.Tabs.getInstance(tabRef.current)
        setCurrentSlider(slider[0])
        //setEditMode(true) 
        tabInst.select('view')
    }
    return (
        <div className="main-card">
        <div className="container center">
            <h4>SLIDER</h4><hr></hr>
            <div className="row">
                <div className="col s12">
                    <ul className="tabs tabs-fixed-width" ref={tabRef}>
                        <li className="tab col s3"><a className="active" href="#sliders">All Images</a></li>
                        <li className="tab col s3"><a href="#form">Form</a></li>
                        <li className="tab col s3"><a href="#view">View</a></li>
                    </ul>
                </div>
                <div id="sliders" className="col s12">
                    <div>
                        <div ref={modalRef} id="modal1" className="modal">
                            <div className="modal-content">
                                <h4>Are you sure to delete ?</h4>
                            </div>
                            <div className="center">
                                <a href="#!" onClick={() => deleteSlider()} className="btn modal-close red waves-effect">YES</a>
                                <a href="#!" className="btn modal-close green waves-effect">NO</a>
                            </div>
                            <br></br>
                        </div>
                    </div>

                    {
                        sliders.length > 0 ?
                            sliders.map((slider, index) => {
                                    return (
                                        <Card key={index} data={slider} img = {`${authService.staticUrl}storage/`}>
                                            <a className="btn blue" onClick={() => viewSlider(slider.id)}><i className="material-icons">visibility</i></a>
                                            <a className="btn red" onClick={() => deleteSlide(slider.id)}><i className="material-icons">delete</i></a><a onClick={() => editSlider(slider.id)} className="btn green"><i className="material-icons">edit</i></a>
                                        </Card>
                                    )
                            })
                            :
                            <Preloader message="Loading Slider..."/>
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
                                                            <FormControl name="title1" label="Slider Title1" type="text" />
                                                            <FormControl name="title2" label="Slider Title2" type="text" />
                                                            <FormControl name="title3" label="Slider Title3" type="text" />
                                                            <FormControl name="images" label="Slider Images" type="file" setFieldValue={formikProps.setFieldValue} />
                                                            <button className="btn pink" onClick={(e) => { e.preventDefault(); setEditMode(false); setCurrentSlider(initSlider) }} >Reset</button>
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
                            currentSlider.title === '' ? <Preloader message='No Slider is selected...' /> :
                                <div className="row">
                                    <br></br>
                                    <div className="col l8 m8 s12 center">

                                        <h5>{currentSlider.title2}</h5>
                                        <p>{currentSlider.title1}</p>
                                        <p>{currentSlider.title3}</p>
                
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
export default Slider;