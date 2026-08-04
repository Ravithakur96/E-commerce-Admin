import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Rating from "@mui/material/Rating";
import UploadBox from "../../Components/UploadBox";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { IoMdClose } from "react-icons/io";
import { Button, CircularProgress } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MyContext } from "../../App";
import { deleteImages, editData, fetchDataFromApi, postData } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    images: [],
    brand: "",
    price: "",
    oldPrice: "",
    category: "",
    catName: "",
    catId: "",
    subCatId: "",
    subCat: "",
    thirdsubCat: "",
    thirdsubCatId: "",
    countInStock: "",
    rating: "",
    isFeatured: false,
    discount: "",
    productRam: [],
    size: [],
    productWeight: [],
  });
  const [productCat, setProductCat] = useState("");
  const [productSubCat, setProductSubCat] = useState("");
  const [productThirdLevelCat, setProductThirdLevelCat] = useState("");
  const [productFeatured, setProductFeatured] = useState("");
const [selectedRam, setSelectedRam] = useState([]);
const [selectedWeight, setSelectedWeight] = useState([]);
const [selectedSize, setSelectedSize] = useState([]);
  const context = useContext(MyContext);
  const [previews, setPreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useNavigate();
  const [isEditLoaded, setIsEditLoaded] = useState(false);


const [ramList, setRamList] = useState([]);
const [weightList, setWeightList] = useState([]);
const [sizeList, setSizeList] = useState([]);

const editId = context?.isOpenFullScreenPanel?.id;

useEffect(() => {

  fetchDataFromApi("/api/product/productRAMS").then(res => {
    setRamList(res?.rams || []);
  });

  fetchDataFromApi("/api/product/productWEIGHT").then(res => {
    setWeightList(res?.weights || []);
  });

  fetchDataFromApi("/api/product/productSIZE").then(res => {
    setSizeList(res?.sizes || []);
  });

}, []);



useEffect(() => {
  if (!editId || isEditLoaded) return;

  fetchDataFromApi(`/api/product/${editId}`).then((res) => {
    if (res?.success) {
      const p = res.product;

      setFormFields({
        name: p.name || "",
        description: p.description || "",
        images: p.images || [],
        brand: p.brand || "",
        price: p.price || "",
        oldPrice: p.oldPrice || "",
        category: p.category?._id || "",
        catId: p.category?._id || "",
        catName: p.category?.name || "",
        subCatId: p.subCatId || "",
        subCat: p.subCat || "",
        thirdsubCatId: p.thirdsubCatId || "",
        thirdsubCat: p.thirdsubCat || "",
        countInStock: p.countInStock || "",
        rating: p.rating || "",
        isFeatured: p.isFeatured || false,
        discount: p.discount || "",
        productRam: p.productRam || [],
        size: p.size || [],
        productWeight: p.productWeight || [],
      });

      setProductCat(p.category?._id || "");
      setProductSubCat(p.subCatId || "");
      setProductThirdLevelCat(p.thirdsubCatId || "");
      setProductFeatured(p.isFeatured || false);

      setSelectedRam(p.productRam || []);
      setSelectedWeight(p.productWeight || []);
      setSelectedSize(p.size || []);
      setPreviews(p.images || []);

      setIsEditLoaded(true);
    }
  });
}, [editId]);



console.log("EDIT ID =>", editId);



  const handleChangeProductCat = (e) => {
    const value = e.target.value;
    setProductCat(value);

    const selectedCat = context.catData.find((cat) => cat._id === value);

    setFormFields((prev) => ({
      ...prev,
      category: value,
      catId: value,
      catName: selectedCat?.name || "",
    }));
  };

  const selectCatByName = (name) => {
    setFormFields((prev) => ({
      ...prev,
      catName: name,
    }));
  };

  const handleChangeProductSubCat = (e) => {
    const value = e.target.value;
    setProductSubCat(value);

    setFormFields((prev) => ({
      ...prev,
      subCatId: value,
    }));
  };

  const selectSubCatByName = (name) => {
    setFormFields((prev) => ({
      ...prev,
      subCat: name,
    }));
  };

  const handleChangeProductThirdLevelCat = (e) => {
    const value = e.target.value;
    setProductThirdLevelCat(value);

    setFormFields((prev) => ({
      ...prev,
      thirdsubCatId: value,
    }));
  };

  const selectThirdLevelCatByName = (name) => {
    setFormFields((prev) => ({
      ...prev,
      thirdsubCat: name,
    }));
  };

  const handleChangeProductFeatured = (event) => {
    const value = event.target.value;
    setProductFeatured(value);

    setFormFields((prev) => ({
      ...prev,
      isFeatured: value,
    }));
  };

const handleChangeProductRams = (e) => {
  setSelectedRam(e.target.value);

  setFormFields(prev => ({
    ...prev,
    productRam: e.target.value
  }));
};

const handleChangeProductWeight = (e) => {
  setSelectedWeight(e.target.value);

  setFormFields(prev => ({
    ...prev,
    productWeight: e.target.value
  }));
};

const handleChangeProductSize = (e) => {
  setSelectedSize(e.target.value);

  setFormFields(prev => ({
    ...prev,
    size: e.target.value
  }));
};


  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setFormFields(prev => ({
  ...prev,
  [name]: value
}));

  };

  const onChangeRating = (event, newValue) => {
    setFormFields((prev) => ({
      ...prev,
      rating: newValue,
    }));
  };

  const setPreviewsFun = (previewsArr) => {
    setPreviews(previewsArr);
  };

  const removeImage = async (index) => {
    const imageUrl = previews[index];
    try {
      await deleteImages(imageUrl);

      setTimeout(() => {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
      }, 1000);
    } catch (err) {
      console.error("Error deleting image:", err);
    }
  };

  useEffect(() => {
    setFormFields((prev) => ({
      ...prev,
      images: previews,
    }));
  }, [previews]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      context.openAlertBox("error", "Please enter product name");
      return false;
    }

    if (formFields.description === "") {
      context.openAlertBox("error", "Please enter product description");
      return false;
    }

    if (formFields.catId === "") {
      context.openAlertBox("error", "Please select product Category");
      return false;
    }

    if (formFields.price === "") {
      context.openAlertBox("error", "Please enter product price");
      return false;
    }

    if (formFields.oldPrice === "") {
      context.openAlertBox("error", "Please enter product old Price");
      return false;
    }

    if (formFields.brand === "") {
      context.openAlertBox("error", "Please enter product Brand");
      return false;
    }

    if (formFields.countInStock === "") {
      context.openAlertBox("error", "Please enter product stock");
      return false;
    }

    if (formFields.discount === "") {
      context.openAlertBox("error", "Please enter product discount");
      return false;
    }

    if (formFields.rating === "") {
      context.openAlertBox("error", "Please enter product rating");
      return false;
    }

    if (previews?.length === 0) {
      context.openAlertBox("error", "Please select product Image");
      return false;
    }

    setIsLoading(true);

editData(`/api/product/${editId}`, formFields)
  .then((res) => {
    if (res?.data?.success) {
      context.openAlertBox("success", "Product updated successfully");

      setTimeout(() => {
        setIsLoading(false);
        context.setIsOpenFullScreenPanel({ open: false });
        history("/products");
      }, 800);
    } else {
      setIsLoading(false);
      context.openAlertBox(
        "error",
        res?.data?.message || "Update failed"
      );
    }
  })
  .catch(() => {
    setIsLoading(false);
    context.openAlertBox("error", "Something went wrong");
  });

  };

  return (
    <section className="p-5 bg-gray-50">
      <form className="form py-3 p-8 " onSubmit={handleSubmit}>
        <div className="scroll max-h-[72vh] overflow-y-scroll pr-4">
          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Name
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="name"
                value={formFields.name}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mb-3">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Description
              </h3>
              <textarea
                type="text"
                className="w-full h-[140px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="description"
                value={formFields.description}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Category
              </h3>
              {context?.catData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productCat}
                  label="Category"
                  onChange={handleChangeProductCat}
                >
                  {context?.catData?.map((cat, index) => {
                    return (
                      <MenuItem
                        value={cat?._id}
                        onClick={() => {
                          selectCatByName(cat?.name);
                        }}
                      >
                        {cat?.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Sub Category
              </h3>

              {context?.suCatData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productSubCat}
                  label="Sub Category"
                  onChange={handleChangeProductSubCat}
                >
                 {context?.catData?.map(cat =>
  cat.children?.map(subCat => (
    <MenuItem
      key={subCat._id}
      value={subCat._id}
      onClick={() => selectSubCatByName(subCat.name)}
    >
      {subCat.name}
    </MenuItem>
  ))
)}
                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Third Level Category
              </h3>

              {context?.suCatData?.length !== 0 && (
                <Select
                  labelId="demo-simple-select-label"
                  id="productCatDrop"
                  size="small"
                  className="w-full"
                  value={productThirdLevelCat}
                  label="Sub Category"
                  onChange={handleChangeProductThirdLevelCat}
                >
                  {context?.catData?.map(cat =>
  cat.children?.map(subCat =>
    subCat.children?.map(third => (
      <MenuItem
        key={third._id}
        value={third._id}
        onClick={() => selectThirdLevelCatByName(third.name)}
      >
        {third.name}
      </MenuItem>
    ))
  )
)}

                </Select>
              )}
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="price"
                value={formFields.price}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Old Price
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="oldPrice"
                value={formFields.oldPrice}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Is Featured?
              </h3>
              <Select
                labelId="demo-simple-select-label"
                id="productCatDrop"
                size="small"
                className="w-full"
                value={productFeatured}
                label="Age"
                onChange={handleChangeProductFeatured}
              >
                <MenuItem value={true}>True</MenuItem>
                <MenuItem value={false}>False</MenuItem>
              </Select>
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Stock
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="countInStock"
                value={formFields.countInStock}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Brand
              </h3>
              <input
                type="text"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="brand"
                value={formFields.brand}
                onChange={onChangeInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Discount
              </h3>
              <input
                type="number"
                className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] focus:outline-none focus:border-[rgba(0,0,0,0.4)] rounded-sm text-sm"
                name="discount"
                value={formFields.discount}
                onChange={onChangeInput}
              />
            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product RAM
              </h3>
              <Select
  multiple
  size="small"
  className="w-full"
  value={selectedRam}
  onChange={handleChangeProductRams}
>
  {ramList.map(item => (
    <MenuItem key={item._id} value={item.name}>
      {item.name}
    </MenuItem>
  ))}
</Select>

            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Weight
              </h3>
              <Select
  multiple
  size="small"
  className="w-full"
  value={selectedWeight}
  onChange={handleChangeProductWeight}
>
  {weightList.map(item => (
    <MenuItem key={item._id} value={item.name}>
      {item.name}
    </MenuItem>
  ))}
</Select>

            </div>

            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Size
              </h3>
              <Select
  multiple
  size="small"
  className="w-full"
  value={selectedSize}
  onChange={handleChangeProductSize}
>
  {sizeList.map(item => (
    <MenuItem key={item._id} value={item.name}>
      {item.name}
    </MenuItem>
  ))}
</Select>

            </div>
          </div>

          <div className="grid grid-cols-4 mb-3 gap-4">
            <div className="col">
              <h3 className="text-[14px] font-[500] mb-1 text-black">
                Product Rating
              </h3>
              <Rating
                name="rating"
                value={Number(formFields.rating)}
                precision={0.5}
                onChange={onChangeRating}
              />
            </div>
          </div>

          <div className="col w-full p-5">
            <h3 className="font-[700] text-[18px] mb-3">Media & Images</h3>

            <div className="grid grid-cols-7 gap-4">
              {previews.map((img, index) => (
                <div key={index} className="relative">
                  <span
                    className="absolute -top-1 -right-1 bg-red-600
                w-5 h-5 rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => removeImage(index)}
                  >
                    <IoMdClose className="text-white text-sm" />
                  </span>

                  <div className="h-[150px] border rounded-md overflow-hidden">
                    <img src={img} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}

              <UploadBox
                multiple={true}
                name="images"
                url="/api/product/uploadImages"
                setPreviews={setPreviewsFun}
              />
            </div>
          </div>
        </div>
        <hr />
        <br />

        <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
          {isLoading ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            <>
              <FaCloudUploadAlt className="text-white text-xl" />
              Publish and View
            </>
          )}
        </Button>
      </form>
    </section>
  );
};

export default EditProduct;
