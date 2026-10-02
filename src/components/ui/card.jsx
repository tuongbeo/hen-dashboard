export function Card({ className = '', children }) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-card ${className}`}>{children}</div>
}
export function CardHeader({ className = '', children }) {
  return <div className={`px-5 pt-5 ${className}`}>{children}</div>
}
export function CardTitle({ className = '', children }) {
  return <h3 className={`text-sm font-semibold text-slate-900 ${className}`}>{children}</h3>
}
export function CardDescription({ className = '', children }) {
  return <p className={`mt-1 text-xs text-slate-500 ${className}`}>{children}</p>
}
export function CardContent({ className = '', children }) {
  return <div className={`p-5 ${className}`}>{children}</div>
}
