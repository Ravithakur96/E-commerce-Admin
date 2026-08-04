import React, { useState, PureComponent, useContext, useEffect} from "react";

import DashboardBoxes from "../../Components/DashboardBoxes";
import { Badge, Button } from "@mui/material";
import { FaPlus, FaRegEye } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Progress from "../../Components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { GoTrash } from "react-icons/go";
import TooltipMUI from "@mui/material/Tooltip";
import Pagination from "@mui/material/Pagination";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { MyContext } from "../../App";
import Rating from '@mui/material/Rating';
import axios from "axios";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import SearchBox from "../../Components/SearchBox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const columns = [
  { id: "product", label: "PRODUCT", minWidth: 150 },
  { id: "category", label: "CATEGORY", minWidth: 100 },
  { id: "subcategory", label: "SUB CATEGORY", minWidth: 150 },
  { id: "price", label: "PRICE", minWidth: 130 },
  { id: "sales", label: "SALES", minWidth: 100 },
  { id: "rating", label: "RATING", minWidth: 100 }, // ← naya column
  { id: "action", label: "ACTION", minWidth: 120 },
];


// function createData(name, code, population, size) {
//   const density = population / size;
//   return { name, code, population, size, density };
// }



const Dashboard = () => {
 const context = useContext(MyContext);
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [thirdCategoryFilter, setThirdCategoryFilter] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);


  const isShowOrderesProduct = (index) => {
    if (isOpenOrderdProduct === index) {
      setIsOpenOrderdProduct(null);
    } else {
      setIsOpenOrderdProduct(index);
    }
  };


  const[chart1Data, setChart1Data] = useState(
[
  {
    name: 'JAN',
    TotalSales: 2400,
    TotalUsers: 2800,
    amt: 2000,
  },
  {
    name: 'FEB',
    TotalSales: 3000,
    TotalUsers: 2600,
    amt: 2300,
  },
  {
    name: 'MARCH',
    TotalSales: 3400,
    TotalUsers: 3600,
    amt: 2500,
  },
  {
    name: 'APRIL',
    TotalSales: 4200,
    TotalUsers: 3800,
    amt: 3100,
  },
  {
    name: 'MAY',
    TotalSales: 3900,
    TotalUsers: 4400,
    amt: 3300,
  },
  {
    name: 'JUNE',
    TotalSales: 4700,
    TotalUsers: 4100,
    amt: 3600,
  },
  {
    name: 'JULY',
    TotalSales: 5200,
    TotalUsers: 5300,
    amt: 4000,
  },
  {
    name: 'AUG',
    TotalSales: 5600,
    TotalUsers: 5000,
    amt: 4200,
  },
  {
    name: 'SEP',
    TotalSales: 4900,
    TotalUsers: 5800,
    amt: 4300,
  },
  {
    name: 'OCT',
    TotalSales: 6100,
    TotalUsers: 5400,
    amt: 4600,
  },
  {
    name: 'NOV',
    TotalSales: 5800,
    TotalUsers: 6200,
    amt: 4800,
  },
  {
    name: 'DEC',
    TotalSales: 6500,
    TotalUsers: 6000,
    amt: 5000,
  },
]


  );


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

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };





    const filteredProducts = productData.filter((item) => {
    if (categoryFilter && item.catName !== categoryFilter) return false;
    if (subCategoryFilter && item.subCat !== subCategoryFilter) return false;
    if (thirdCategoryFilter && item.thirdsubCat !== thirdCategoryFilter) return false;
    return true;
  });

  const visibleRows = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const categories = [...new Set(productData.map(p => p.catName).filter(Boolean))];
  const subCategories = [...new Set(
    productData
      .filter(p => !categoryFilter || p.catName === categoryFilter)
      .map(p => p.subCat)
      .filter(Boolean)
  )];
  const thirdCategories = [...new Set(
    productData
      .filter(p => (!categoryFilter || p.catName === categoryFilter) &&
                   (!subCategoryFilter || p.subCat === subCategoryFilter))
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
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (checked) => {
    if (checked) setSelectedIds(visibleRows.map(item => item._id));
    else setSelectedIds([]);
  };

  const deleteProduct = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    const res = await deleteData(`/api/product/${id}`);
    if (res?.success) {
      context?.openAlertBox("Product deleted successfully");
      getProducts();
    } else {
      context?.openAlertBox(res?.message || "Failed to delete product");
    }
  };

  const deleteMultipleProducts = async () => {
    if (!selectedIds.length) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`);
    if (!confirmDelete) return;

    const res = await deleteData("/api/product/delete-multiple", { ids: selectedIds });
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
      <div className="w-full !py-2 !p-5 border bg-[#f1faff] border-[rgba(0,0,0,0.1)] flex items-center gap-8 !mb-5 justify-between rounded-md">
        <div className="info">
          <h1 className="text-[35px] font-bold leading-10 !mb-3">
            Good Morning,
            <br />
            Cameron
          </h1>
          <p>
            Here’s What happening on your store today. See the statistics at
            once.
          </p>
          <br />
          <Button className="btn-blue !capitalize" onClick={()=>context.setIsOpenFullScreenPanel({
                    open:true,
                    model:"Add Product"
                  })}>
            <FaPlus />
            Add Product
          </Button>
        </div>

        <img src="shop-illustration.jpg" className="w-[250px]" />
      </div>
      <DashboardBoxes />


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




<div className="w-[30%] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 px-2 py-2 mb-3">
  {/* Delete Button */}
  {selectedIds.length > 0 && (
    <Button
      className="btn !bg-red-600 !text-white btn-sm w-full md:w-auto"
      onClick={deleteMultipleProducts}
    >
      Delete ({selectedIds.length})
    </Button>
  )}

  {/* Search Box */}
  <div className="w-full md:w-[300px] mt-2 md:mt-0">
    <SearchBox />
  </div>
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

      <div className="card !my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between !px-5 !py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
        </div>

        <div className="relative overflow-x-auto !mt-5 !pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
              <tr>
                <th scope="col" className="!px-6 !py-3">
                  &nbsp;
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Order Id
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Payment Id
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Products
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Name
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Phone Number
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Address
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Pincode
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Total Amount
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Email
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  User Id
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Order Status
                </th>
                <th scope="col" className="!px-6 !py-3 whitespace-nowrap">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b  dark:border-gray-700 border-gray-200">
                <td className="!px-6 !py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderesProduct(0)}
                  >
                    {isOpenOrderdProduct === 0 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    68bb04fd228db479bbeda8f2
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    CASH ON DELIVERY
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    68b5ba3e228db479bbe4f232
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                  Sr Banda
                </td>
                <td className="!px-6 !py-4 font-[500]">91123456789</td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="block w-[400px]">
                    01 Anupshahr spots Uttar Pradesh India
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">200200</td>
                <td className="!px-6 !py-4 font-[500]">6567</td>
                <td className="!px-6 !py-4 font-[500]">srbanda96@gmail.com</td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    68b5ba3e228db479bbe4f232
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <Badge status="delivered" />
                </td>
                <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                  2025-09-05
                </td>
              </tr>
              {isOpenOrderdProduct === 0 && (
                <tr>
                  <td className="!pl-20" colSpan="6">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Product Tittle
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              SubTotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b  dark:border-gray-700 border-gray-200">
                            <td className="!px-6 !py-4 font-[500]">
                              <span className="text-gray-600">
                                68bb04fd228db479bbeda8f2
                              </span>
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              Zandu Chyavanprashad With No Added Sugar 900 gm
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742453050998_zandu-chyavanprashad-with-no-added-sugar-900-gm-prod-o1096116-p608315853-0-202403020815.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                              2
                            </td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                          </tr>

                          <tr className="bg-white border-b  dark:border-gray-700 border-gray-200">
                            <td className="!px-6 !py-4 font-[500]">
                              <span className="text-gray-600">
                                68bb04fd228db479bbeda8f2
                              </span>
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              Zandu Chyavanprashad With No Added Sugar 900 gm
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742453050998_zandu-chyavanprashad-with-no-added-sugar-900-gm-prod-o1096116-p608315853-0-202403020815.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                              2
                            </td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                          </tr>

                          <tr>
                            <td className="bg-[#f1f1f1]" colSpan="12"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}

              <tr className="bg-white border-b  dark:border-gray-700 border-gray-200">
                <td className="!px-6 !py-4 font-[500]">
                  <Button
                    className="!w-[35px] !h-[35px] !min-w-[35px] !rounded-full !bg-[#f1f1f1]"
                    onClick={() => isShowOrderesProduct(1)}
                  >
                    {isOpenOrderdProduct === 1 ? (
                      <FaAngleUp className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    ) : (
                      <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                    )}
                  </Button>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    68bb04fd228db479bbeda8f2
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    CASH ON DELIVERY
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    68b5ba3e228db479bbe4f232
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                  Sr Banda
                </td>
                <td className="!px-6 !py-4 font-[500]">91123456789</td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="block w-[400px]">
                    01 Anupshahr spots Uttar Pradesh India
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">200200</td>
                <td className="!px-6 !py-4 font-[500]">6567</td>
                <td className="!px-6 !py-4 font-[500]">srbanda96@gmail.com</td>
                <td className="!px-6 !py-4 font-[500]">
                  <span className="text-[#3872fa] font-[600]">
                    68b5ba3e228db479bbe4f232
                  </span>
                </td>
                <td className="!px-6 !py-4 font-[500]">
                  <Badge status="delivered" />
                </td>
                <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                  2025-09-05
                </td>
              </tr>
              {isOpenOrderdProduct === 1 && (
                <tr>
                  <td className="!pl-20" colSpan="6">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead claclassName="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                          <tr>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Product Id
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Product Tittle
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Image
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Quantity
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              className="!px-6 !py-3 whitespace-nowrap"
                            >
                              SubTotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white border-b  dark:border-gray-700 border-gray-200">
                            <td className="!px-6 !py-4 font-[500]">
                              <span className="text-gray-600 font-[600]">
                                68bb04fd228db479bbeda8f2
                              </span>
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              Zandu Chyavanprashad With No Added Sugar 900 gm
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742453050998_zandu-chyavanprashad-with-no-added-sugar-900-gm-prod-o1096116-p608315853-0-202403020815.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                              2
                            </td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                          </tr>

                          <tr className="bg-white border-b  dark:border-gray-700 border-gray-200">
                            <td className="!px-6 !py-4 font-[500]">
                              <span className="text-gray-600">
                                68bb04fd228db479bbeda8f2
                              </span>
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              Zandu Chyavanprashad With No Added Sugar 900 gm
                            </td>
                            <td className="!px-6 !py-4 font-[500]">
                              <img
                                src="https://serviceapi.spicezgold.com/download/1742453050998_zandu-chyavanprashad-with-no-added-sugar-900-gm-prod-o1096116-p608315853-0-202403020815.webp"
                                className="w-[40px] h-[40px] object-cover rounded-md"
                              />
                            </td>
                            <td className="!px-6 !py-4 font-[500] whitespace-nowrap">
                              2
                            </td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                            <td className="!px-6 !py-4 font-[500]">₹199.00</td>
                          </tr>
                          <tr>
                            <td className="bg-[#f1f1f1]" colSpan="12"></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between px-5 py-5 pb-0">
        <h2 className="text-[18px] font-[600]">Total Users & Total Sales</h2>
        </div>

        <div className="flex items-center gap-5 px-5 py-5 pt-1">
        <span className="flex items-center gap-1 text-[15px]"><span className="block w-[10px] h-[10px] rounded-full bg-green-600"></span>Total Users</span>
        <span className="flex items-center gap-1 text-[15px]"><span className="block w-[10px] h-[10px] rounded-full bg-[#3872ff]"></span>Total Sales</span>
        </div>

        <LineChart
        width={1000}
        height={500}
        data={chart1Data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="none"/>
        <XAxis dataKey="name" tick={{fontsize: 12}}/>
        <YAxis tick={{fontsize: 12}}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="TotalSales" stroke="#8884d8" strokeWidth={3} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="TotalUsers" stroke="#82ca9d" strokeWidth={3}/>
        {/* <Area type="monotone" dataKey="TotalUsers" stroke="#3872ff" fill="#3872ff" /> */}
      </LineChart>
      </div>
    </>
  );
};

export default Dashboard;
