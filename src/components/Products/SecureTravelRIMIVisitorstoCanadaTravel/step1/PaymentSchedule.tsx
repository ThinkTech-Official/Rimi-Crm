import { useLanguage } from "../../../../context/LanguageContext";

const PaymentSchedule = ({ schedule, totalPremium }: { schedule?: any; totalPremium: any }) => {
  const { t } = useLanguage();
  return (
    <div className="mt-4">
      {(schedule?.length ?? 0) > 0 && (
        <div className="mb-4">
          <p className="text-text-primary text-lg font-bold text-center">
            {t("Payment Schedule")}
          </p>
          <div className="flex flex-col gap-1 mt-2">
            {schedule?.map((item: any, idx: any) => (
              <div key={idx} className="flex justify-between">
                <span className="text-text-primary font-medium">
                  {item.count ? `${item.count} × ${t(item.label)}` : t(item.label)}
                </span>
                <span className="text-text-secondary">
                  ${item.amount.toFixed(2)} {t("CAD")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3 className="text-base text-text-secondary">
        <span className="font-bold text-text-primary">{t("Your Quote Amount:")}</span> ${totalPremium} {t("CAD")}
      </h3>
    </div>
  );
};

export default PaymentSchedule;