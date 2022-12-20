/* eslint-disable react/jsx-props-no-spreading */
import { useState, FC, useEffect } from 'react'
import { useController, Control, FieldValues } from 'react-hook-form'

import { IconType } from 'react-icons'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface IInputHookFormControllerProps {
	control: Control<FieldValues>
	Icon?: IconType
	placeholder?: string
	inputClass?: string
	classList?: string
	name: string
	type?: string
	pattern?: string
	iconClass?: string
	label?: string
	labelClass?: string
	defaultValue?: string | number | null
	isReadOnly?: boolean
	isRequiredIcon?: boolean
	rules?: any
	isLtr?: boolean
	min?: number
	disabled?: boolean
	passwordInputClass?: string
	autocomplete?: string
}

const InputHookFormController: FC<IInputHookFormControllerProps> = ({
	control,
	placeholder,
	inputClass,
	classList,
	name,
	type = 'text',
	pattern,
	iconClass,
	Icon,
	label,
	labelClass,
	defaultValue,
	isReadOnly,
	rules,
	isLtr,
	min,
	disabled,
	passwordInputClass,
	autocomplete
}) => {
	const [passView, setPassView] = useState<boolean>(true)
	const {
		field: { ...inputProps },
		fieldState: { error }
	} = useController({
		name,
		control,
		rules,
		defaultValue: defaultValue ?? ''
	})

	useEffect(() => {
		if (defaultValue) inputProps.onChange(defaultValue)
	}, [defaultValue, inputProps])

	return (
		<div className={`input-form-hook ${classList || ''}`}>
			{label && (
				<label
					htmlFor={name}
					className={`d-block font-12 ${isLtr ? 'text-left' : 'text-right'} ${
						labelClass || ''
					}`}
				>
					{label}
					{rules?.required && '*'}
				</label>
			)}
			{type === 'password' && (
				<div
					className={`input-form-hook--password-icon ${
						passwordInputClass || ''
					} ${isLtr ? 'right-5' : 'left-5'}`}
					onClick={() => setPassView(!passView)}
					aria-hidden='true'
				>
					{passView ? (
						<FiEye
							className='font-24 mx-1 reverse-mode-color'
							onClick={() => setPassView(!passView)}
						/>
					) : (
						<FiEyeOff
							className='font-24 mx-1 reverse-mode-color'
							onClick={() => setPassView(!passView)}
						/>
					)}
				</div>
			)}
			<input
				dir={isLtr ? 'ltr' : 'rtl'}
				autoComplete={autocomplete || ''}
				{...inputProps}
				type={type !== 'password' ? type : (passView && type) || 'text'}
				id={name}
				name={name}
				disabled={disabled}
				className={`input-form-hook--input ${inputClass || ''} ${
					isLtr ? 'ltr' : ''
				} input-dark-mode
				
        ${Icon && !isLtr ? 'pr-10' : ''}
        ${Icon && isLtr ? 'pl-10' : ''}
        ${error ? 'bg-danger text-black bg-opacity-10' : ''}`}
				placeholder={placeholder}
				pattern={pattern}
				readOnly={isReadOnly}
				min={min}
			/>
			{Icon && (
				<Icon
					className={`input-form-hook--icon ${iconClass} ${
						isLtr ? 'left-3' : 'right-3'
					}`}
				/>
			)}
			{error && (
				<>
					{error && error.type === 'manual' && (
						<p className='input-form-hook--error'>{error.message}</p>
					)}
					{error && error.type === 'required' && (
						<p className='input-form-hook--error'>فیلد اجباری</p>
					)}

					{error && error.type === 'maxLength' && (
						<p className='input-form-hook--error'>
							{error.message ||
								`تعداد کاراکتر های وارد شده بیشتر از  ${rules?.maxLength} است`}
						</p>
					)}
					{error && error.type === 'minLength' && (
						<p className='input-form-hook--error'>
							{error.message ||
								`تعداد کاراکتر های وارد شده کمتر از  ${rules?.minLength} است`}
						</p>
					)}
					{error && error.type === 'max' && (
						<p className='input-form-hook--error'>{error.message}</p>
					)}
					{error && error.type === 'min' && (
						<p className='input-form-hook--error'>{error.message}</p>
					)}
					{error && error.type === 'pattern' && (
						<p className='input-form-hook--error'>
							{error?.message || 'مطابق به الگو وارد کنید.'}
						</p>
					)}
				</>
			)}
		</div>
	)
}

export default InputHookFormController
