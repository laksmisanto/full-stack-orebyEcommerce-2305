import axios from "axios";
import { useEffect, useState } from "react";

const BannerImage = () => {
  let [imageUrl, setImageUrl] = useState("");
  let [allBannerImage, setAllBannerImage] = useState([]);

  const handleSubmitBannerImage = async () => {
    let formData = new FormData();
    formData.append("image", imageUrl);

    try {
      await axios
        .post(
          "http://localhost:3000/api/v1/bannerimage/createbannerimage",
          formData
        )
        .then(() => {
          console.log("image upload is successful");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getBannerImage() {
      await axios
        .get("http://localhost:3000/api/v1/bannerimage/allbannerimage")
        .then((data) => {
          setAllBannerImage(data.data);
        });
    }
    getBannerImage();
  }, [allBannerImage]);

  const handleDeleteBannerImage = async (id, image) => {
    console.log(id, image);

    try {
      await axios
        .post("http://localhost:3000/api/v1/bannerimage/deletebannerimage", {
          imageId: id,
          image: image,
        })
        .then(() => {
          console.log("Data delete successful");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full">
        {/* create store field and header files */}
        <div className="bg-gray-200 w-full pt-4 pb-6 px-4 fixed shadow-lg">
          <h2 className="font-semibold text-2xl text-gray-800 pb-2 mb-4">
            Upload Banner Images
          </h2>
          <div>
            <input
              onChange={(e) => setImageUrl(e.target.files[0])}
              type="file"
              name="store"
              id="store"
              className="border border-gray-400 rounded-l outline-none "
              placeholder="store name"
            />
            <button
              onClick={handleSubmitBannerImage}
              className="bg-sky-700 text-white px-3 py-1 border border-sky-700 rounded-r"
            >
              Add
            </button>
          </div>
        </div>

        {/* Live preview uploaded image */}

        <div className="w-full px-4 mt-36">
          <div className="w-auto h-44 mb-8">
            {imageUrl &&
              ((<span>preview</span>),
              (
                <img
                  src={URL.createObjectURL(imageUrl)}
                  alt="banner image upload"
                  className="w-auto h-full"
                />
              ))}
          </div>
          {/* All banner image show */}
          <div className="grid grid-cols-3 h-auto mb-8 gap-4">
            {allBannerImage.map((item, i) => (
              <div key={i} className="relative w-full h-auto">
                <img
                  src={item.image}
                  alt="banner image upload"
                  className="w-full h-auto shadow-md rounded"
                />
                <button
                  onClick={() => handleDeleteBannerImage(item._id, item.image)}
                  className="absolute right-0 bottom-0 bg-red-700 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BannerImage;
