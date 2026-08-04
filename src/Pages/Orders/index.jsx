import React, { useState } from 'react';
import { Button } from "@mui/material";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Badge from "../../components/Badge";
import SearchBox from '../../Components/SearchBox';

const Orders = () => {
    const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(null);
    
      const isShowOrderesProduct = (index) => {
        if (isOpenOrderdProduct === index) {
          setIsOpenOrderdProduct(null);
        } else {
          setIsOpenOrderdProduct(index);
        }
      };

  return (
     <div className="card !my-4 shadow-md sm:rounded-lg bg-white">
        <div className="flex items-center justify-between !px-5 !py-5">
          <h2 className="text-[18px] font-[600]">Recent Orders</h2>
          <div className="w-[40%]"><SearchBox/></div>
        </div>

        <div className="relative overflow-x-auto !mt-5 !pb-5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead claclassName="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
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
  );
}

export default Orders;
