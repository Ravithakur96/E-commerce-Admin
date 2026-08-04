import React, { useContext } from "react";
import { Button } from "@mui/material";
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import SearchBox from "../../Components/SearchBox";
import { MyContext } from "../../App";
import { MdLocalPhone, MdOutlineMarkEmailRead } from "react-icons/md";
import { SlCalender } from "react-icons/sl";


const label = { inputProps: { "aria-label": "Checkbox demo" } };
const columns = [
  { id: "UserImg", label: "USER IMAGE", minWidth: 80 },
  { id: "UserName", label: "USER NAME", minWidth: 100},
  {
    id: "userEmail",
    label: "USER EMAIL",
    minWidth: 150,
  },
  {
    id: "userPh",
    label: "USER PHONE NO",
    minWidth: 130,
  },
 {
    id: "createdDate",
    label: "Created",
    minWidth: 130,
  },
];


const Users = () => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);

    const context = useContext(MyContext)

    const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

    return (
    <>
             <div className="card !my-4 shadow-md sm:rounded-lg bg-white">
                <div className="flex items-center w-full px-5 justify-between">
                    <div className="col w-[40%]">
                    <h2 className="text-[18px] font-[600]">
                    Users List
                    <span className="font-[400] text-[14px]">(Material Ui Table)</span>
                </h2>
                    </div>
        
                    <div className="col p-4 w-[40%] ml-auto">
                    <SearchBox/>
                    </div>
        
                    
        
                </div>
        
                <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                    <TableRow>
                        <TableCell >
                        <Checkbox {...label} size="small" />
                        </TableCell>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
        
                    <TableBody>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <Checkbox {...label} size="small" />
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <td className="!px-0 !py-2">
                            <div class="flex items-center gap-4 w-[70px]">
                            <div className="img w-[45px] h-[45px] rounded-md overflow-hidden group">
                                <Link to="/product/45745" data-discover="true">
                                <img
                                    className="w-full group-hover:scale-105 transition-all                                           "
                                    src="https://mui.com/static/images/avatar/1.jpg"
                                />
                                </Link>
                            </div>
                            </div>
                          
                        </td>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        Ravi Bhati
                        </TableCell>
        
                        
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdOutlineMarkEmailRead/>Ravithakur@gmail.com</span>
                        </TableCell>
        
                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><MdLocalPhone/>+91-9638254936</span>
                        </TableCell>

                        <TableCell style={{ minWidth: columns.minWidth }}>
                        <span className="flex items-center gap-2"><SlCalender/>10-12-2024</span>
                        </TableCell>

                    </TableRow>
        
                    
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={10}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
    </>
    );
}

export default Users;
