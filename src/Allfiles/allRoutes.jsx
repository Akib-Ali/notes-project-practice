import { Route, Routes } from "react-router-dom"
import { Home } from "./Home"
import { Navbar } from "./navbar"
import { AllNotes } from "./allNotes"
import { Notesdetail } from "./notesdetail"
import { Serach } from "./search"

export const AllRoutes=()=>{

    return(
        <>
    
         <Navbar/>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/allnotes" element={<AllNotes/>}/>
            <Route path="/search" element={<Serach/>}/>
              <Route path="/allnotes/:id" element={<Notesdetail/>}></Route>  

        </Routes>
        </>
    )
}