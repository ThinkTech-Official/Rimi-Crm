import { FC } from "react";
import Dropdown from "../../../DropDown";
import { Countries } from "../step1/Constants";
import { UseFormReturn } from "react-hook-form";

// Define the shape of the form data for this section
export interface AddressData {
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    postalCode: string;
    country: string;
    province: string;
  };
}

interface AddressProps {
  methods: UseFormReturn<any>; // Using any or the specific type
}

const Address: FC<AddressProps> = ({ methods }) => {
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h3 className="text-lg font-bold text-left text-[#1B1B1B] mb-5">
        Address
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 md:gap-x-16 lg:gap-x-24 gap-y-4 text-text-secondary">
        <div className="flex flex-col">
          <label className="text-sm">Address Line 1</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Address Line 1"
            {...register("address.addressLine1", {
              required: "Address Line 1 is required",
            })}
          />
          {(errors.address as any)?.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.address as any).addressLine1.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Address Line 2</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Address Line 2"
            {...register("address.addressLine2")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">City</label>
          <input
            type="text"
            className="input-primary"
            placeholder="city"
            {...register("address.city", { required: "City is required" })}
          />
          {(errors.address as any)?.city && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.address as any).city.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Postal Code</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Postal Code"
            {...register("address.postalCode", {
              required: "Postal Code is required",
            })}
          />
          {(errors.address as any)?.postalCode && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.address as any).postalCode.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <Dropdown
            label="Country"
            options={Countries}
            {...register("address.country", { required: "Country is required" })}
          />
          {(errors.address as any)?.country && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.address as any).country.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Province/State</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Province/State"
            {...register("address.province", {
              required: "Province is required",
            })}
          />
          {(errors.address as any)?.province && (
            <p className="text-red-500 text-sm mt-1">
              {(errors.address as any).province.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Address;
