import React from 'react'

function Button({ onClick, text, className, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} className={` bg-gradient-to-b from-[#4A00E0] to-[#8E2DE2] px-3 py-4 rounded-2xl  text-white font-semibold ${className}`}>
      {text}
    </button>
  )
}

export default Button;