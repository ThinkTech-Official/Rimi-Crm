export default function PaymentInformation() {
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-xl font-bold text-left text-[#1B1B1B] mb-6 font-[inter]">
      Payment Information
      </h3>

      <div className="flex flex-col gap-4 text-sm text-[#00000080] font-[inter]">
        <p className="text-[#1B1B1B] font-semibold">Stripe Payment Integration</p>
        <div className="p-4 border border-gray-300 rounded bg-white">
          <p>stripe code here</p>
        </div>
      </div>
    </div>
  );
}
