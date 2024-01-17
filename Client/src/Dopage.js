
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import { TiTick } from "react-icons/ti";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTable,
    MDBTableBody,
    MDBTableHead,
} from "mdb-react-ui-kit";
import './Dopage.css'

function Dopage() {

    let counter = 1;
    const [dothis, setTodo] = useState('')
    const [status, setStatus] = useState('')
    const [data, setData] = useState([])
    const [date, setDate] = useState('')
    const [refresh, setFresh] = useState(0)

    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const addC = (e) => {
        e.preventDefault()

        let dodata = {
            dothis: dothis,
            date: date

        }

        fetch('http://localhost:4001/todo', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dodata)
        }).then((res) => res.json()).then((out) => {
            console.log(out)
            window.location.reload(false);
        })

    }

    useEffect(() => {
        fetch('http://localhost:4001/todoview').then((res) =>
            res.json()).then((result) => setData(result))
    }, [refresh])


    const dodelete = (iD) => {

        let param = {
            id: iD
        }

        fetch('http://localhost:4001/todoelete', {
            method: 'post',
            headers: {
                "Content-Type": 'application/json',
                Accept: 'application/jon'
            },
            body: JSON.stringify(param)
        }).then((res) =>
            res.json()).then((deleted) => {
                console.log(deleted)
               setFresh(prev=>prev+1)
            })


    }


    const handleStatus = (id) => {
        let params = {
            id: id,
            status: status
        }
        fetch('http://localhost:4001/updateStatus', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        }).then((res) => res.json()).then((result) => {
            console.log(result);
            setFresh(prev=>prev+1)
        })
        setIsButtonClicked(true)
    }




    return (
        < section className="vh-100">

            <div class="bgbg">
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="d-flex justify-content-center align-items-center">
                        <MDBCol lg="9" xl="10">
                            <MDBCard className="rounded-3" style={{ backgroundColor: "#99a4bf" }}>
                                <MDBCardBody className="p-4">
                                    <h4 className="text-center my-3 pb-3">To Do App</h4>
                                    <form method='post' onSubmit={addC}>
                                        <MDBRow className="row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                                            <MDBCol size="6">
                                                <MDBInput
                                                    label="Enter a task here"
                                                    id="form1"
                                                    type="text"
                                                    name="dothis"
                                                    onChange={(e) => setTodo(e.target.value)}
                                                />
                                            </MDBCol>
                                            <MDBCol size="4">
                                                <MDBInput
                                                    label="Enter date here"
                                                    id="form1"
                                                    type="date"
                                                    name="date"
                                                    onChange={(e) => setDate(e.target.value)}
                                                />

                                            </MDBCol>
                                            <MDBCol size="2" style={{ zIndex: "3", marginBottom: "31px" }}>
                                                <MDBBtn type="submit">ADD TASK</MDBBtn>
                                            </MDBCol>
                                        </MDBRow>

                                    </form>
                                    <MDBTable className="mb-4">
                                        <MDBTableHead>
                                            <tr>
                                                <th scope="col" style={{ textAlign: 'left' }}>No.</th>
                                                <th scope="col" style={{ textAlign: 'left' }}>Todo item</th>
                                                <th scope="col" style={{ textAlign: 'left' }}>Due Dates</th>

                                                <th scope="col" style={{ textAlign: 'left' }}>Status</th>
                                                <th scope="col" style={{ textAlign: 'center' }}>Actions</th>
                                            </tr>
                                        </MDBTableHead>
                                        <MDBTableBody>
                                            {data.map((items) => (
                                                <tr>
                                                    <td>{counter++}</td>
                                                    <td style={{ textAlign: 'left', width: '300px' }}>{items.dothis}</td>
                                                    <td style={{ textAlign: 'left', width: '300px' }}>{items.date}</td>
                                                    <td>
                                                        <p>
                                                            {items.status === 1 ? 'COMPLETED' : 'NOT COMPLETED'}
                                                        </p>


                                                    </td>
                                                    <td className="text-center">
                                                        <Link to='/Doupdate' state={{ id: items._id }}> <button type="button" class="btn btn-dark">Update</button></Link>
                                                        <button type="submit" class="btn btn-dark" onClick={() => dodelete(items._id)}>Delete</button>
                                                        {items.status === 0 && (
                                                            <button className='btn btn-success' onClick={() => handleStatus(items._id)}>
                                                                <TiTick />
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </MDBTableBody>
                                    </MDBTable>

                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        </section>
    );
}


export default Dopage