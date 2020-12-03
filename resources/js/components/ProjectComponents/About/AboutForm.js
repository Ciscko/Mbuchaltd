import React from 'react';
import * as Yup from 'yup'
import { Formik } from 'formik'

import FormControl from '../../FormComponents/FormBits/FormControl';

const validationSchema = Yup.object({
    content : Yup.string().required('About content is required.')
});

const onSubmit = (values, onSubmitProps) => {
    console.log(values)
}
const AboutForm = (props) => {
    return (
    <div className="container center">
        <Formik initialValues = {props.initialValues} onSubmit = { onSubmit } validateOnMount validationSchema = { validationSchema }>
            {
                (formikProps) => {
                    return (
                        <Form>
                            <FormControl type="select" name="content" label="About content"/>
                            <button disabled= {formikProps.isSubmitting && !formikProps.isValid }  type="submit" className="btn">Save</button>
                        </Form>
                    );
                }
            }
        </Formik>
    </div>
    );
}
export default AboutForm;