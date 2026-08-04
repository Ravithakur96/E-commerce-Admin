import React, { useContext, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
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
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { deleteData, fetchDataFromApi } from "../../utils/api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "image", label: "IMAGE", minWidth: 150 },
  { id: "catName", label: "CATEGORY NAME", minWidth: 150 },
  { id: "action", label: "ACTION", minWidth: 100 },
];

const Category = () => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const [loadingDelete, setLoadingDelete] = useState(null); // 🟢 loading per category

  const context = useContext(MyContext);

  useEffect(() => {
    fetchDataFromApi("/api/category").then((res) => {
      context?.setCatData(res.data);
    });
  }, [context?.isOpenFullScreenPanel]);




  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

const deleteCat = async (id) => {
  if (!window.confirm("Are you sure you want to delete this category?"))
    return;

  try {
    setLoadingDelete(id);

    // ✅ FIX HERE
    const res = await deleteData(`/api/category/${id}`);

    if (res.success) {
      context?.setCatData((prev) =>
        prev.filter((cat) => cat._id !== id)
      );
      context?.openAlertBox("success", "Category deleted successfully!");
    } else {
      context?.openAlertBox(
        "error",
        res.message || "Failed to delete category"
      );
    }
  } catch (err) {
    console.error(err);
    context?.openAlertBox("error", "Something went wrong");
  } finally {
    setLoadingDelete(null);
  }
};


  return (
    <>
      <div className="flex items-center justify-between !px-2 !py-0 !mt-3">
        <h2 className="text-[18px] font-[600]">
          Category List
        
        </h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button className="btn !bg-green-600 !text-white btn-sm ">
            Export
          </Button>
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Category",
              })
            }
          >
            Add New Category
          </Button>
        </div>
      </div>

      <div className="card !my-4 shadow-md sm:rounded-lg bg-white">
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell width={60}>
                  <Checkbox {...label} size="small" />
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {context?.catData?.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <Checkbox {...label} size="small" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4 w-[80px]">
                      <div className="img w-full rounded-md overflow-hidden group">
                        <Link to="/product/45745" data-discover="true">
                          <LazyLoadImage
                            alt={"image"}
                            effect="blur"
                            className="w-full group-hover:scale-105 transition-all"
                            src={item.images[0]}
                          />
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <TooltipMUI title="Edit Category" placement="top">
                        <Button
                          className="!w-[30px] !h-[35px] bg-[#f1f1f1] !border !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
                          onClick={() =>
                            context.setIsOpenFullScreenPanel({
                              open: true,
                              model: "Edit Category",
                              id: item._id,
                            })
                          }
                        >
                          <AiOutlineEdit className="text-[20px]" />
                        </Button>
                      </TooltipMUI>

                      <TooltipMUI title="Delete Category" placement="top">
                        <Button
                          className="!w-[30px] !h-[35px] bg-[#f1f1f1] !border !rounded-full hover:!bg-[#f1f1f1] !min-w-[35px]"
                          onClick={() => deleteCat(item._id)}
                          disabled={loadingDelete === item._id}
                        >
                          {loadingDelete === item._id ? (
                            <CircularProgress size={16} />
                          ) : (
                            <GoTrash className="text-[18px]" />
                          )}
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
          count={context?.catData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
};

export default Category;
