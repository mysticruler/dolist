import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Dopage.css';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow
} from "mdb-react-ui-kit";
import './Dopage.css'


function Doupdate() {

    const location = useLocation()
    console.log(location);

    const [dothis, setDothis] = useState('')
    const[date,setDate]=useState('')
    
    

    const navi = useNavigate()




    useEffect(() => {
        let params = {
            id: location.state.id
        }
        fetch('http://localhost:4001/todoedit', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);

            setDothis(result.dothis)
            setDate(result.date)


        })
    }, [])



    const updateClick = (e) => {
        e.preventDefault()
        navi('/')
        let params = {

            id:location.state.id,
            dothis: dothis,
            date: date

            
        }

        fetch('http://localhost:4001/todovalue', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            
        })
    }




    return (
        <>



            {/* <form class='Main' onSubmit={updateClick} method='post' >
                <h1>Update Field</h1>
                <div class="form-group mb-2">
                    <input type="text" name="dothis" value={dothis} onChange={(e) => setDothis(e.target.value)}/>
                    <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>

                    <button type="submit" onSubmit={updateClick}>Update Done</button>

                </div>
            </form> */}

            < section className="vh-100">

            <div class="bgbg">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol lg="9" xl="10">
                            <MDBCard className="rounded-3" style={{ backgroundColor: "#99a4bf" }}>
                                <MDBCardBody className="p-4">
                                    <h4 className="text-center my-3 pb-3">To Do App</h4>
                                    <form onSubmit={updateClick} method='post'>
                                        <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                            <MDBCol size="6">
                                                <MDBInput
                                                    label="Enter a task here"
                                                    id="form1"
                                                    type="text"
                                                    name="dothis" value={dothis} onChange={(e) => setDothis(e.target.value)}
                                                />
                                            </MDBCol>
                                            <MDBCol size="4">
                                                <MDBInput
                                                    label="Enter date here"
                                                    id="form1"
                                                    type="date"
                                                    name="date" value={date} onChange={(e) => setDate(e.target.value)}
                                                />

                                            </MDBCol>
                                            <MDBCol size="2" style={{ zIndex: "3", marginBottom: "31px" }}>
                                                <MDBBtn type="submit" onSubmit={updateClick}>UPDATE</MDBBtn>
                                            </MDBCol>
                                        </MDBRow>

                                    </form>
                                    

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </section>
            
















        </>
    )
}

export default Doupdate;
