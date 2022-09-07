import { useEffect, useState } from "react"
import Style from "./notesdetail.module.css"   
import axios from "axios"
// import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"

export const Notesdetail=()=>{
    const {id} = useParams()

    const [data,SetData] = useState([])
    const [error,SetError] = useState(false)
    // const [loading,setloading] = useState(false)
 



     const fetchdata=()=>{
        axios({
            method:"get",
            url:`https://doctor-patient123.herokuapp.com/users/${id}`
        }).then((res)=>{
            SetData(res.data)
            // setloading(false)

        }).catch((err)=>{
            SetError(err)

        })

     }


     useEffect(()=>{
      fetchdata()
    //   setloading(true)
      handleDelete()
     },[])


     console.log(data)


     const handleDelete=(id)=>{

        const updateditems=data.filter((e,ind)=>{

            return ind !== id;
        })
        SetData(updateditems)
        
     }


    return(
        <>
        {/* <div className={Style.loadingindicater}>{loading&& <div> ...loading</div>}</div> */}

        <div className={Style.card}>

       

<div> {data?.title_note} </div>

        


        </div>
        </>
    )
}