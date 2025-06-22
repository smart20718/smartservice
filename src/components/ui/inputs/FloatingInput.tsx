import React, { InputHTMLAttributes, useId } from 'react'
import styled, { css } from 'styled-components'

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon?: React.ReactNode
}

const FormControl = styled.div<{
  $hasIcon: boolean
  $filled: boolean
}>`
  position: relative;
  margin: 24px 0 36px;
  width: 100%;

  input {
    background-color: transparent;
    border: 0;
    border-bottom: 2px solid;
    border-color: rgba(59, 130, 246, 0.5);
    display: block;
    width: 100%;
    padding: 16px 0;
    ${({ $hasIcon }) =>
      $hasIcon &&
      css`
        padding-left: 40px;
      `}
    font-size: 18px;
    color: #1e40af;
    transition: border-color 0.25s;

    .dark & {
      border-color: #fff;
      color: #fff;
    }

    /* Autofill fix (Chrome) */
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px transparent inset;
      -webkit-text-fill-color: #1e40af;
      caret-color: #0ef5e0;
      
      .dark & {
        -webkit-text-fill-color: #fff;
      }
    }
  }

  input:focus,
  input:valid {
    outline: 0;
    border-bottom-color: #0ef5e0;
  }

  label {
    position: absolute;
    top: 16px;
    left: ${({ $hasIcon }) => ($hasIcon ? '40px' : '0')};
    pointer-events: none;
    display: flex;
    gap: 1px;
  }

  label span {
    display: inline-block;
    font-size: 18px;
    min-width: 5px;
    color: #1e40af;
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55),
      color 0.3s;
    
    .dark & {
      color: #fff;
    }
  }

  ${({ $filled }) =>
    $filled &&
    css`
      label span {
        color: #0ef5e0;
        transform: translateY(-30px);
      }
    `}

  input:focus + label span,
  input:valid + label span {
    color: #0ef5e0;
    transform: translateY(-30px);
  }

  .icon {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    color: #0ef5e0;
    pointer-events: none;
  }
`

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, icon, value, defaultValue, onChange, ...props }, ref) => {
    const inputId = useId()

    const filled = Boolean(
      (value !== undefined ? value : defaultValue) &&
        String(value ?? defaultValue).length > 0
    )

    const renderLabel = () => (
      <label htmlFor={inputId}>
        {label.split('').map((char, idx) => (
          <span key={idx} style={{ transitionDelay: `${idx * 40}ms` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </label>
    )

    return (
      <FormControl $hasIcon={!!icon} $filled={filled}>
        {icon && <span className="icon">{icon}</span>}
        <input
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          ref={ref}
          required
          {...props}
        />
        {renderLabel()}
      </FormControl>
    )
  }
)

FloatingInput.displayName = 'FloatingInput'

export { FloatingInput } 