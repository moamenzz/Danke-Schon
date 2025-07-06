import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { createProperty, Property } from "../lib/apiRoutes";
import { useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Button from "../components/Button";

const CreatePropertyPage = () => {
  const [formData, setFormData] = useState<Property>({
    images: [""],
    title: "",
    description: "",
    address: "",
    price: 0,
    bedrooms: 0,
    bathrooms: 0,
    utilities: "",
    pets: false,
    incomePolicy: "",
    size: 0,
    nearestSchool: 0,
    nearestBusStop: 0,
    nearestRestrauant: 0,
    longitude: 0,
    latitude: 0,
  });
  const imagesRef = useRef<HTMLInputElement>(null);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const { mutate: createPropertyMutation } = useMutation({
    mutationFn: () => createProperty(formData),
  });

  const handleSetFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    const reader = new FileReader();
    reader.onload = () => {
      setImagesPreview([...imagesPreview, reader.result as string]);
    };
    reader.readAsDataURL(files![0]);
  };

  const handleRemoveImage = (index: number) => {
    setImagesPreview(imagesPreview.filter((_, i) => i !== index));
    if (imagesRef.current) imagesRef.current.value = "";
  };

  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <div className="grid grid-cols-2 gap-3 mt-6">
          {/* Left Side */}
          <div className="flex flex-col space-y-3">
            <h1 className="text-2xl font-semibold">Add New Property</h1>

            {/* Form */}
            <form
              className="space-y-3"
              onSubmit={() => createPropertyMutation()}
            >
              {/* Top Part */}
              <div className="flex items-center space-x-3">
                {/* Title */}
                <div className="space-x-3">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>

                {/* Price */}
                <div className="space-x-3">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    max={100000}
                    id="price"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>
                {/* Address */}
                <div className="flex flex-col gap-0.5">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              {/* Description Part */}
              <div className="space-y-1">
                <label htmlFor="desc">Description</label>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(value) =>
                    setFormData({ ...formData, description: value })
                  }
                  className="h-[16rem]"
                />
              </div>

              {/* Bottom Part */}
              <div className="flex items-center space-x-3 mt-13">
                <div>
                  <label htmlFor="bedrooms">Bedrooms</label>
                  <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    placeholder="No. Bedrooms"
                    value={formData.bedrooms}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="bathrooms">Bathrooms</label>
                  <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    placeholder="No. Bathrooms"
                    value={formData.bathrooms}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>

                {/* <div className="flex flex-col">
                  <label htmlFor="type">Type</label>
                  <select
                    name="type"
                    id="type"
                    value={formData.type}
                    onChange={handleSetFormData}
                    className="w-[100px] p-2.5 border border-gray-300 rounded"
                  >
                    <option value="">Both</option>
                    <option value="buy">Buy</option>
                    <option value="rent">Rent</option>
                  </select>
                </div> */}
              </div>

              <div className="flex items-center space-x-3">
                <div>
                  <label htmlFor="latitude">Latitude</label>
                  <input
                    type="text"
                    id="latitude"
                    name="latitude"
                    placeholder="Latitude"
                    value={formData.latitude}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="longitude">Longitude</label>
                  <input
                    type="text"
                    id="longitude"
                    name="longitude"
                    placeholder="Longitude"
                    value={formData.longitude}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>

                {/* <div className="flex flex-col">
                  <label htmlFor="pets">Pet Policy</label>
                  <select
                    name="pets"
                    id="pets"
                    value={formData.pets ? "true" : "false"}
                    onChange={handleSetFormData}
                    className="w-[100px] p-2.5 border border-gray-300 rounded"
                  >
                    <option value="false">No Pets</option>
                    <option value="true">Pets allowed</option>
                  </select>
                </div> */}
              </div>

              <div className="flex items-center space-x-5">
                {/* <div className="flex flex-col">
                  <label htmlFor="property">Property Type</label>
                  <select
                    name="property"
                    id="property"
                    value={formData.propertyType}
                    onChange={handleSetFormData}
                    className="w-[125px] p-2.5 border border-gray-300 rounded"
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="land">Land</option>
                  </select>
                </div> */}

                {/* <div className="flex flex-col">
                  <label htmlFor="utility">Utilities</label>
                  <select
                    name="property"
                    id="property"
                    value={formData.utilities}
                    onChange={handleSetFormData}
                    className="w-[190px] p-2.5 border border-gray-300 rounded"
                  >
                    <option value="owner">Owner is Responsible</option>
                    <option value="tenant">Tenant is Responsible</option>
                  </select>
                </div> */}

                <div>
                  <label htmlFor="incomePolicy">Income Policy</label>
                  <input
                    type="text"
                    id="incomePolicy"
                    name="incomePolicy"
                    placeholder="Income Policy"
                    value={formData.incomePolicy}
                    onChange={handleSetFormData}
                    className="w-full p-2.5 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <h1 className="text-lg font-semibold">
                  Nearby Services & Property Size
                </h1>

                <div className="flex items-center space-x-3">
                  <div>
                    <label htmlFor="size">Total Size</label>
                    <input
                      type="number"
                      name="size"
                      id="size"
                      placeholder="Total Size in meter square"
                      value={formData.size}
                      onChange={handleSetFormData}
                      className="w-full p-2.5 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label htmlFor="nearestSchool">Nearest School</label>
                    <input
                      type="text"
                      name="nearestSchool"
                      id="nearestSchool"
                      placeholder="Distance from nearest school in meter square"
                      value={formData.nearestSchool}
                      onChange={handleSetFormData}
                      className="w-full p-2.5 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label htmlFor="nearestRestrauant">
                      Nearest Restrauant
                    </label>
                    <input
                      type="text"
                      name="nearestRestrauant"
                      id="nearestRestrauant"
                      placeholder="Distance from nearest restrauant in meter square"
                      value={formData.nearestRestrauant}
                      onChange={handleSetFormData}
                      className="w-full p-2.5 border border-gray-300 rounded"
                    />
                  </div>

                  <div>
                    <label htmlFor="nearestBusStop">Nearest Bus Stop</label>
                    <input
                      type="text"
                      name="nearestBusStop"
                      id="nearestBusStop"
                      placeholder="Distance from nearest bus stop in meter square"
                      value={formData.nearestBusStop}
                      onChange={handleSetFormData}
                      className="w-full p-2.5 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="bg-gray-100 rounded-lg p-3">
            <h1 className="text-lg font-semibold">Property Images</h1>

            {formData.images.length < 2 ? (
              <div className="flex flex-col items-center justify-center h-full">
                <div>
                  <Button
                    children="Upload Images"
                    onClick={() => imagesRef.current?.click()}
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={imagesRef}
                  onChange={handleImages}
                  multiple
                  className="hidden"
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center h-full">
                {imagesPreview && (
                  <div className="space-y-3">
                    {imagesPreview.map((image, index) => (
                      <div className="w-32 h-32 relative">
                        <img
                          key={index}
                          src={image}
                          alt="property"
                          className=" w-full h-full object-cover rounded-lg border border-zinc-700"
                        />
                        <div className="absolute top-2 right-2">
                          <button
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyPage;
