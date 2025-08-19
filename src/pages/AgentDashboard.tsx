import { PieChart, Pie, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useAgentSummary } from '../hooks/agent-dashboard/useAgentSummary';
import { usePolicyTypeDistribution } from '../hooks/agent-dashboard/usePolicyTypeDistribution';
import { usePolicies } from '../hooks/agent-dashboard/usePolicies';
import { useQuotes } from '../hooks/agent-dashboard/useQuotes';
import type { PolicyRow, QuoteRow } from '../utils/types';
import { useState } from 'react';

export default function AgentDashboard() {
  // pagination state
  const [pPage, setPPage] = useState(1);
  const [qPage, setQPage] = useState(1);
  const limit = 10;

  // data hooks (axios instance reads token from cookie automatically)
  const { data: summary, loading: sLoading, error: sError } = useAgentSummary();
  const { data: dist, loading: dLoading, error: dError } = usePolicyTypeDistribution();
  const { data: policies, loading: pLoading, error: pError } = usePolicies(pPage, limit);
  const { data: quotes, loading: qLoading, error: qError } = useQuotes(qPage, limit);

  return (
    <div className="p-6 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <Kpi title="Total Policies" value={summary?.totalPolicies ?? (sLoading ? '…' : 0)} />
        <Kpi title="Total Quotes" value={summary?.totalQuotes ?? (sLoading ? '…' : 0)} />
        <Kpi title="Commission %" value={summary ? `${summary.commissionPercent}%` : (sLoading ? '…' : '0%')} />
        <Kpi title="Total Commissions" value={summary ? `$${(summary.totalCommissions).toFixed(2)}` : (sLoading ? '…' : '$0.00')} />
        <Kpi title="This Month Commissions" value={summary ? `$${(summary.currentMonthCommissions).toFixed(2)}` : (sLoading ? '…' : '$0.00')} />
        <Kpi title="Months in Data" value={summary?.monthlyPremiums.length ?? (sLoading ? '…' : 0)} />
      </div>

      {sError && <ErrorBox msg={`Failed to load summary: ${sError.message ?? sError}`} />}

      {/* Monthly premiums bar chart */}
      <div className="bg-white  rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Total Policy Premium per Month</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={summary?.monthlyPremiums ?? []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="ym" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {sLoading && <div className="text-xs text-gray-500 mt-2">Loading…</div>}
      </div>

      {/* Policy type distribution pie */}
      <div className="bg-white  rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Policy Type Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={dist ?? []} dataKey="count" nameKey="policyType" outerRadius={100} label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {dLoading && <div className="text-xs text-gray-500 mt-2">Loading…</div>}
        {dError && <ErrorBox msg={`Failed to load distribution: ${dError.message ?? dError}`} />}
      </div>

      {/* Policies table */}
      <div className="bg-white  rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Policies (Your Issued)</h3>
        {pError && <ErrorBox msg={`Failed to load policies: ${pError.message ?? pError}`} />}
        <TablePolicies data={policies?.items ?? []} loading={pLoading} />
        <Pager page={pPage} totalPages={policies?.totalPages ?? 1} onPage={setPPage} />
      </div>

      {/* Quotes table */}
      <div className="bg-white  rounded-2xl p-4 shadow">
        <h3 className="text-lg font-semibold mb-2">Quotes (Your Issued)</h3>
        {qError && <ErrorBox msg={`Failed to load quotes: ${qError.message ?? qError}`} />}
        <TableQuotes data={quotes?.items ?? []} loading={qLoading} />
        <Pager page={qPage} totalPages={quotes?.totalPages ?? 1} onPage={setQPage} />
      </div>
    </div>
  );
}

function Kpi({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-white dp-4 shadow flex flex-col">
      <span className="text-xs text-gray-500">{title}</span>
      <span className="text-2xl font-semibold">{value}</span>
    </div>
  );
}

function TablePolicies({ data, loading }: { data: PolicyRow[]; loading?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="p-2">Policy #</th>
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Premium</th>
            <th className="p-2">Status</th>
            <th className="p-2">Issued</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td className="p-2 text-gray-500" colSpan={6}>Loading…</td></tr>
          ) : data.length === 0 ? (
            <tr><td className="p-2 text-gray-500" colSpan={6}>No policies</td></tr>
          ) : data.map((p) => (
            <tr key={p.id} className="border-t border-gray-200/30">
              <td className="p-2">{p.policyNumber ?? '-'}</td>
              <td className="p-2">{p.firstName} {p.lastName}</td>
              <td className="p-2">{p.policyType ?? '-'}</td>
              <td className="p-2">{p.premium != null ? p.premium.toFixed(2) : '-'}</td>
              <td className="p-2">{p.status ?? '-'}</td>
              <td className="p-2">{p.dateIssued ? new Date(p.dateIssued).toLocaleDateString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TableQuotes({ data, loading }: { data: QuoteRow[]; loading?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left">
            <th className="p-2">Quote #</th>
            <th className="p-2">Name</th>
            <th className="p-2">Type</th>
            <th className="p-2">Premium</th>
            <th className="p-2">Product</th>
            <th className="p-2">Status</th>
            <th className="p-2">Created</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td className="p-2 text-gray-500" colSpan={7}>Loading…</td></tr>
          ) : data.length === 0 ? (
            <tr><td className="p-2 text-gray-500" colSpan={7}>No quotes</td></tr>
          ) : data.map((q) => (
            <tr key={q.id} className="border-t border-gray-200/30">
              <td className="p-2">{q.quoteNumber ?? '-'}</td>
              <td className="p-2">{q.firstName} {q.lastName}</td>
              <td className="p-2">{q.policyType ?? '-'}</td>
              <td className="p-2">{q.premium != null ? q.premium.toFixed(2) : '-'}</td>
              <td className="p-2">{q.product ?? '-'}</td>
              <td className="p-2">{q.status ?? '-'}</td>
              <td className="p-2">{new Date(q.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pager({ page, totalPages, onPage }: { page: number; totalPages: number; onPage: (p: number) => void }) {
  return (
    <div className="flex items-center gap-2 pt-3">
      <button className="px-3 py-1 rounded border" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        Prev
      </button>
      <span className="text-sm">Page {page} of {totalPages}</span>
      <button className="px-3 py-1 rounded border" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>
        Next
      </button>
    </div>
  );
}

function ErrorBox({ msg }: { msg: string }) {
  return <div className="text-sm text-red-600">{msg}</div>;
}