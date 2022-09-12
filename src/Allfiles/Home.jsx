import { useEffect, useState } from "react"
import Style from "./Home.module.css"
import axios from "axios"
import { Link } from "react-router-dom"

export const Home=()=>{

    const [data,SetData] = useState([])
    const [error,SetError] = useState(false)
    const [loading,setloading] = useState(false)
    const [page,Setpage] = useState(1)
    const[datesort, Setdatesort] = useState("desc")
    const[titlesort,Settitllesort] = useState("desc")



    useEffect(()=>{
        fetchdata()
        setloading(true)
      //   handleDelete()
       },[page,datesort,titlesort])
  

     const fetchdata=()=>{
        axios({
            method:"GET",
            url:"https://doctor-patient123.herokuapp.com/users",
            params:{
                _page:page,
                _limit:6,
                _sort:"title_note,date",
                _order:`${titlesort}, ${datesort}`
            }
        }).then((res)=>{
            SetData(res.data)
            setloading(false)
            // setpage(page+1)

        }).catch((err)=>{
            SetError(err)

        })

     }


    

     console.log(data)


     const handleDelete=(id)=>{

        const updateditems=data.filter((e,ind)=>{

            return ind !== id;
        })
        SetData(updateditems)
        
     }


    return(
        <>
        <div className={Style.loadingindicater}>{loading&& <div> ...loading</div>}</div>
 
       <div className={Style.titlesort}> 
       <h1 className={Style.title_heading}>Sort By Title  </h1>
       <h1 className={Style.date_heading}>Sort By Date </h1>
       
       </div>
        <div className={Style.Sortingbtn}>
            <button className={Style.sort} onClick={()=> Settitllesort("asc")}>Ascending Order</button>
            <button className={Style.sort} onClick={()=> Settitllesort("desc")}>Descending  Order</button>
            <button className={Style.date_sort} onClick={()=> Setdatesort("asc")}>Ascending Order</button>
            <button  className={Style.date_sort} onClick={()=> Setdatesort("desc")}>Descending  Order</button>
        </div>

        <div className={Style.container}>
          
        
          {data.map((e,ind)=>{
            return(
            
             

                <div className={Style.main_div} key={ind}> 
                   
                     
                      <div className={Style.img_div}>  <img src="https://cdn4.vectorstock.com/i/1000x1000/24/03/notes-vector-19192403.jpg" height={100} width={100}></img></div>

                    <div className={Style.text_div}>  {e.title_note}</div>

                    <div className={Style.text_div}> {e.date}</div>

                     <div className={Style.btndetail}> <button className={Style.detailbtn}><Link to={`/allnotes/${e.id}`}>More detal</Link></button>   </div> 
                    {/* <Link to={`/allnotes/${e.id}`}>More detal</Link> */}

                    <div className={Style.btn}> <button onClick={()=> handleDelete(ind)}>Delete</button>   </div>
                
                 </div>
                 
                
            )

          
        
          })}

         
         
        </div>


        <div className={Style.paginationbutton}>

         <button disabled={page===1} onClick={()=> Setpage(page-1)}>prev</button>
          <button onClick={()=> Setpage(page+1)}>next</button>
 
        </div>


        </>
    )
}