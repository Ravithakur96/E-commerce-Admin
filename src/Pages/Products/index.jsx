import React, { useContext, useEffect, useState } from "react";
import { Button, Rating } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import TooltipMUI from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FaRegEye } from "react-icons/fa";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { fetchDataFromApi, deleteData, postData } from "../../utils/api";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 },
  { id: "action", label: "ACTION", minWidth: 120 },
];

const Products = () => {
  const [categoryFilterVal, setCategoryFilterVal] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [productData, setProductData] = useState([]);
const [categoryFilter, setCategoryFilter] = useState("");
const [subCategoryFilter, setSubCategoryFilter] = useState("");
const [thirdCategoryFilter, setThirdCategoryFilter] = useState("");
const [selectedIds, setSelectedIds] = useState([]);


  const context = useContext(MyContext);

  // 🔹 Fetch Products
  const getProducts = async () => {
    const res = await fetchDataFromApi("/api/product/getAllProducts");
    if (res?.success) {
      setProductData(res.products || []);
    } else {
      setProductData([]);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    getProducts();
  }, [context?.isOpenFullScreenPanel]);

  // 🔹 Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeCatFilter = (event) => {
    setCategoryFilterVal(event.target.value);
  };

  const filteredProducts = productData.filter((item) => {
  if (categoryFilter && item.catName !== categoryFilter) return false;
  if (subCategoryFilter && item.subCat !== subCategoryFilter) return false;
  if (thirdCategoryFilter && item.thirdsubCat !== thirdCategoryFilter) return false;
  return true;
});

  // 🔹 Visible rows (IMPORTANT FIX)
const visibleRows = filteredProducts.slice(
  page * rowsPerPage,
  page * rowsPerPage + rowsPerPage
);


const deleteProduct = async (id) => {
  if (!id) return;

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  const res = await deleteData(`/api/product/${id}`);

  if (res?.success) {
    context?.openAlertBox("Product deleted successfully");
    getProducts(); 
  } else {
    context?.openAlertBox(res?.message || "Failed to delete product");
  }
};

const categories = [...new Set(productData.map(p => p.catName).filter(Boolean))];

const subCategories = [...new Set(
  productData
    .filter(p => !categoryFilter || p.catName === categoryFilter)
    .map(p => p.subCat)
    .filter(Boolean)
)];

const thirdCategories = [...new Set(
  productData
    .filter(p =>
      (!categoryFilter || p.catName === categoryFilter) &&
      (!subCategoryFilter || p.subCat === subCategoryFilter)
    )
    .map(p => p.thirdsubCat)
    .filter(Boolean)
)];





const handleCategoryChange = (e) => {
  setCategoryFilter(e.target.value);
  setSubCategoryFilter("");
  setThirdCategoryFilter("");
  setPage(0);
};

const handleSubCategoryChange = (e) => {
  setSubCategoryFilter(e.target.value);
  setThirdCategoryFilter("");
  setPage(0);
};

const handleThirdCategoryChange = (e) => {
  setThirdCategoryFilter(e.target.value);
  setPage(0);
};


const handleSelectProduct = (id) => {
  setSelectedIds((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};

const handleSelectAll = (checked) => {
  if (checked) {
    setSelectedIds(visibleRows.map((item) => item._id));
  } else {
    setSelectedIds([]);
  }
};

const deleteMultipleProducts = async () => {
  if (selectedIds.length === 0) return;

  const confirmDelete = window.confirm(
    `Are you sure you want to delete ${selectedIds.length} products?`
  );
  if (!confirmDelete) return;

  const res = await deleteData(
    "/api/product/delete-multiple",
    { ids: selectedIds }   // ✅ ab body jayegi
  );

  if (res?.success) {
    context.openAlertBox(res.message);
    setSelectedIds([]);
    getProducts();
  } else {
    context.openAlertBox(res?.message || "Delete failed");
  }
};





  return (
    <>
      <div className="flex items-center justify-between !px-2 !py-0 !mt-3">
        <h2 className="text-[18px] font-[600]">Products</h2>

        


        <div className="col w-[25%] ml-auto flex items-center justify-end gap-3">



{selectedIds.length > 0 && (
  <Button
    className="btn !bg-red-600 btn !text-white btn-sm"
    onClick={deleteMultipleProducts}
  >
    Delete ({selectedIds.length})
  </Button>
)}



          <Button className="btn !bg-green-600 !text-white btn-sm">
            Export
          </Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add Product",
              })
            }
          >
            Add Product
          </Button>
        </div>
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center w-full px-5 justify-between gap-4">
          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] !mt-3 !mb-2">Category By</h4>
            {context?.catData?.length !== 0 && (
                <Select
  className="!w-full !mb-2"
  style={{ zoom: "80%" }}
  size="small"
  value={categoryFilter}
  onChange={handleCategoryChange}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {categories.map((cat) => (
    <MenuItem key={cat} value={cat}>
      {cat}
    </MenuItem>
  ))}
</Select>

              )}
          </div>

          <div className="col w-[15%]">
            <h4 className="font-[600] text-[13px] !mt-3 !mb-2">Sub Category By</h4>
           <Select
  className="!w-full !mb-2"
  style={{ zoom: "80%" }}
  size="small"
  value={subCategoryFilter}
  onChange={handleSubCategoryChange}
  disabled={!categoryFilter}
>
  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {subCategories.map((sub) => (
    <MenuItem key={sub} value={sub}>
      {sub}
    </MenuItem>
  ))}
</Select>

          </div>

          <div className="col w-[18%]">
            <h4 className="font-[600] text-[13px] !mt-3 !mb-2">Third Level Category By</h4>
            <Select
  className="!w-full !mb-2"
  style={{ zoom: "80%" }}
  size="small"
  value={thirdCategoryFilter}
  onChange={handleThirdCategoryChange}
  disabled={!subCategoryFilter}
>

  <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {thirdCategories.map((third) => (
    <MenuItem key={third} value={third}>
      {third}
    </MenuItem>
  ))}
</Select>

          </div>

          <div className="col w-[20%] ml-auto">
            <SearchBox />
          </div>
        </div>

        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
  <Checkbox
    size="small"
    checked={
      visibleRows.length > 0 &&
      selectedIds.length === visibleRows.length
    }
    onChange={(e) => handleSelectAll(e.target.checked)}
  />
</TableCell>

                {columns.map((column) => (
                  <TableCell key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>



              {visibleRows.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
  <Checkbox
    size="small"
    checked={selectedIds.includes(item._id)}
    onChange={() => handleSelectProduct(item._id)}
  />
</TableCell>


                  <TableCell>
                    <td className="!px-0 !py-2">
                      <div className="flex items-center gap-4 w-[300px]">
                        <div className="img w-[65px] h-[65px] rounded-md overflow-hidden group">
                          <Link to={`/product/${item._id}`}>
                            <img
                              className="w-full group-hover:scale-105 transition-all"
                              src={item.images?.[0]}
                              alt={item.name}
                            />
                          </Link>
                        </div>
                        <div className="info w-[75%]">
                          <h3 className="font-[600] text-[12px] leading-4 hover:text-[#3872fa]">
                            {item.name}
                          </h3>
                          <span className="text-[12px]">{item.brand}</span>
                        </div>
                      </div>
                    </td>
                  </TableCell>

                  <TableCell>
                    {item.category?.name || item.catName}
                  </TableCell>

                  <TableCell>{item.subCat}</TableCell>

                  <TableCell>
                    <div className="flex gap-1 flex-col">
                      <span className="oldPrice line-through text-gray-500">
                        ₹{item.oldPrice}
                      </span>
                      <span className="price text-[#3872ff] font-[600]">
                        ₹{item.price}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <p className="text-[14px]">
                      <span className="font-[600]">{item.Sale}</span> sale
                    </p>
                    <Progress value={item.rating * 20} type="warning" />
                  </TableCell>

<TableCell>
  <Rating
    name="product-rating"
    value={Number(item.rating)}
    precision={0.5}
    readOnly
    size="small"
  />
</TableCell>



                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TooltipMUI title="Edit Product">
                        <Button className="!w-[30px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"  onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Edit Product",
                id: item?._id,
              })
            }>
                          <AiOutlineEdit className="!text-[rgba(0,0,0,0.7)] text-[20px]"/>
                        </Button>
                      </TooltipMUI>

                      <Link to={`/product/${item?._id}`}>

                      <TooltipMUI title="View Product Details">
                        <Button className="!w-[30px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]">
                          <FaRegEye className="!text-[rgba(0,0,0,0.7)] text-[20px]"/>
                        </Button>
                      </TooltipMUI></Link>

                     <TooltipMUI title="Remove Product">
  <Button
    className="!w-[30px] !h-[35px] bg-[#f1f1f1] !border !border-[rgba(0,0,0,0.4)] !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
    onClick={() => deleteProduct(item._id)}
  >
    <GoTrash className="!text-[rgba(0,0,0,0.7)] text-[20px]" />
  </Button>
</TooltipMUI>

                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredProducts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Products;
