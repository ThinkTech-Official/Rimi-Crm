import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { FC, ChangeEvent } from "react";
import Dropdown from "../../../DropDown";
import { Countries } from "../step1/Constants";

interface Address {
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  province: string;
}

interface AddressProps {
  address: Address;
  setAddress: React.Dispatch<React.SetStateAction<Address>>;
}

const Address: FC<AddressProps> = ({ address, setAddress }) => {
  const onChange =
    (field: keyof Address) => (e: ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

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
            value={address.addressLine1}
            onChange={onChange("addressLine1")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Address Line 2</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Address Line 2"
            value={address.addressLine2}
            onChange={onChange("addressLine2")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">City</label>
          <input
            type="text"
            className="input-primary"
            placeholder="city"
            value={address.city}
            onChange={onChange("city")}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm">Postal Code</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={onChange("postalCode")}
          />
        </div>
        <Dropdown
          label="Country"
          onChange={(e) =>
            setAddress((prev) => ({ ...prev, country: e.target.value }))
          }
          options={Countries}
          value={address.country}
        />

        <div className="flex flex-col">
          <label className="text-sm">Province/State</label>
          <input
            type="text"
            className="input-primary"
            placeholder="Province/State"
            value={address.province}
            onChange={onChange("province")}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
