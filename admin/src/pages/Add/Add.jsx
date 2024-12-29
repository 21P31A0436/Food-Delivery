import React, {  useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
const Add = () => {
    const [image,setImage] = useState(false)
    const url = "http://localhost:5000"
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    const onchange = (e)=>{
        const name = e.target.name;
        const value = e.target.value
        setData(data=>({...data,[name]:value}))
    }

    // useEffect(()=>{
    //     console.log(data)
    // },[data])

    const onsubmit = async (e)=>{
        e.preventDefault()
        console.log(data)
        const formdata = new FormData();
        formdata.append("name",data.name);
        formdata.append("description",data.description);
        formdata.append("price",Number(data.price));
        formdata.append("category",data.category);
        formdata.append("image",image);
        const response = await fetch(`${url}/api/food/add`,{
            method:"POST",
            body:formdata
        }
        );
        if(response.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:"Salad"

            });
            setImage(false)
            // toast.success(response.data.message)
        
        }
        else{
            toast.success("Food ADD")
            // alert("wrong food")
        }
        
    }

  return (
    <div className='add'>
        <form  className='flex-col' onSubmit={onsubmit}>

                <div className="flex-col">
                <div className='add-img-upload flex-col'>
                    <p>upload image</p>
                    <label htmlFor="image">
                        <img src={ image?URL.createObjectURL(image): assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden required/>
                </div>

                <div className="add-product-name flex-col">
                    <p>product name</p>
                    <input type="text" name='name' value={data.name} placeholder='type here'  onChange={onchange}/>
                </div>
                <div className="add-product-description flex-col">
                    <p>product description</p>
                    <textarea name="description" value={data.description} rows="6" placeholder='write conten here' id="" onChange={onchange}></textarea>
                </div>

                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select name="category" id="" onChange={onchange}>
                            <option value="Salad">Salad</option>
                            <option value="noodles">noodles</option>
                            <option value="Cake">Cake</option>
                            <option value="pure veg">pure veg</option>
                            <option value="pasta">pasta</option>
                            <option value="desert">desert</option>
                            <option value="rolls">rolls</option>
                            {/* <option value="Sandwich">Sandwich</option> */}
                        </select>
                        
                    </div>
                    <div className="add-price flex-col">
                        <p>product price</p>
                        <input type="number" name='price' value={data.price} placeholder='$20' onChange={onchange}/>
                    </div>
                </div>
                <button type='submit'>Add</button>
            </div>
        </form>
      
    </div>
  );
}

export default Add;
