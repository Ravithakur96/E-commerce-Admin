import React, { useContext, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { MyContext } from "../../App";
import { FaAngleDown } from "react-icons/fa";
import EditSubCatBox from "./EditSubCatBox";

const SubCategoryList = () => {

  const [isOpen, setIsOpen] = useState(null);
  const context = useContext(MyContext);

  // 🔹 load category once
  useEffect(() => {
    if (context?.getCat) {
      context.getCat();
    }
  }, []);

  const expend = (index) => {
    setIsOpen(prev => (prev === index ? null : index));
  };

 return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between !px-2 !py-0 !mt-3">
        <h2 className="text-[18px] font-[600]">Sub Category List</h2>
        <div className="col w-[30%] ml-auto flex items-center justify-end gap-3">
          <Button
            className="btn-blue !text-white btn-sm"
            onClick={() =>
              context.setIsOpenFullScreenPanel({
                open: true,
                model: "Add New Sub Category",
              })
            }
          >
            Add New Sub Category
          </Button>
        </div>
      </div>

      {/* LIST */}
      <div className="card my-4 pt-5 pb-5 px-5 shadow-md sm:rounded-lg bg-white">
        {context?.catData?.length > 0 && (
          <ul className="w-full">
            {context.catData.map((item, index) => (
              <li key={item._id} className="border-b border-gray-200 py-3">

                {/* PARENT CATEGORY */}
                <div className="flex items-center w-full p-2 bg-[#f1f1f1] rounded-sm px-4">
                  <span className="font-[500] flex items-center gap-4 text-[14px]">
                    {item.name}
                  </span>

                  <Button
                    className="!min-w-[35px] !w-[35px] !h-[35px] !rounded-full !text-black !ml-auto"
                    onClick={() => expend(index)}
                  >
                    <span className="text-[14px]"><FaAngleDown /></span>
                  </Button>
                </div>

                {/* SUB CATEGORIES */}
                {isOpen === index && item?.children?.length > 0 && (
                  <ul className="w-full mt-3 pl-5">
                    {item.children.map((subItem) => (
                      <li key={subItem._id} className="border-b border-gray-200 py-2">
                        <EditSubCatBox
                          id={subItem._id}
                          name={subItem.name}
                          parentId={item._id}
                          parentName={item.name}
                          parentCategories={context.catData} // All main categories
                          thirdCategories={subItem?.children || []} // Third level if exists
                        />

                        {/* THIRD LEVEL */}
                        {subItem?.children?.length > 0 && (
                          <ul className="pl-4 mt-2">
                            {subItem.children.map((thirdLevel) => (
                              <li key={thirdLevel._id} className="py-1">
                                <EditSubCatBox
  id={thirdLevel._id}
  name={thirdLevel.name}
  parentId={subItem._id}
  parentName={subItem.name}
  subCategories={item.children}   // 🔥 ONLY sub categories
/>

                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}

              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SubCategoryList;