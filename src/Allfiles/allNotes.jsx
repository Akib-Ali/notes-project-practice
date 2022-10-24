import { useEffect, useState } from "react"
import Style from "./Home.module.css"
import axios from "axios"
import { Link } from "react-router-dom"


export const AllNotes=()=>{
    const [data,SetData] = useState([])
    const [error,SetError] = useState(false)
    const [loading,setloading] = useState(false)
    const [page,Setpage] = useState(1)
    const [sortvalue,setSortValue] = useState("")
    // const [value, setValue] = useState("")
   

    // sort funcrion
    const sortOptions =["title_note","date"]



    


    const fetchdata=()=>{
        axios({
            method:"get",
            url:"https://doctor-patient123.herokuapp.com/users",
            // params:{
            //     _page:page,
            //     _limit:6
            // }
        }).then((res)=>{
            SetData(res.data)
            setloading(false)

        }).catch((err)=>{
            SetError(err)

        })

     }


     useEffect(()=>{
      fetchdata()
      setloading(true)
    
     },[sortvalue])


     console.log(data)


     const handleDelete=(id)=>{

        const updateditems=data.filter((e,ind)=>{

            return ind !== id;
        })
        SetData(updateditems)
        
     }



     const handleSort = async (e) => {
        let value = e.target.value;
        setSortValue(value)
            return await axios.get(`https://doctor-patient123.herokuapp.com/users/?_sort=${value}&_order=asc`)
                .then((res) => {
                    SetData(res.data)
                    
                }).catch((err) => {
                    console.log(err)
                })
    
        }
    




    console.log("allnotes")
    return(
        <>
        <div className={Style.loadingindicater}>{loading&& <div> ...loading</div>}</div>


        {/* sorting work */}

      <div>
      <h3>Sort By:</h3>
      <select style={{width: "50%", borderRadius:"2px", height:"35px"}}
      onChange={handleSort}
      value={sortvalue}
      >
      <option>Please Select value</option>
      {sortOptions.map((item,index)=>(
        <option value={item} key={index}>{item}</option>

      ))}


      </select>

      <div><h3>Filter by Status</h3></div>
      
      
      </div>


        <div className={Style.container}>


         {data.map((e,ind)=>{
            return(
            
             

                <div className={Style.main_div} key={ind}> 
                   
                     
                      <div className={Style.img_div}>  <img src="https://cdn4.vectorstock.com/i/1000x1000/24/03/notes-vector-19192403.jpg" height={100} width={100}></img></div>

                    <div className={Style.text_div}>  {e.title_note}</div>

                    <div> {e.date}</div>

                    

                 <div className={Style.btndetail}> <button className={Style.detailbtn}><Link to={`/allnotes/${e.id}`}>More detal</Link></button>   </div>
                    

                    <div className={Style.btn}> <button onClick={()=> handleDelete(ind)}>Delete</button>   </div>
                
                 </div>
                 
                
            )
        
          })}

          

         

        </div>

        {/* <div className={Style.paginationbutton}>

         <button disabled={page===1} onClick={()=> Setpage(page-1)}>prev</button>
          <button onClick={()=> Setpage(page+1)}>next</button>

        </div> */}
        </>
 
    )
}