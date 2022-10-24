import { useEffect, useState } from "react"
import Style from "./Home.module.css"
import axios from "axios"
import { Link } from "react-router-dom"


export const Serach = () => {
    const [data, SetData] = useState([])
    const [error, SetError] = useState(false)
    const [loading, setloading] = useState(false)
    const [page, Setpage] = useState(1)
    const [value, setValue] = useState("")



    const fetchdata = () => {
        axios({
            method: "get",
            url: "https://doctor-patient123.herokuapp.com/users",
            params: {
                _page: page,
                _limit: 6
            }
        }).then((res) => {
            SetData(res.data)
            setloading(false)

        }).catch((err) => {
            SetError(err)

        })

    }


    useEffect(() => {
        fetchdata()
        setloading(true)

    }, [page])


    console.log(data)


    const handleDelete = (id) => {

        const updateditems = data.filter((e, ind) => {

            return ind !== id;
        })
        SetData(updateditems)

    }


    const handleReset=()=>{
        fetchdata()
    }



    const handleSearch = async (e) => {
        e.preventDefault();
        return await axios.get(`https://doctor-patient123.herokuapp.com/users/?q=${value}`)
            .then((res) => {
                SetData(res.data)
                setValue("")
            }).catch((err) => {
                console.log(err)
            })

    }






    console.log("allnotes")
    return (
        <>

            <div className={Style.loadingindicater}>{loading && <div> ...loading</div>}</div>


            <div>
                <form onSubmit={handleSearch}>
                    <input type="text" placeholder="Serach by title..." value={value} onChange={(e) => {
                        setValue(e.target.value)
                    }} />
                    <input type="submit" />
                    <input type="button"  value="Reset"  onClick={()=> handleReset()}/>
                </form>
            </div>

            <div className={Style.container}>

                {data.length == 0 ? (
                    <div> no data found </div>) : (

                    data.map((item, index) => {
                        return (



                            <div className={Style.main_div} key={index}>


                                <div className={Style.img_div}>  <img src="https://cdn4.vectorstock.com/i/1000x1000/24/03/notes-vector-19192403.jpg" height={100} width={100}></img></div>

                                <div className={Style.text_div}>  {item.title_note}</div>

                                <div className={Style.btndetail}> <button className={Style.detailbtn}><Link to={`/allnotes/${item.id}`}>More detal</Link></button>   </div>


                                <div className={Style.btn}> <button onClick={() => handleDelete(index)}>Delete</button>   </div>

                            </div>


                        )

                    })



                )









                }





            </div>

            <div className={Style.paginationbutton}>

                <button disabled={page === 1} onClick={() => Setpage(page - 1)}>prev</button>
                <button onClick={() => Setpage(page + 1)}>next</button>

            </div>
        </>

    )
}