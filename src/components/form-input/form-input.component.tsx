import { InputHTMLAttributes } from 'react'
import { FormInputLabel, Group, Input } from './form-input.styles'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string,
}

const FormInput = ({ label, ...otherProps}: Props) => {
  return (
    <Group>
      <Input {...otherProps} />
      {label && (
        <FormInputLabel $shrink={`${otherProps.value}`.length > 0}>{label}</FormInputLabel>
      )}
    </Group>
  )
}

export default FormInput
