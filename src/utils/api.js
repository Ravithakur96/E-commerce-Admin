import axios from 'axios'
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (URL, data) => {
  try {
    const token = localStorage.getItem("accesstoken");

    const response = await fetch(apiUrl + URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;

  } catch (err) {
    console.error("postData Error:", err);
    throw err;
  }
};

export const fetchDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("accesstoken");

    const params = {
      headers: {
        'Authorization': token ? `Bearer ${token}` : "",
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(apiUrl + url, params);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const uploadImage = async (url, formData) => {
  const token = localStorage.getItem("accesstoken");

  const { data } = await axios.post(
    apiUrl + url,
    formData,
    {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};


export const editData = async (url, updateData) => {
  const token = localStorage.getItem("accesstoken");

  const params = {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  };

  const { data } = await axios.put(apiUrl + url, updateData, params);
  return { data };
};



export const deleteImages = async (imageUrl) => {
  try {
    const token = localStorage.getItem("accesstoken");

    const response = await axios.delete(
      `${apiUrl}/api/category/deleteImage`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          img: imageUrl, // ✅ axios way (safe)
        },
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error deleting image:", err);
    throw err;
  }
};



export const deleteData = async (url, data = {}) => {
  try {
    const token = localStorage.getItem("accesstoken");

    // ✅ Agar data object empty hai, use na bhejo
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Agar data me kuch hai, body me daal do
    if (Object.keys(data).length > 0) {
      config.data = data;
    }

    const response = await axios.delete(`${apiUrl}${url}`, config);

    return response.data;
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
    throw err;
  }
};


