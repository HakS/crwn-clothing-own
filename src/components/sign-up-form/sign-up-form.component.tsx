import { ChangeEvent, FormEvent, useState } from "react"
import { useDispatch } from "react-redux";

import { SignUpContainer } from "./sign-up-form.styles";

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { signUpStart } from "../../store/user/user.reducer";
import { useAppDispatch } from "../../store/store";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields
  const dispatch = useAppDispatch()
  // const dispatch = useDispatch()

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { displayName, email, password, confirmPassword } = formFields
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return;
    }

    dispatch(signUpStart({displayName, email, password}))
    resetFormFields()
    // try {
    // } catch (error) {
    //   if (error.code === 'auth/email-already-in-use') {
    //     alert ("Cannot create user, email already in use")
    //   }
    //   console.error('error creating the user', error);
    // }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>
        <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>
        <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>
        <FormInput label="Confirm password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  )
}

export default SignUpForm
