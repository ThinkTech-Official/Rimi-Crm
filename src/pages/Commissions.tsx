import { useState, useEffect } from "react";
import {
  useCommissions,
  useUpdateCommissionStatus,
} from "../hooks/admin-dashboard/useCommission";
import { CommissionsTable } from "../components/Tables";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { RenderPageNumbers } from "../components/RenderPageNumbers";
import DatePicker from "../components/DatePicker";
import { useLanguage } from "../context/LanguageContext";

export default function Commissions() {
  const { t } = useLanguage();
  const [page, setPage] = useState(1);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);
  const [appliedFilters, setAppliedFilters] = useState<{
    dateFrom?: string;
    dateTo?: string;
    agentCode?: string;
  }>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [agentCodeInput, setAgentCodeInput] = useState("");
  const limit = 10;

  const { mutate: fetchCommissions, data, isPending, error } = useCommissions();
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateCommissionStatus();

  // Initial fetch and fetch on appliedFilters/page change
  useEffect(() => {
    fetchCommissions({
      page,
      limit,
      ...appliedFilters,
    });
  }, [page, appliedFilters ]);

  const handlePageChange = (newPage: number) => {
    setPage(Math.max(1, newPage));
  };

  const handleSearch = () => {
    setPage(1);
     setAppliedFilters({
    dateFrom: dateFrom ? new Date(dateFrom).toISOString().split('T')[0] : undefined,
    dateTo: dateTo ? new Date(dateTo).toISOString().split('T')[0] : undefined,
    agentCode: agentCodeInput.trim() || undefined,
  });
  };

  const handleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && data?.items) {
      const actionable = data.items.filter(
        (c: any) =>
          !["reversed", "partially_reversed", "paid", "paid_to_agent"].includes(
            c.status,
          ),
      );
      setSelectedIds(actionable.map((c: any) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: string) => {
    updateStatus({ commissionId: id, newStatus: nextStatus });
  };

  const totalPages = data?.totalPages || 1;
  const commissions = data?.items || [];

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Header & Filters */}
      <div className="bg-white p-4">
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          {t("Commissions")}
        </h1>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-text-primary">
            {t("Agent Code")}
          </label>
          <input
            type="text"
            value={agentCodeInput}
            onChange={(e) => setAgentCodeInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. AGT001"
            className="border border-inputBorder px-3 py-2 text-sm focus:outline-none focus:border-primary w-44"
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div className="w-full sm:w-auto">
            <DatePicker
              label={t("From Date")}
              value={dateFrom || ""}
              onChange={(date: Date) => setDateFrom(date)}
            />
          </div>

          <div className="w-full sm:w-auto">
            <DatePicker
              label={t("To Date")}
              value={dateTo || ""}
              onChange={(date: Date) => setDateTo(date)}
            />
          </div>

          <button onClick={handleSearch} className="btn-primary">
            {t("Search")}
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-4 overflow-x-auto">
        <CommissionsTable
          data={commissions}
          loading={isPending}
          isUnderMGA={false}
          selectedIds={selectedIds}
          onSelect={handleSelect}
          onSelectAll={handleSelectAll}
          onUpdateStatus={handleUpdateStatus}
          isPending={isUpdating}
        />

        {/* Pagination */}
        {!isPending && !error && commissions.length > 0 && (
          <div className="flex items-center justify-center p-4 space-x-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => handlePageChange(page - 1)}
              className={`px-2 py-[10px] rounded ${
                page === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            <RenderPageNumbers
              onPageChange={handlePageChange}
              totalPages={totalPages}
              page={page}
            />

            <button
              disabled={page === totalPages}
              onClick={() => handlePageChange(page + 1)}
              className={`px-2 py-[10px] rounded ${
                page === totalPages
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300 cursor-pointer"
              }`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
