import React, { useEffect, useState } from 'react';
import './List.css'
import { toast } from 'react-toastify';
import axios from 'axios';
const List = () => {
  const [list,setList] = useState([]);

  const url = 'http://localhost:5000'
  const fetchlist = async()=>{

    // const response = axios.get(`${url}/api/food/list`)
    const response = await fetch('http://localhost:5000/api/food/list');
    const data = await response.json();
    console.log(data)
    if(data.success){
      setList(data.data)
    }
    else{
      toast.error("error")
    }
  }

  useEffect(()=>{
    fetchlist()
  },[])


  

  const removefood = async (foodId) => {
    
      const response = await fetch('http://localhost:5000/api/food/remove', {
        method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: foodId }),
          });
      // const response = await axios.post(`${url}/api/food/remove`,{id:foodId})
      await fetchlist();

      const data = await response.json();
      if(data.success){
        toast.success(data.message)
      }
      else{
        toast.error("Error");
      }
      
  }

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format">
          <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>

        {
          list.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.image} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <p className='cursor' onClick={()=>removefood(item._id)}>X</p>
              </div>
            )

          })
        }
      </div>
    </div>
  );
}

export default List;
