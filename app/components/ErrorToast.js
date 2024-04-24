'use client'

import toast from "react-hot-toast"

function ErrorToast() {
  return (
    <div>
      {toast.error('You have already added this into your list')}
    </div>
  )
}

export default ErrorToast
