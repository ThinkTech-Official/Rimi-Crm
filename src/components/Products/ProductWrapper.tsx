import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import RIMICanuckVoyageTravelMedical from "./CanuckVoyageComponenets/RIMICanuckVoyageTravelMedical";
import RIMICanuckVoyageNonMedicalTravel from "./CanuckVoyageNon-MedicalTravel/RIMICanuckVoyageNon-MedicalTravel";
import SecureStudyRIMIInternationalStudentstoCanada from "./SecureStudyRIMIInternationalStudentstoCanada/SecureStudyRIMIInternationalStudentstoCanada";
import SecureTravelRIMIVisitorstoCanadaTravel from "./SecureTravelRIMIVisitorstoCanadaTravel/SecureTravelRIMIVisitorstoCanadaTravel";
import BulkUpload from "./SecureStudyRIMIInternationalStudentstoCanada/BulkUpload";

const ProductWrapper: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const renderProductComponent = () => {
    switch (slug) {
      case "canuck-voyage-travel-medical":
        return <RIMICanuckVoyageTravelMedical />;
      case "canuck-voyage-non-medical-travel":
        return <RIMICanuckVoyageNonMedicalTravel />;
      case "secure-study-international-students-to-canada":
        return <SecureStudyRIMIInternationalStudentstoCanada />;
      case "secure-travel-visitors-to-canada":
        return <SecureTravelRIMIVisitorstoCanadaTravel />;
      case "bulk-upload":
        return <BulkUpload />;
      default:
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold text-red-600">
              Product Not Found
            </h2>
            <p>The requested product "{slug}" could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-1">
        <span
          className="underline underline-offset-2 cursor-pointer text-sm text-primary font-medium"
          onClick={() => navigate("/products")}
        >
          Products
        </span>
        &gt;
        <span className="text-sm text-primary font-medium capitalize">
          {slug}
        </span>
      </div>
      {renderProductComponent()}
    </div>
  );
};

export default ProductWrapper;
