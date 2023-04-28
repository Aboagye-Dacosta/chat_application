import { useCallback, useEffect, useState } from "react";
import IconSearch from "../components/icons/IconSearch";

function ProductListings() {
  const [products, setProductsData] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProductsData(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className='w-full h-full bg-gray-200 flex flex-col overflow-auto px-5 pb-5'>
      <h2 className='text-[1.5rem] font-bold capitalize mx-5 my-5'>Products</h2>
      <section className='flex flex-col items-start justify-start bg-white min-h-screen  py-4 px-3'>
        {/* section header */}
        <div className='w-full py-2 px-3 flex items-center justify-between'>
          {/* section search bar */}
          <div className='flex items-center justify-center bg-gray-200 px-1 h-[2.5rem]'>
            <div className='flex item-center justify-center px-2'>
              <IconSearch className='text-[1.5rem] text-gray-500' />
            </div>
            <input
              type='text'
              name=''
              id=''
              className='w-[20rem] px-2 py-1 ring-0 border-none outline-none bg-transparent'
            />
            <div className='px-2 border-l-gray-400 border-l-[1px] h-full flex items-center justify-center relative'>
              <div>Filter</div>
              <input
                type='checkbox'
                name=''
                id=''
                className='dropChecked w-full h-full peer absolute top-0 left-0 opacity-0'
              />
              <ul className='absolute top-[110%] right-0 invisible peer-checked:visible bg-gray-300  w-max max-h-0 peer-checked:max-h-[10rem] transition-all duration-200 overflow-hidden select-none cursor-pointer'>
                <li className='px-3 py-2 hover:bg-gray-400'>Omaya</li>
                <li className='px-3 py-2 hover:bg-gray-400'>Concord</li>
                <li className='px-3 py-2 hover:bg-gray-400'>Shaolong</li>
                <li className='px-3 py-2 hover:bg-gray-400'>Travel man</li>
              </ul>
            </div>
          </div>
          <div className='bg-blue-600 px-3 py-2 text-white '>Submit</div>
        </div>
        <div className='w-full flex-1 px-3 py-2 flex flex-col items-start justify-start mt-3'>
          <table className='w-full mx-5 select-none cursor-pointer'>
            <tr className='h-[3.5rem] border-b border-gray-300'>
              <th className='text-left'>
                <input type='checkbox' name='' id='' />
              </th>
              <th className='text-left md:w-[15rem]'>Product Name</th>
              <th className='text-left md:w-[15rem]'>Category</th>
              <th className='text-left'>Variant</th>
              <th className='text-left'>Quantity</th>
              <th className='text-left'>Price</th>
              <th className='text-center'>Status</th>
            </tr>

            <tbody>
              {products?.map((product) => (
                <tr className='[&:not(:last-of-type)]:border-b border-gray-300 h-[3.5rem] '>
                  <td className=''>
                    <input type='checkbox' name='' id='' />
                  </td>
                  <td className=''>
                    <img
                      src={product?.image}
                      alt=''
                      className='w-[2rem] h-[2rem] mr-2 px-1 py-1 bg-gray-200 rounded-sm inline-block'
                    />
                    omaya m404
                  </td>
                  <td>{product?.category}</td>
                  <td>red , blue</td>
                  <td className=''>100</td>
                  <td className=''>{product?.price}</td>
                  <td className='text-center'>
                    <span className='bg-green-500 text-white inline-block px-3 py-1 rounded-[4rem]'>
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default ProductListings;
