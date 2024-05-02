export function AuthenticationError() {
  return (
    <div className="border p-2 mb-2 alert alert-error rounded">
      <p>Authentication Failed. Please try again</p>
    </div>
  )
}

export function InvalidPassword({ error }) {
  return (
    <div className="border p-2 mb-2 alert alert-error rounded">
      <p>{error}</p>
    </div>
  )
}
