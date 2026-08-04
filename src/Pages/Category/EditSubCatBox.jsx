import { Button, Select, MenuItem, CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineModeEdit, MdSave } from 'react-icons/md';
import { MyContext } from '../../App';
import { editData, deleteData } from '../../utils/api';

const EditSubCatBox = ({
  id,
  name,
  parentId,
  parentName,
  parentCategories = [],   // MAIN categories
  subCategories = []       // SUB categories (for 3rd level)
}) => {

  const context = useContext(MyContext);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectVal, setSelectVal] = useState('');

  const [formFields, setFormFields] = useState({
    name: '',
    parentId: null,
    parentCatName: null,
  });

  // 🔹 Edit prefill
  useEffect(() => {
    if (editMode) {
      setFormFields({
        name,
        parentId,
        parentCatName: parentName,
      });
      setSelectVal(parentId);
    }
  }, [editMode]);

  // 🔹 Dropdown change
  const handleChange = (e) => {
    const value = e.target.value;
    setSelectVal(value);

    const sourceList = subCategories.length > 0 ? subCategories : parentCategories;

    const selected = sourceList.find(item => item._id === value);

    setFormFields(prev => ({
      ...prev,
      parentId: value,
      parentCatName: selected?.name || null,
    }));
  };

  // 🔹 Update
  const handleUpdate = async () => {
    if (!formFields.name || !formFields.parentId) {
      context.openAlertBox("error", "All fields required");
      return;
    }

    setLoading(true);
    try {
      const res = await editData(`/api/category/${id}`, formFields);

      if (res?.data?.success) {
        context.openAlertBox("success", "Category updated");
        setEditMode(false);
        context.getCat();
      }
    } catch {
      context.openAlertBox("error", "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete
const handleDelete = async () => {
  if (!window.confirm("Delete this category?")) return;

  setLoading(true);
  try {
    const res = await deleteData(`/api/category/${id}`);

    if (res?.success) {
      context.openAlertBox("success", "Category deleted");
      context.getCat();
    }
  } catch (error) {
    context.openAlertBox("error", "Delete failed");
  } finally {
    setLoading(false);
  }
};



  return (
    <form className='flex items-center gap-3 px-4'>

      {editMode ? (
        <div className='flex items-center gap-3 w-full'>
          
          {/* ✅ CORRECT DROPDOWN */}
          <Select
            size="small"
            className='w-[160px]'
            value={selectVal}
            onChange={handleChange}
          >
            {(subCategories.length > 0 ? subCategories : parentCategories)
              .map(item => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))}
          </Select>

          <input
            type="text"
            value={formFields.name}
            onChange={e => setFormFields({ ...formFields, name: e.target.value })}
            className='flex-1 h-[32px] border rounded px-3 text-sm'
          />

          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? <CircularProgress size={18} /> : <MdSave />}
          </Button>

          <Button onClick={() => setEditMode(false)}>✕</Button>
        </div>
      ) : (
        <>
          <span className='font-[500] text-[14px]'>{name}</span>

          <div className='ml-auto flex gap-2'>
            <Button onClick={() => setEditMode(true)}>
              <MdOutlineModeEdit />
            </Button>

            <Button onClick={handleDelete} disabled={loading}>
              {loading ? <CircularProgress size={18} /> : <FaRegTrashAlt />}
            </Button>
          </div>
        </>
      )}
    </form>
  );
};

export default EditSubCatBox;
