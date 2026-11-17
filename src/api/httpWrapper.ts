const BASE_URL = 'http://localhost:3000'

export async function httpWrapper<T = unknown>(url: string, options: RequestInit = {}): Promise<T> {
  const fullUrl = url.startsWith('/') ? `${BASE_URL}${url}` : url
  const token = localStorage.getItem('jwt_token')
  const headers = new Headers(options.headers || {})

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }
  if (options.body && typeof options.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const res = await fetch(fullUrl, { ...options, headers })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`)
  }
  return await res.json()
}
