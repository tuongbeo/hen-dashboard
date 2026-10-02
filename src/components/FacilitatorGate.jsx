import { lazy, Suspense, useState } from 'react'
import { verifyFacilitatorPassword } from '../lib/facilitatorAccess'
const FacilitatorGuide = lazy(() => import('./FacilitatorGuide'))
export default function FacilitatorGate({ unlocked, onUnlock, onLock }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  async function submit(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      if (await verifyFacilitatorPassword(password)) { setPassword(''); onUnlock() }
      else { setPassword(''); setError('Password không đúng. Vui lòng thử lại.') }
    } catch { setError('Không thể kiểm tra password. Hãy mở trang qua HTTPS hoặc localhost.') }
    finally { setBusy(false) }
  }
  if (unlocked) return <><div className="mb-5 flex justify-end"><button type="button" onClick={onLock} className="rounded-lg border bg-white px-4 py-2 text-sm">Khóa lại</button></div><Suspense fallback={<p role="status">Đang tải hướng dẫn facilitator…</p>}><FacilitatorGuide /></Suspense></>
  return <div className="mx-auto max-w-md rounded-2xl border bg-white p-6 shadow-sm"><h1 className="text-2xl font-semibold">Facilitator</h1><p className="mt-3 text-sm leading-7 text-slate-600">Nhập password để mở hướng dẫn điều phối, câu hỏi phản biện và debrief của workshop.</p><form onSubmit={submit} className="mt-5 space-y-4"><div><label htmlFor="facilitator-password" className="block text-sm font-medium">Password</label><input id="facilitator-password" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} aria-invalid={!!error} aria-describedby={error ? 'facilitator-error' : undefined} className="mt-2 w-full rounded-lg border border-slate-300 p-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200" /></div>{error && <p id="facilitator-error" role="alert" className="text-sm text-rose-600">{error}</p>}<button disabled={busy} className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">{busy ? 'Đang kiểm tra…' : 'Đăng nhập'}</button></form></div>
}
