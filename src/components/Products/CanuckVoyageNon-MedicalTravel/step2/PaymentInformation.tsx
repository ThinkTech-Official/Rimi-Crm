export default function PaymentInformation() {
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9] font-[inter]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-1">
        Payment Information
      </h3>

      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        Stripe Payment Integration
      </p>
      <div className="flex flex-col gap-4 text-sm text-[#000000/80]">
        <div className="p-4 border border-inputBorder bg-white">
          <p className="text-text-secondary">Stripe Code</p>
        </div>
      </div>
    </div>
  );
}
