function Button({children, className}) {
  return (
    <div>
      <button className={className}>{children}</button>
    </div>
  )
}

export default Button
