import React from 'react'
import { Table } from "reactstrap"
import { useQuery } from "react-query"
import NewUser from './reactquery/NewUser'
import EditUserMod from './reactquery/EditUserMod'
import Buttondelete from './reactquery/Buttondelete'

function UserList() {

  const callApi = async () => {
    const result = await fetch('http://localhost:3001/users')
     return result.json()
    // console.log("result", res)
    // setData(res)
    // console.log("datastate", data)
  }

  const {data,isLoading}=useQuery("users",callApi)

  if(isLoading){

     return <h1>loading...........</h1>
  }


  return (
    <>
      <div className="container">
        <h1>Display data using React Query</h1>
        <div className='my-4'>{<NewUser buttonLabel="NewUser"/>}</div>
        <Table bordered hover  striped >
          <thead className='bg-info text-dark'>
            <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Update</th>
            <th>Delete</th>
            </tr>
          </thead>
          <tbody>


            {/* data.length>0 && data.map */}
            {data?.length > 0 && data.map((val, ind) =>
              <tr key={ind}>
                <td>{val.name}</td>
                <td>{val.email}</td>
                <td>{val.age}</td>
                <td><EditUserMod buttonLabel="EditRecord" id={val.id}/></td>
                <td><Buttondelete buttonLabel="Delete" id={val.id} /></td>
              </tr>
            )
            }

          </tbody>
        </Table>


      </div>
    </>
  )
}

export default UserList
