import { useState } from 'react'
import DataGuide from './components/DataGuide'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis
} from 'recharts'
import { Activity, ArrowDownRight, ArrowUpRight, CalendarDays, CircleHelp, Layers3, TrendingUp, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import {
  kpis, bookingTrend, funnel, cancellationReasons, customerMetrics, studioOps,
  supportTickets, businessMetrics, evidence
} from './lib/data'

const COLORS = ['#2563eb', '#0f766e', '#d97706', '#64748b']

function Delta({ item }) {
  const positive = item.direction === 'up'
  const isBad = item.label.includes('Cancellation') ? positive : !positive
  return (
    <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${isBad ? 'text-rose-600' : 'text-emerald-600'}`}>
      {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      {item.delta}
      <span className="ml-1 font-normal text-slate-400">{item.note}</span>
    </div>
  )
}

function KPIGrid() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
      {kpis.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <div className="text-xs font-medium text-slate-500">{item.label}</div>
            <div className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">{item.value}</div>
            <Delta item={item} />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function SectionTitle({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm"><Icon size={17} /></div>
      <div>
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        <p className="mt-0.5 text-xs text-slate-500">{description}</p>
      </div>
    </div>
  )
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const switchTab = (tab) => { setActiveTab(tab); window.scrollTo({ top: 0, behavior: 'instant' }); window.history.replaceState(null, '', window.location.pathname + window.location.search) }
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">H</div>
            <div>
              <div className="text-sm font-semibold text-slate-950">Hẹn Analytics</div>
              <div className="text-[11px] text-slate-500">Product performance · workshop dataset</div>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">
              <CalendarDays size={14} /> 01 Jul – 30 Sep 2026
            </div>
            <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-600">All studios</div>
          </div>
        </div>
        <div role="tablist" aria-label="Nội dung Hẹn Analytics" className="mx-auto flex max-w-[1500px] gap-2 px-4 pb-3 sm:px-6 lg:px-8">
          {[['dashboard', 'Dashboard'], ['guide', 'Hướng dẫn']].map(([id, label], index) => <button key={id} id={`tab-${id}`} type="button" role="tab" aria-selected={activeTab === id} aria-controls={`panel-${id}`} tabIndex={activeTab === id ? 0 : -1} onClick={() => switchTab(id)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 'dashboard' : event.key === 'End' ? 'guide' : index === 0 ? 'guide' : 'dashboard'; switchTab(next); document.getElementById(`tab-${next}`).focus() } }} className={`rounded-lg px-4 py-2 text-sm font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 ${activeTab === id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{label}</button>)}
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        {activeTab === 'dashboard' && <div role="tabpanel" id="panel-dashboard" aria-labelledby="tab-dashboard">
        <div className="space-y-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">Executive overview</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">Platform performance</h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-500">Synthetic dataset for prioritization training. Data is intentionally mixed: growth is healthy while several experience and operation signals deteriorate.</p>
          </div>
          <Badge tone="info">Static · Q3 2026</Badge>
        </div>

        <p className="text-xs text-slate-500">Executive KPI: latest 30-day window versus W4; other comparisons are labelled per metric. Targets are workshop hypotheses, not an agreed objective.</p>
        <KPIGrid />
        <nav aria-label="Dashboard sections" className="flex flex-wrap gap-2">
          {["Growth", "Customers", "Operations", "Business", "Evidence"].map((label, i) => <a key={label} href={`#section-${i}`} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 hover:border-blue-400 hover:text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">{label}</a>)}
        </nav>

        <section id="section-0" className="scroll-mt-24 space-y-3">
          <SectionTitle icon={TrendingUp} title="Growth & booking quality" description="12 weekly snapshots of rolling 30-day bookings and cancellation rates." />
          <div className="grid gap-4 xl:grid-cols-5">
            <Card className="xl:col-span-3">
              <CardHeader>
                <CardTitle>Booking trend</CardTitle>
                <CardDescription>Rolling 30-day booking count at each weekly snapshot; do not sum these overlapping windows.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] pt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={bookingTrend}>
                    <defs>
                      <linearGradient id="bookings" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.02}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} width={48} tickFormatter={(v) => `${Math.round(v/1000)}k`} />
                    <Tooltip formatter={(v) => Number(v).toLocaleString()} />
                    <Area type="monotone" dataKey="bookings" stroke="#2563eb" strokeWidth={2.5} fill="url(#bookings)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Cancellation rate</CardTitle>
                <CardDescription>Quality deteriorates as booking volume increases.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] pt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="week" axisLine={false} tickLine={false} />
                    <YAxis domain={[14, 26]} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Line type="monotone" dataKey="cancellation" stroke="#e11d48" strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="section-1" className="scroll-mt-24 space-y-3">
          <SectionTitle icon={Users} title="Booking funnel & customer behaviour" description="Where customers drop, return, reschedule and fail to show up." />
          <div className="grid gap-4 xl:grid-cols-5">
            <Card className="xl:col-span-3">
              <CardHeader>
                <CardTitle>Booking funnel</CardTitle>
                <CardDescription>90-day unique-user funnel; distinct from the rolling 30-day booking KPI.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 sm:grid-cols-4">
                  {funnel.map((step, idx) => (
                    <div key={step.stage} className="relative rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="text-[11px] font-medium uppercase tracking-wide text-slate-400">Step {idx + 1}</div>
                      <div className="mt-2 text-lg font-semibold text-slate-950">{step.users.toLocaleString()}</div>
                      <div className="mt-1 text-xs text-slate-600">{step.stage}</div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-blue-600" style={{ width: `${step.rate}%` }} /></div>
                      <div className="mt-1 text-[11px] text-slate-400">{step.rate}% of visits</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle>Customer behaviour</CardTitle>
                <CardDescription>Selected outcome and feature-adoption signals.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {customerMetrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2.5">
                    <div><div className="text-xs font-medium text-slate-700">{m.label}</div><div className="text-[11px] text-slate-400">vs. previous period</div></div>
                    <div className="text-right"><div className="text-base font-semibold text-slate-950">{m.value}</div><Badge tone={m.tone}>{m.delta}</Badge></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="section-2" className="scroll-mt-24 space-y-3">
          <SectionTitle icon={Activity} title="Cancellation & studio operations" description="Cancellation drivers sit alongside operational friction on the studio side." />
          <div className="grid gap-4 xl:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Cancellation reasons</CardTitle>
                <CardDescription>61% of all cancellations happen within 6 hours of the appointment.</CardDescription>
              </CardHeader>
              <CardContent className="grid items-center gap-4 sm:grid-cols-2">
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={cancellationReasons} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                        {cancellationReasons.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip formatter={(v) => `${v}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2.5">
                  {cancellationReasons.map((r, i) => (
                    <div key={r.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} /><span className="text-slate-600">{r.name}</span></div>
                      <span className="font-semibold text-slate-900">{r.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Studio operations</CardTitle>
                <CardDescription>Operational rates versus internal target.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {studioOps.map((m) => (
                  <div key={m.name}>
                    <div className="mb-2 flex items-center justify-between text-xs"><span className="font-medium text-slate-700">{m.name}</span><span className="text-slate-500">{m.value}% <span className="text-slate-300">/</span> target {m.target}%</span></div>
                    <div className="relative h-2 rounded-full bg-slate-100"><div className="h-2 rounded-full bg-slate-800" style={{ width: `${m.value}%` }} /><span className="absolute top-[-3px] h-4 w-0.5 bg-blue-500" style={{ left: `${m.target}%` }} /></div>
                  </div>
                ))}
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">Median onboarding time: <strong>6.8 days</strong> · target &lt;3 days</div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="section-3" className="scroll-mt-24 space-y-3">
          <SectionTitle icon={Layers3} title="Business & support" description="Commercial growth remains positive, but cost-to-serve and support load are rising." />
          <div className="grid gap-4 xl:grid-cols-5">
            <Card className="xl:col-span-2">
              <CardHeader><CardTitle>Business snapshot</CardTitle><CardDescription>Selected commercial metrics.</CardDescription></CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2">
                {businessMetrics.map((m) => (
                  <div key={m.label} className="rounded-lg border border-slate-200 p-3">
                    <div className="text-xs text-slate-500">{m.label}</div>
                    <div className="mt-1 text-xl font-semibold text-slate-950">{m.value}</div>
                    <div className="mt-1 text-[11px] text-slate-400">{m.delta}</div>
                  </div>
                ))}
                <div className="sm:col-span-2 rounded-lg bg-slate-950 px-4 py-3 text-xs text-white"><strong>63% of GMV</strong> comes from the top 20% of active studios.</div>
              </CardContent>
            </Card>

            <Card className="xl:col-span-3">
              <CardHeader><CardTitle>Support tickets</CardTitle><CardDescription>1,240 tickets/month · +32% versus previous period.</CardDescription></CardHeader>
              <CardContent className="h-[280px] pt-3">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={supportTickets} layout="vertical" margin={{ left: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} />
                    <YAxis dataKey="category" type="category" axisLine={false} tickLine={false} width={125} />
                    <Tooltip formatter={(v) => `${v} tickets`} />
                    <Bar dataKey="tickets" fill="#334155" radius={[0, 5, 5, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="section-4" className="scroll-mt-24 space-y-3">
          <SectionTitle icon={CircleHelp} title="Evidence board" description="Not every signal has the same evidence strength. Use this board to challenge assumptions." />
          <Card>
            <CardContent className="overflow-x-auto p-0">
              <table className="w-full min-w-[760px] border-collapse text-left text-xs">
                <thead className="bg-slate-50 text-slate-500"><tr><th className="px-5 py-3 font-medium">Source</th><th className="px-5 py-3 font-medium">Finding</th><th className="px-5 py-3 font-medium">Evidence strength</th></tr></thead>
                <tbody>
                  {evidence.map((row) => (
                    <tr key={row.source} className="border-t border-slate-100"><td className="px-5 py-3 font-medium text-slate-700">{row.source}</td><td className="px-5 py-3 text-slate-600">{row.finding}</td><td className="px-5 py-3"><Badge tone={row.confidence === 'High' ? 'positive' : row.confidence === 'Medium' ? 'warning' : 'neutral'}>{row.confidence}</Badge></td></tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </section>

        </div>
        </div>}
        {activeTab === 'guide' && <div role="tabpanel" id="panel-guide" aria-labelledby="tab-guide"><DataGuide /></div>}
        <footer className="border-t border-slate-200 py-5 text-center text-[11px] text-slate-400">Hẹn Analytics · synthetic workshop data · not production analytics</footer>
      </main>
    </div>
  )
}

export default Dashboard
