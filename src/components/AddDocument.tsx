const AddDocument = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="bg-white p-6 max-w-lg">
        <h2 className="text-xl font-semibold text-center">Add Documents</h2>
        <label htmlFor="fileUpload" className="input-primary w-full">
          Choose Files
        </label>
        <input
          type="file"
          id="fileUpload"
          multiple
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AddDocument;
