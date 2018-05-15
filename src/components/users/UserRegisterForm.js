import React, { Component } from 'react'

import CustomForm from './CustomForm'
import TextField from './ValidatingTextField'

import emailValidator from 'email-validator'

import { URL_USERS } from '../../constants/Constants'
import Axios from 'axios'

import Snackbar from 'material-ui/Snackbar'

class CustomUserRegisterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      snackAutoHideDuration: 2000,
      snackMessage: 'User action',
      snackOpen: false
    }
  }

  onFieldValueChange = (fieldName, fieldValue, hasError) => {
    this.setState(prevState => ({
      [fieldName]: fieldValue,
      validFields: {
        ...prevState.validFields,
        [fieldName]: !hasError
      }
    }))
  }

  handleRequestClose = () => {
    this.setState({ snackOpen: false })
  }
  render () {
    return (
      <div>
        <CustomForm
          title='User registration'
          buttonText='Register'
          onSubmitCallback={data => {
            Axios.post(URL_USERS, {
              email: data.email,
              firstName: data.firstName,
              lastName: data.lastName,
              password: data.password
            })
                            .then(response =>
                                this.setState({
                                  snackMessage: 'User registered',
                                  snackOpen: true
                                })
                            )
                            .catch(error =>
                                this.setState({
                                  snackMessage: 'Failed to register',
                                  snackOpen: true
                                })
                            )
          }}
                >
          <TextField
            name='email'
            hintText='Email'
            floatingLabelText='Email'
            validationFn={value =>
                            !emailValidator.validate(value) && 'Wrong email'}
                    />
          <br />
          <TextField
            name='password'
            type='password'
            hintText='Password'
            floatingLabelText='Password'
            validationFn={value =>
                            value.length < 6 && 'Password to short'}
                    />
          <br />
          <TextField
            name='passwordRepeat'
            type='password'
            hintText='Password repeat'
            floatingLabelText='Password repeat'
            validationFn={value =>
                            value.length < 6 && 'Password to short'}
            onValueChange={this.onFieldValueChange}
                    />
          <br />
          <TextField
            name='firstName'
            hintText='First name'
            floatingLabelText='First name'
            validationFn={value => !value && 'Enter first name'}
            onValueChange={this.onFieldValueChange}
                    />
          <br />
          <TextField
            name='lastName'
            hintText='Last name'
            floatingLabelText='Last name'
            validationFn={value => !value && 'Enter last name'}
            onValueChange={this.onFieldValueChange}
                    />
          <br />
        </CustomForm>
        <Snackbar
          open={this.state.snackOpen}
          message={this.state.snackMessage}
          autoHideDuration={this.state.snackAutoHideDuration}
          onRequestClose={this.handleRequestClose}
                />
      </div>
    )
  }
}

export default CustomUserRegisterForm
