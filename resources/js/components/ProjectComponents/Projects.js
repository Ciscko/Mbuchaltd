import React, { createRef, useEffect, useState } from 'react';
import M from 'materialize-css'
import Axios from 'axios';
import authService from '../../authService';
import { getToken } from '../../authService';
import Preloader from '../AppComponents/Preloader';
import Card from '../AppComponents/CardComponents/CardP';
import { Formik, Form } from 'formik';
import FormControl from '../FormComponents/FormBits/FormControl';
import * as Yup from 'yup'
import Carousel from '../AppComponents/Carousel';

const Projects = (props) => {
    const tabRef = createRef()
    const modalRef = createRef()
    const boxedRef = createRef()
    const [ deleteId, setId] = useState()
    const [projects, setProjects] = useState([])
    let initProject = { id: '', title: '', images: '', description: '', span: '', location: '', status: '' }
    const [currentProject, setCurrentProject] = useState({ id: '', title: '', images: '', description: '', span: '', location: '', status: '' })
    const [editMode, setEditMode] = useState(false)
    const [submiting, setSubmiting] = useState(false)
    const [items, setItems] = useState([])
    
    const validationSchema = Yup.object({
        'title': Yup.string().required('Project title is required.'),
        'description': Yup.string().required('Project description is required.'),
        'span': Yup.string().required('Project Time-Span is required.'),
        'location': Yup.string().required('Location is required.'),
        'status': Yup.string().required('Project status is required.')
    })
    
    const editValues = currentProject

    const initialValues = { title: '', images: '', description: '', span: '', location: '', status: '' }

    const radioOptions = [
        { key: 'completed', value: 'Completed' }, { key: 'ongoing', value: 'Ongoing' }, { key: 'tobegin', value: 'To Begin' }
    ]
    const options = {
        fullWidth: true, indicators: true
    }

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
        Axios.get(`${authService.otherUrl}projects`, {
            headers: {
                Authorization: `Bearer ${getToken()}`
            },
            cancelToken : tokenSource.token
        }).then(res => {
            setProjects(res.data.data)
            //console.log(res.data.data)
        }).catch(err => console.log(err))
        return () => {
            tokenSource.cancel('Cancelled request')
        }
    }, [editMode, projects.length, currentProject, items.length])

    const onSubmit = (values, submitProps) => {
        //console.log(values)
        setSubmiting(true)
        let formdata = new FormData()
        for (let i = 0; i < values.images.length; i++) {
            //console.log(values.images[i])
            formdata.append('image' + i, values.images[i], values.images[i].name)
        }
       
        formdata.append('count', values.images.length)
        formdata.append('title', values.title)
        formdata.append('description', values.description)
        formdata.append('location', values.location)
        formdata.append('span', values.span)
        formdata.append('status', values.status)

        let url = editMode ? `${authService.otherUrl}projects/update/${currentProject.id}` : `${authService.otherUrl}projects/create`
        Axios({
            method: 'post',
            url: url,
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${getToken()}` }
            
        }).then(res => {
            //console.log(res)
            if(editMode){
                let newprojects = projects.filter((project) => {
                    return project.id !== res.data.proj.id
                })
                setProjects([...newprojects, res.data.proj])
            }
            setProjects([...projects, res.data.proj])
            setEditMode(false)
            setSubmiting(false)
            //submitProps.resetForm()
        }).then(() => {
            const tab = M.Tabs.getInstance(tabRef.current)
            tab.select('projects')
        }).catch(err => {
            console.log(err)
            setSubmiting(false)
        })
    }
    const deleteProject = (id) => {
        const modalInst = M.Modal.getInstance(modalRef.current).open()
        setId(id)
        //modalInst.open()
    }
    const deleteProj = () => {
        const modalInst =  M.Modal.getInstance(modalRef.current)
        modalInst.close();
        Axios({
            url: `${authService.otherUrl}projects/delete/${deleteId}`,
            method: 'post',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
            body: {}
        }).then(res => {
             let newprojects = projects.filter((project) => {
                return project.id !== deleteId
            })
            setProjects(newprojects)
             }).catch(err => console.log(err))
    }

    const editProject = (id) => {
        let tabInst = M.Tabs.getInstance(tabRef.current)
        let project = projects.filter((project) => {
            return project.id === id
        })
        setCurrentProject(project[0])
        setEditMode(true)
        tabInst.select('form')
    }
    
    const viewProject = (id) => {
        let imagess;
        let project = projects.filter((project) => {
            return project.id === id
        })
        imagess = project[0].images.split("|")
        //console.log(imagess)
        let paths = []
        for(let i = 0; i<imagess.length; i++){
            if(imagess[i] != ""){
                paths = [...paths,{ source : `${authService.staticUrl}storage/${imagess[i]}`} ]
           }
        }
        setItems(paths)
        //console.log(paths)
        //Solve
        let tabInst = M.Tabs.getInstance(tabRef.current)
        
        setCurrentProject(project[0])
        
        
        //setEditMode(true) 
        tabInst.select('view')
    }


    return (
        <div className="main-card">
            <div className="container center">
                <h4>PROJECTS</h4><hr></hr>
                <div className="row">
                    <div className="col s12">
                        <ul className="tabs tabs-fixed-width" ref={tabRef}>
                            <li className="tab col s3"><a className="active" href="#projects">All Projects</a></li>
                            <li className="tab col s3"><a href="#form">Form</a></li>
                            <li className="tab col s3"><a href="#view">View</a></li>
                        </ul>
                    </div>
                    <div id="projects" className="col s12">
                        <div>
                            <div ref={modalRef} id="modal1" className="modal">
                                <div className="modal-content">
                                    <h4>Are you sure to delete ?</h4>
                                </div>
                                <div className="center">
                                    <a href="#!" onClick={() => deleteProj()} className="btn modal-close red waves-effect">YES</a>
                                    <a href="#!" className="btn modal-close green waves-effect">NO</a>
                                </div>
                                <br></br>
                            </div>
                        </div>

                        {
                            projects.length > 0 ?
                                projects.map((project, index) => {
                                        return (
                                            <Card key={index} data={project} img = {`${authService.staticUrl}storage/`}>
                                                <a className="btn blue" onClick={() => viewProject(project.id)}><i className="material-icons">visibility</i></a>
                                                <a className="btn red" onClick={() => deleteProject(project.id)}><i className="material-icons">delete</i></a><a onClick={() => editProject(project.id)} className="btn green"><i className="material-icons">edit</i></a>
                                            </Card>
                                        )
                                })
                                :
                                <Preloader message="Loading projects..."/>
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
                                                            <div className="col l6 m6 s12">
                                                                <FormControl name="title" label="Project Title" type="text" />
                                                                <FormControl name="description" label="Project Description" type="textarea" />
                                                                <FormControl name="span" label="Project Time Span" type="text" />
                                                                <FormControl name="images" label="Project Images" type="file" setFieldValue={formikProps.setFieldValue} />

                                                            </div>
                                                            <div className="col l6 m6 s12">
                                                                <FormControl name="location" label="Project Location" type="text" />
                                                                <FormControl name="status" label="Completion Status" type="radio" options={radioOptions} />
                                                                <br></br>
                                                                <button className="btn pink" onClick={(e) => { e.preventDefault(); setEditMode(false); setCurrentProject(initProject) }} >Reset</button>
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
                                currentProject.title === '' ? <Preloader message='No project is selected...' /> :
                                    <div className="row">
                                        <br></br>
                                        <div className="col l8 m8 s12 center">

                                            <h5>{currentProject.title}</h5>
                                            <p>{currentProject.description}</p>
                                            <p><span className="bold">Time Span: </span>{currentProject.span}</p>
                                            <span className="bold">Location: </span> {currentProject.location}<br></br>
                                            <span className="bold">Status: </span> {currentProject.status}<br></br>
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
export default Projects;