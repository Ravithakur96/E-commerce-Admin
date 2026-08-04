import React, { useEffect, useRef, useState } from 'react';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { fetchDataFromApi } from '../../utils/api';
import {MdBrandingWatermark, MdFilterVintage, MdRateReview} from "react-icons/md"
import { BiSolidCategoryAlt } from "react-icons/bi";
import { BsPatchCheckFill } from "react-icons/bs";
import Rating from "@mui/material/Rating";
import { CircularProgress } from '@mui/material';

const ProductDetails = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const zoomSliderBig = useRef();
  const zoomSliderSml = useRef();

  const { id } = useParams();

  const goto = (index) => {
    setSlideIndex(index);
    zoomSliderSml.current?.swiper.slideTo(index);
    zoomSliderBig.current?.swiper.slideTo(index);
  };

  // Fetch product data
useEffect(() => {
  if (!id) return;

  const fetchProduct = async () => {
    setLoading(true);

    try {
      const res = await fetchDataFromApi(`/api/product/${id}`);

      setTimeout(() => {
        if (res?.error === false) {
          setProduct(res.product);
          setSlideIndex(0);
        } else {
          setError(res?.message || "Failed to fetch product");
        }

        setLoading(false); // ✅ yahin hona chahiye
      }, 1500);

    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching product");
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


  if (loading) return <p className="p-5 flex items-center justify-center h-96"><CircularProgress /></p>;
  if (error) return <p className="p-5 text-red-500">{error}</p>;
  if (!product) return <p className="p-5">Product not found</p>;

  return (
    <section className="p-5 bg-gray-50">
      <div className="flex items-center justify-between !px-2 !py-0 !mt-3">
        <h2 className="text-[18px] font-[600]">Product Details</h2>
      </div>
      <br />

      <div className="productDetails flex gap-8">
        <div className="w-[40%]">
          <div className="flex gap-3">
            {/* Thumbnails */}
            <div className="slider w-[15%]">
              <Swiper
                ref={zoomSliderSml}
                direction="vertical"
                slidesPerView={4}
                spaceBetween={10}
                navigation
                modules={[Navigation]}
                className="!h-[500px]"
              >
                {product?.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => goto(index)}
                      className={`rounded-md overflow-hidden cursor-pointer ${
                        slideIndex === index ? 'opacity-100' : 'opacity-40'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Main zoom slider */}
            <div className="zoomContainer w-[85%] h-[500px] overflow-hidden rounded-md">
              <Swiper ref={zoomSliderBig} slidesPerView={1}>
                {product?.images?.map((img, index) => (
                  <SwiperSlide key={index}>
                    <InnerImageZoom src={img} zoomType="hover" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-[60%] p-5 bg-white rounded-md shadow-md">
          <h1 className="text-2xl font-[500] mb-4">{product.name}</h1>



          <div className="flex items-center">
            <span className='w-[20%] font-[500] flex items-center gap-2 text-[14px]'><MdBrandingWatermark className='opacity-65'/>Brand:</span>
            <span className='text-[14px]'>{product.brand}</span>
          </div>


          <div className="flex items-center">
            <span className='w-[20%] font-[500] flex items-center gap-2'><BiSolidCategoryAlt className='opacity-65 text-[14px]'/>  Category:</span>
          
      <span className='text-[14px]'>{product.catName}</span>
          </div>


          


          {
            product?.productRam?.length!==0 &&

<div className="flex items-center">
            <span className='w-[20%] font-[500] flex items-center gap-2'><MdFilterVintage className='opacity-65 text-[14px]'/>  RAM:</span>

            <div className="flex items-center gap-2">
              {
                product?.productRam?.map((ram, index)=>{
                  return(

                    <span className=' inline-block bg-[#f1f1f1] p-2 shadow-sm text-[12px] font-[500]'  key={index}>{ram}</span>
                  )
                })
              }
            </div>
          
          </div>
          }

          {
            product?.size?.length!==0 &&

<div className="flex items-center">
            <span className='w-[20%] font-[500] flex items-center gap-2'><MdFilterVintage className='opacity-65 text-[14px]'/>  Size:</span>

            <div className="flex items-center gap-2">
              {
                product?.size?.map((ram, index)=>{
                  return(

                    <span className=' inline-block bg-[#f1f1f1] p-2 shadow-sm text-[12px] font-[500]'  key={index}>{ram}</span>
                  )
                })
              }
            </div>
          
          </div>
          }


          {
            product?.productWeight?.length!==0 &&

<div className="flex items-center">
            <span className='w-[20%] font-[500] flex items-center gap-2'><MdFilterVintage className='opacity-65 text-[14px]'/>  Weight:</span>

            <div className="flex items-center gap-2">
              {
                product?.productWeight?.map((ram, index)=>{
                  return(

                    <span className=' inline-block bg-[#f1f1f1] p-2 shadow-sm text-[12px] font-[500]'  key={index}>{ram}</span>
                  )
                })
              }
            </div>
          
          </div>
          }



          <div className="flex items-center">
            <span className='w-[20%] font-[500] flex items-center gap-2'><MdRateReview className='opacity-65 text-[14px]'/>Review:</span>
          
      <span className='text-[14px]'>({product.review?.length>0 ?product.review?.length : 0}) Review</span>
          </div>



          <div className="flex items-center">
            <span className='w-[20%] font-[500] flex items-center gap-2'><BsPatchCheckFill className='opacity-65 text-[14px]'/>Published:</span>
          
      <span className='text-[14px]'>{product.dateCreated?.split('T')[0]} </span>
          </div>


<br/>
      <h2 className='text-[25px] font-[500] mb-3'>Product Description</h2>
      {
        product?.description && <p className='text-[14px]'>{product?.description}</p>
      }
        </div>
      </div>

<br/>

      <h2 className='text-[18px] font-[500]'>Customer Reviews</h2>
      <div className="reviewsWrap mt-3">
        <div className="reviews w-full h-auto p-4 mb-3 bg-white rounded-md shadow-sm flex items-center justify-between" >
          <div className="flex items-center gap-8">
            <div className="img w-[85px] h-[85%] rounded-full overflow-hidden border-2 border-[#2b62c6]">
              <img src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png" className='w-full h-full object-cover '/>
            </div>

            <div className="info w[80%]">
              <div className="flex items-center justify-between">
                <h4 className='text-[16px] font-[500]'>Ravi Thakur</h4>
              <Rating name="read-only" value={5} readonly size="small"/>
              </div>
            <span className='text-[13px]'>2026-01-04</span>
            <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>


          </div>
        </div>

        <div className="reviews w-full h-auto p-4 mb-3 bg-white rounded-md shadow-sm flex items-center justify-between" >
          <div className="flex items-center gap-8">
            <div className="img w-[85px] h-[85%] rounded-full overflow-hidden border-2 border-[#2b62c6]">
              <img src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png" className='w-full h-full object-cover '/>
            </div>

            <div className="info w[80%]">
              <div className="flex items-center justify-between">
                <h4 className='text-[16px] font-[500]'>Ravi Thakur</h4>
              <Rating name="read-only" value={5} readonly size="small"/>
              </div>
            <span className='text-[13px]'>2026-01-04</span>
            <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>


          </div>
        </div>

        <div className="reviews w-full h-auto p-4 mb-3 bg-white rounded-md shadow-sm flex items-center justify-between" >
          <div className="flex items-center gap-8">
            <div className="img w-[85px] h-[85%] rounded-full overflow-hidden border-2 border-[#2b62c6]">
              <img src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png" className='w-full h-full object-cover '/>
            </div>

            <div className="info w[80%]">
              <div className="flex items-center justify-between">
                <h4 className='text-[16px] font-[500]'>Ravi Thakur</h4>
              <Rating name="read-only" value={5} readonly size="small"/>
              </div>
            <span className='text-[13px]'>2026-01-04</span>
            <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>


          </div>
        </div>


        <div className="reviews w-full h-auto p-4 mb-3 bg-white rounded-md shadow-sm flex items-center justify-between" >
          <div className="flex items-center gap-8">
            <div className="img w-[85px] h-[85%] rounded-full overflow-hidden border-2 border-[#2b62c6]">
              <img src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png" className='w-full h-full object-cover '/>
            </div>

            <div className="info w[80%]">
              <div className="flex items-center justify-between">
                <h4 className='text-[16px] font-[500]'>Ravi Thakur</h4>
              <Rating name="read-only" value={5} readonly size="small"/>
              </div>
            <span className='text-[13px]'>2026-01-04</span>
            <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>


          </div>
        </div>

        <div className="reviews w-full h-auto p-4 mb-3 bg-white rounded-md shadow-sm flex items-center justify-between" >
          <div className="flex items-center gap-8">
            <div className="img w-[85px] h-[85%] rounded-full overflow-hidden border-2 border-[#2b62c6]">
              <img src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png" className='w-full h-full object-cover '/>
            </div>

            <div className="info w[80%]">
              <div className="flex items-center justify-between">
                <h4 className='text-[16px] font-[500]'>Ravi Thakur</h4>
              <Rating name="read-only" value={5} readonly size="small"/>
              </div>
            <span className='text-[13px]'>2026-01-04</span>
            <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>


          </div>
        </div>

        <div className="reviews w-full h-auto p-4 mb-3 bg-white rounded-md shadow-sm flex items-center justify-between" >
          <div className="flex items-center gap-8">
            <div className="img w-[85px] h-[85%] rounded-full overflow-hidden border-2 border-[#2b62c6]">
              <img src="https://i.pinimg.com/originals/07/33/ba/0733ba760b29378474dea0fdbcb97107.png" className='w-full h-full object-cover '/>
            </div>

            <div className="info w[80%]">
              <div className="flex items-center justify-between">
                <h4 className='text-[16px] font-[500]'>Ravi Thakur</h4>
              <Rating name="read-only" value={5} readonly size="small"/>
              </div>
            <span className='text-[13px]'>2026-01-04</span>
            <p className='text-[13px] mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>


          </div>
        </div>

        


        
      </div>

<br/><br/>




    
      


    </section>
  );
};

export default ProductDetails;
