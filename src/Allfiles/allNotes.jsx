import { useEffect, useState } from "react"
import Style from "./Home.module.css"
import axios from "axios"
import { Link } from "react-router-dom"


export const AllNotes=()=>{
    const [data,SetData] = useState([])
    const [error,SetError] = useState(false)
    const [loading,setloading] = useState(false)
    const [page,Setpage] = useState(1)
   


    const fetchdata=()=>{
        axios({
            method:"get",
            url:"https://doctor-patient123.herokuapp.com/users",
            params:{
                _page:page,
                _limit:6
            }
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
    //   handleDelete()
     },[])


     console.log(data)


     const handleDelete=(id)=>{

        const updateditems=data.filter((e,ind)=>{

            return ind !== id;
        })
        SetData(updateditems)
        
     }






    console.log("allnotes")
    return(
        <>
        <div className={Style.loadingindicater}>{loading&& <div> ...loading</div>}</div>

        <div className={Style.container}>


          
        
          {data.map((e,ind)=>{
            return(
            
             

                <div className={Style.main_div} key={ind}> 
                   
                     
                      <div className={Style.img_div}>  <img src="https://cdn4.vectorstock.com/i/1000x1000/24/03/notes-vector-19192403.jpg" height={100} width={100}></img></div>

                    <div className={Style.text_div}>  {e.title_note}</div>

                 <div className={Style.btndetail}> <button className={Style.detailbtn}><Link to={`/allnotes/${e.id}`}>More detal</Link></button>   </div>
                    

                    <div className={Style.btn}> <button onClick={()=> handleDelete(ind)}>Delete</button>   </div>
                
                 </div>
                 
                
            )
        
          })}

          <button disabled={page===1} onClick={()=> Setpage(page-1)}>prev</button>
          <button onClick={()=> Setpage(page+1)}>next</button>


         

        </div>
        </>
 
    )
}