import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { useQueryClient, useMutation } from "react-query"

function NewUser(props) {
    const [mode, setMode] = useState(false)
    const uqclient = useQueryClient();

    const mutution = useMutation(async (newUser) => {
        fetch(`http://localhost:3001/users`, {
            method: 'post',
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newUser)

        })
    },
        {
            onSuccess: uqclient.invalidateQueries("users")
        }
    )

    const arr = uqclient.getQueryData('users')
    console.log("uqclient data", arr)


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
        console.log("newpayload", payload)
        mutution.mutate(payload)
        toggle()
        // alert("sussesfully added")


    }
    return (
        <>

            <div>
                <Button color="danger" onClick={toggle}>{props.buttonLabel}</Button>
                <Modal isOpen={mode} toggle={toggle}>
                    <center> <ModalHeader toggle={toggle}>New User</ModalHeader> </center>
                    <ModalBody>
                        <Form onSubmit={handleSubmmition}>
                            <FormGroup>
                                <Label for="userName">Name</Label>
                                <Input type="text" name="name" placeholder="name" id="userName" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userEmail">Email</Label>
                                <Input type="text" name="email" placeholder="email" id="userEmail" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="userAge">Age</Label>
                                <Input type="text" name="age" placeholder="age" id="userAge" />
                            </FormGroup>

                            <ModalFooter>

                                <Button color="primary" type='submit'>{props.buttonLabel}</Button>
                                <Button color="secondary" onClick={toggle}>Close</Button>

                            </ModalFooter>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>

        </>
    )
}

export default NewUser
