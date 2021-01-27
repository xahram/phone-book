import React from 'react';
import Input from './Input/Input';
import classes from './AddContact.module.css'
import FileUPload from './FileUpload/FileUpload';
import axios from '../../utils/axios'
// import parsePhoneNumber from 'libphonenumber-js';
// import { unstable_batchedUpdates } from 'react-dom'
// import { batch } from 'react-redux'
export default class AddContact extends React.Component {
    state = {
        contactForm: {
            name: {
                elementType: "input",
                value: "",
                valid: true,
                errorMessage: "Address Should be between 3-30 characters without special character",
                elementConfig: {
                    placeholder: "Enter Your name",
                    type: 'text'
                },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 30,
                }
            },
            phone: {
                elementType: "input",
                value: "",
                valid: true,
                errorMessage: "Please provide Valid number",
                elementConfig: {
                    placeholder: "Enter Your phone",
                    type: 'text'
                },
                validation: {
                    required: true,

                }
            },
            address: {
                elementType: "input",
                value: "",
                valid: true,
                errorMessage: "Address Should be between 2-200 character",
                elementConfig: {
                    placeholder: "Enter Your address",
                    type: 'text'
                },
                validation: {
                    required: true,
                    maxLength: 200,
                    minLength: 2,
                }
            },
            gender: {
                elementType: "select",
                value: "",
                elementConfig: [
                    'Male', "Female"
                ],

            },
            bio: {
                elementType: "input",
                value: "",
                valid: true,
                errorMessage: "Address Should be between 20-500 character",
                elementConfig: {
                    placeholder: "Enter Your bio",
                    type: 'text'
                },
                validation: {
                    required: true,
                    maxLength: 500,
                    minLength: 20,
                }
            },

        },
        file: true,
        img: null

    }
    onChangeHandler = (e, identifier) => {
        const updatedcontactForm = { ...this.state.contactForm };
        const updatedElement = { ...updatedcontactForm[identifier] };
        updatedElement.value = e.target.value;
        updatedElement.valid = true;
        console.log(e.target.value)
        updatedcontactForm[identifier] = updatedElement
        this.setState({ contactForm: updatedcontactForm })
    }
    // #突然ですが占ってもいいですか

    checkFilehandler = (validity, img) => {
        if (img) {
            this.setState({ file: validity, img: img }, () => {
                console.log(validity, this.state.file)
            })
        } else {
            this.setState({ file: validity }, () => {
                console.log(validity, this.state.file)
            })
        }
    }
    isFormValid = () => {
        let isValid = false;

        const nameFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        const phonenoFormat = /^\(?([0-9]{4})\)?[-. ]?([0-9]{7})$/;

        // console.log(nameFormat.test(this.state.contactForm.name.value))
        // console.log(phonenoFormat.test(this.state.contactForm.phone.value))

        if (this.state.contactForm.name.value < 3 || this.state.contactForm.name.value > 30 || nameFormat.test(this.state.contactForm.name.value)) {
            this.setState((state) => ({ contactForm: { ...state.contactForm, name: { ...state.contactForm.name, valid: false } } }), () => {
                console.log("name", this.state.contactForm.name.valid)
                isValid = (this.state.contactForm.name.valid && this.state.contactForm.phone.valid && this.state.file)
            })
        }
        if (!phonenoFormat.test(this.state.contactForm.phone.value)) {
            this.setState((state) => ({ contactForm: { ...state.contactForm, phone: { ...state.contactForm.phone, valid: false } } }), () => {
                console.log("phone", this.state.contactForm.phone.valid)
                isValid = (this.state.contactForm.name.valid && this.state.contactForm.phone.valid && this.state.file)
            })
        }
        else {
            isValid = true
        }
        // if (this.state.contactForm.bio.value < 20 || this.state.contactForm.bio.value > 500) {
        //     this.setState((state) => ({ contactForm: { ...state.contactForm, bio: { ...state.contactForm.bio, valid: false } } }), () => {
        //         console.log("name", this.state.contactForm.name.valid)
        //         isValid = (this.state.contactForm.address.valid && this.state.contactForm.bio.valid && this.state.contactForm.name.valid && this.state.contactForm.phone.valid)
        //     })
        // }
        // if (this.state.contactForm.address.value < 2 || this.state.contactForm.address.value > 200) {
        //     this.setState((state) => ({ contactForm: { ...state.contactForm, address: { ...state.contactForm.address, valid: false } } }), () => {
        //         console.log("name", this.state.contactForm.name.valid)
        //         isValid = (this.state.contactForm.address.valid && this.state.contactForm.bio.valid && this.state.contactForm.name.valid && this.state.contactForm.phone.valid)
        //     })
        // }
        // const phoneNumber = parsePhoneNumber(this.state.contactForm.phone.value, "PK");
        // if (phoneNumber) phoneNumber.isValid()

        console.log(isValid)
        return isValid
    }


    onSubmithandler = (e) => {
        e.preventDefault()
        const valid = this.isFormValid()

        if (valid) {
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            const formData = new FormData()
            formData.append('profile', this.state.img)
            formData.append('name', this.state.contactForm.name.value)
            formData.append('address', this.state.contactForm.address.value)
            formData.append('bio', this.state.contactForm.bio.value)
            formData.append('phoneNumber', this.state.contactForm.phone.value)

            axios.post("http://127.0.0.1:5000/api/v1/add-contact", formData,config)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    }
    render() {
        const keys = Object.keys(this.state.contactForm)
        const inputElements = keys.map((identifier) => {
            const config = this.state.contactForm[identifier]
            // console.log(identifier)
            return <Input key={identifier}
                onChangeHandler={(event) => { this.onChangeHandler(event, identifier) }}
                label={identifier}
                element={config.elementType}
                type={config.elementConfig?.type}
                value={config.value}
                placeholder={config.elementConfig?.placeholder}
                elementConfig={config.elementConfig}
                minLength={config.validation?.minLength}
                maxLength={config.validation?.maxLength}
                required={config.validation?.required}
                valid={config.valid}
                errorMessage={config.errorMessage}
            />
        })
        return (<form onSubmit={this.onSubmithandler} className={classes.AddContact}>
            <div>
                <div>
                    {inputElements}
                </div>
            </div>
            <div>
                <FileUPload valid={this.state.file} checkFilehandler={this.checkFilehandler} />
                <button type="submit">Add Contact</button>
            </div>
        </form>)
    }
}