import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useFormik, Formik } from 'formik';
import Layout from '../components/Layout';
import { navigate } from 'gatsby';
import { Seo } from '../components/SeoMeta';
import { getToken } from '../hooks/token';

const WEBSITE_URL = 'https://dubaibizbuzz.emqubeweb.com';

const ContactForm = () => {
    const [token, setToken] = useState('');
    const [formFields, setFormFields] = useState([]);


    // Get token
    useEffect(() => {
        const fetchToken = async () => {
            try {
                const fetchedToken = await getToken();
                setToken(fetchedToken);
            } catch (error) {

            }
        };

        fetchToken();
    }, []);

    // return <div>{token}</div>;


    const validate = values => {
        const errors = {};
        if (values['your-name'] === "") {
            errors['your-name'] = 'Required';

        }
        if (values['your-number'] === "") {
            errors['your-number'] = 'Required';

        }

        if (values['your-email'] === "") {
            errors['your-email'] = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values['your-email'])) {
            errors['your-email'] = 'Invalid email address';
        }

        return errors;
    };


    useEffect(() => {

        if (token) {
            axios({
                method: 'get',
                url: `${WEBSITE_URL}/wp-json/contact-form-7/v1/contact-forms/18795/`,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Accept": "application/json, text/plain, /",
                    "Content-Type": "multipart/form-data",
                },
            })
                .then((response) => {
                    setFormFields(response.data.properties.form.fields);
                })
                .catch((error) => console.error('Error', error));
        }
    }, [token]);



    const formik = useFormik({
        initialValues: {
            'your-name': '',
            'your-number': '',
            'your-email': '',
            'your-message': '',
            'your-subject': '',
        },
        validate,
        onSubmit: values => {
            const data = {
                'your-name': values['your-name'],
                'your-number': values['your-number'],
                'your-email': values['your-email'],
                'your-message': values['your-message'],
                'acceptance-715': values['acceptance-715'],
                'your-subject': 'Form testing',
            };
            console.log(data)

            axios({
                method: 'post',
                url: `${WEBSITE_URL}/wp-json/contact-form-7/v1/contact-forms/18795/feedback`,
                data: data,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(response => {
                    console.log('Email sent successfully:', response.data);
                    formik.resetForm();
                    navigate("/thankyou/");
                })
                .catch(error => console.error('Error sending email:', error));
        },
    });

    return (
        <Layout>
            <section className='contact-page'>
                <article className='contact-info'>
                    <h3>Want To Get In Touch?</h3>
                    <p>Four dollar toast biodiesel plaid slavia actually
                        pickled banjo
                        bespoke mlkshk intelligentsia edision bulb synth.
                    </p>
                    <p>
                        Cardigan prism bicycle rightd put a bird on it deep v.
                    </p>
                    <p>
                        Hashtag swag health goth air pair, raclette listicle fingerstache
                        cold-pressed fanny pack bicycle rights Cardigan poke.
                    </p>
                </article>
                <article>
                    <Formik>

                        <form className='form contact-form' onSubmit={formik.handleSubmit}>
                            {console.log(formFields)}
                            {formFields.map(field => {
                                switch (field.basetype) {
                                    case 'text':
                                    case 'number':
                                    case 'email':
                                        return (

                                            <div className="form-row" key={field.name}>
                                                <label>{field.name}</label>
                                                <input
                                                    className={formik.errors[field.name] ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400" : null}
                                                    id={field.name}
                                                    type={field.basetype}
                                                    name={field.name}
                                                    placeholder={field.raw_values[0]}
                                                    value={formik.values[field.name]}
                                                    onChange={formik.handleChange}
                                                // required={field.type.includes("*") ? "required" : ""}
                                                />
                                                {formik.errors[field.name] ? <div className='text-xs text-red-500'>{formik.errors[field.name]}</div> : null}
                                            </div>
                                        );
                                    case 'textarea':
                                        return (
                                            <div className="form-row" key={field.name}>
                                                <label>{field.name}</label>
                                                <textarea
                                                    id={field.name}
                                                    name={field.name}
                                                    placeholder={field.raw_values[0]}
                                                    value={formik.values[field.name]}
                                                    onChange={formik.handleChange}
                                                //required={field.type.includes("*") ? "required" : ""}
                                                ></textarea>

                                            </div>
                                        );
                                    case 'acceptance':
                                        return (
                                            <div className="flex form-row" key={field.name}>
                                                <input
                                                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                                    type="checkbox"
                                                    name={field.name}
                                                    checked={formik.values[field.name]}
                                                    onChange={formik.handleChange}
                                                />
                                                <label
                                                    className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                                                >I accept that Innerspace Trading LLC will contact me</label>
                                            </div>
                                        );
                                    case 'submit':
                                        return (
                                            <button className='btn block' type="submit">{field.raw_values[0]}</button>
                                        );
                                    default:
                                        return null;
                                }
                            })}

                        </form>

                    </Formik>
                </article>
            </section>
        </Layout >
    );


};

export default ContactForm;

export const Head = () => (
    <Seo title="contact page" description="This is the contact page of our website. Contact us for any inquiries or feedback." />
)














// const [token, setToken] = useState('');
// useEffect(() => {
//     axios({
//         method: 'post',
//         url: `${WEBSITE_URL}/wp-json/jwt-auth/v1/token`,
//         data: {
//             username: 'admin-vat',
//             password: 'o5%vaoHMBu0Zai&B$2',
//         },
//         headers: {
//             "Accept": "application/json, text/plain, /",
//             "Content-Type": "multipart/form-data",
//         }
//     })
//         .then((response) => {
//             setToken(response.data.token);
//         })
//         .catch((error) => console.error('Error', error));
// }, []);

// this code is for getting the token.Where should I store this code.So I can access it in other.Reactjs and gatsby