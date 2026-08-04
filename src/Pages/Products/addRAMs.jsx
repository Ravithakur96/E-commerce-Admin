import { Button, Checkbox } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { FaCloudUploadAlt } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { postData, fetchDataFromApi, deleteData, editData } from "../../utils/api";

const AddRAMS = () => {
  const [name, setName] = useState("");
  const [rams, setRams] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // GET ALL
  const getAllRAMS = async () => {
    const res = await fetchDataFromApi("/api/product/productRAMS");
    setRams(res.rams || []);
  };

  useEffect(() => {
    getAllRAMS();
  }, []);

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await postData("/api/product/productRAMS/create", { name });
    setName("");
    getAllRAMS();
  };

  // SINGLE SELECT
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // SELECT ALL
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(rams.map((x) => x._id));
    } else setSelectedIds([]);
  };

  // DELETE SINGLE
  const deleteSingleRAM = async (id) => {
    if (!window.confirm("Delete this RAM?")) return;
    await deleteData(`/api/product/productRAMS/${id}`);
    getAllRAMS();
  };

  // DELETE MULTIPLE
  const deleteMultipleRAMS = async () => {
    if (!selectedIds.length) return;
    if (!window.confirm("Delete selected RAMS?")) return;

    await postData("/api/product/productRAMS/delete-multiple", {
      ids: selectedIds,
    });

    setSelectedIds([]);
    getAllRAMS();
  };

  // EDIT START
  const startEdit = (item) => {
    setEditId(item._id);
    setEditValue(item.name);
  };

  // SAVE EDIT
  const saveEdit = async (id) => {
    await editData(`/api/product/productRAMS/${id}`, {
      name: editValue,
    });

    setEditId(null);
    setEditValue("");
    getAllRAMS();
  };

  // CANCEL
  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center justify-between !px-2 !py-0 !mt-3">
        <h2 className="text-[18px] font-[600]">Add Products RAMS</h2>

        {selectedIds.length > 0 && (
          <Button
            color="error"
            size="small"
            onClick={deleteMultipleRAMS}
            className="!flex !gap-1"
          >
            <GoTrash /> Delete Selected
          </Button>
        )}
      </div>

      {/* CREATE FORM */}
      <div className="card !my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <form className="form py-3 p-6" onSubmit={handleSubmit}>
          <div className="col mb-4">
            <h3 className="text-[14px] font-[500] mb-1 text-black">
              Product RAM
            </h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-[40px] p-3 border border-[rgba(0,0,0,0.2)] rounded-sm text-sm"
              placeholder="e.g. 4GB"
            />
          </div>

          <Button type="submit" className="btn-blue btn-lg w-full flex gap-2">
            <FaCloudUploadAlt className="text-white text-xl" />
            Publish and View
          </Button>
        </form>
      </div>

      {/* LIST */}
      <div className="card !my-4 pt-5 pb-5 shadow-md sm:rounded-lg bg-white w-[65%]">
        <div className="relative overflow-x-auto !mt-5 !pb-5">
          <table className="w-full text-sm text-left">
            <thead className="text-xs uppercase bg-gray-100">
              <tr>
                <th className="!px-2 !py-3 w-[10%]">
                  <Checkbox
                    {...label}
                    size="small"
                    checked={
                      rams.length > 0 &&
                      selectedIds.length === rams.length
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="!px-2 !py-3 w-[60%]">PRODUCT RAM</th>
                <th className="!px-6 !py-3 w-[30%]">ACTION</th>
              </tr>
            </thead>

            <tbody>
              {rams.map((item) => (
                <tr
                  key={item._id}
                  className="odd:bg-white even:bg-gray-50 border-b"
                >
                  <td className="!px-2 !py-2">
                    <Checkbox
                      size="small"
                      checked={selectedIds.includes(item._id)}
                      onChange={() => handleSelect(item._id)}
                    />
                  </td>

                  <td className="!px-6 !py-2">
                    {editId === item._id ? (
                      <input
                        value={editValue}
                        onChange={(e) =>
                          setEditValue(e.target.value)
                        }
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      item.name
                    )}
                  </td>

                  <td className="!px-6 !py-2">
                    <div className="flex gap-1">

                      {editId === item._id ? (
                        <>
                          <Button
                            onClick={() => saveEdit(item._id)}
                            className="!min-w-[60px] bg-green-500 text-white"
                          >
                            Save
                          </Button>

                          <Button
                            onClick={cancelEdit}
                            className="!min-w-[60px] bg-gray-400 text-white"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            onClick={() => startEdit(item)}
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full"
                          >
                            <AiOutlineEdit />
                          </Button>

                          <Button
                            onClick={() =>
                              deleteSingleRAM(item._id)
                            }
                            className="!w-[35px] !h-[35px] bg-[#f1f1f1] !rounded-full"
                          >
                            <GoTrash />
                          </Button>
                        </>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddRAMS;
