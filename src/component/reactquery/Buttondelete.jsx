import React from 'react'
import { Button } from 'reactstrap'
import { useQueryClient, useMutation } from "react-query"

function Buttondelete(props) {

    const uqclient = useQueryClient();
    const data = uqclient.getQueryData("users")
    console.log("data of array", data)

    const mutation = useMutation(async (id) => {
        await fetch(`http://localhost:3001/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        }
        )
    },
        {
            onSuccess: () => { uqclient.invalidateQueries("users") }
        }

    )

    const deleteFun = async () => {
        console.log('user deleted')
        mutation.mutate(props.id)


    }
    return (
        <>
            <Button color="warning" onClick={deleteFun}>{props.buttonLabel}</Button>
        </>
    )
}

export default Buttondelete
