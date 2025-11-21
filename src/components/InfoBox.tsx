const InfoBox = ({
  title,
  text,
  onClose,
}: {
  title: string;
  text: string;
  onClose: () => void;
}) => (
  <div className="mx-auto p-4 mt-5 bg-white border border-inputBorder shadow-sm relative">
    <button
      className="text-sm sm:text-base text-primary underline absolute top-2 right-2 cursor-pointer underline-offset-2"
      onClick={onClose}
    >
      Close
    </button>
    <h2 className="text-base sm:text-lg font-semibold text-text-primary">{title}</h2>
    <div className="text-text-secondary text-sm sm:text-base">
      <p>{text}</p>
    </div>
  </div>
);

export default InfoBox;