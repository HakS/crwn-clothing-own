import {BaseButton, ButtonSpinner, GoogleSignInButton, InvertedButton} from './button.styles'

export enum BUTTON_TYPE_CLASSES {
  base = 'base',
  google = 'google-sign-in',
  inverted = 'inverted'
}

type Props = {
  buttonType?: BUTTON_TYPE_CLASSES,
  isLoading?: boolean,
  [otherProps: string]: any;
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => ({
  [BUTTON_TYPE_CLASSES.base]: BaseButton,
  [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
  [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
}[buttonType])

const Button = ({ children, buttonType, isLoading, ...otherProps }: Props) => {
  const CustomButton = getButton(buttonType)
  return <CustomButton disabled={isLoading} {...otherProps} >
    {isLoading ? <ButtonSpinner /> : children}
  </CustomButton>
}

export default Button
