import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { useQueryClient, useMutation } from "react-query"



function EditUserMod(props) {
    const [mode, setMode] = useState(false)
    const uqclient = useQueryClient();
    const mutution = useMutation(async (edituser) => {
        console.log("edituser", edituser)
        const result = await fetch(`http://localhost:3001/users/${props.id}`, {
            method: 'put',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"

            },
            body: JSON.stringify(edituser)

        })

    }, {
        onSuccess: () => {
            return uqclient.invalidateQueries("users")
        }
    });

    const arr = uqclient.getQueryData('users')
    console.log("uqclient data", arr)

    const currentdata = arr.find((val) => {
        return val.id === props.id
    })
    console.log("currentdata", currentdata)


    const toggle = () => {
        setMode(!mode)

    }
    const handleSubmmition = (event) => {
        event.preventDefault()
        console.log("function is called")
        console.log("function is called", event.target.elements)
        const { name, email, age } = event.target.elements

        //   console.log("name",name.value)
        //   console.log("email",email.value)
        //   console.log("age",age.value)

        const payload = {
            name: name.value,
            email: email.value,
            age: age.value

        }
        console.log("payload", payload)
        mutution.mutate(payload)
        toggle()


    }

    return (
        <>
            {/* {props.buttonLabel} */}
            <Button color="success" onClick={toggle}>{props.buttonLabel}</Button>
            <Modal isOpen={mode} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit User</ModalHeader>
                <ModalBody>

                    <Form onSubmit={handleSubmmition}>
                        <FormGroup>
                            <Label for="userName">Name</Label>
                            <Input type="text" name="name" defaultValue={currentdata.name} id="userName" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userEmail">Email</Label>
                            <Input type="text" name="email" defaultValue={currentdata.email} id="userEmail" />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userAge">Age</Label>
                            <Input type="text" name="age" defaultValue={currentdata.age} id="userAge" />
                        </FormGroup>

                        <ModalFooter>

                            <Button color="primary" type='submit'>{props.buttonLabel}</Button>
                            <Button color="secondary" onClick={toggle}>Close</Button>



                        </ModalFooter>

                    </Form>
                </ModalBody>

            </Modal>
        </>
    )
}

export default EditUserMod
