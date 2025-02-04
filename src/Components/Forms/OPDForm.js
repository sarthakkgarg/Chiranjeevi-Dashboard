import React from 'react'
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase'
import 'date-fns';
import moment from 'moment';
import { useEffect } from 'react'


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    input: {
        marginLeft: 40,
        marginTop: 10,
    },
    buttonSubmit: {
        marginLeft: 40,
        background: "#0C6361",
        '&:hover': {
            backgroundColor: '#0C6361',
            boxShadow: 'none',
        },
    },
    fabIcon: {
        position: 'absolute',
        top: "5%",
        right: "2%"

    },
    MainButton: {
        width: 240,
        height: 80,
        margin: "30px 0px 10px 0px",
        background: "#0C6361",
        fontFamily: "'Source Sans Pro', sans-serif",
        fontWeight: "bolder",
        fontSize: "19px",
        color: "white",
        '&:hover': {
            backgroundColor: '#238887',
        },
    }
}));


const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    padding:10px 10px 10px 10px;
    display: flex;
    flex-direction: column;
`
const OneField = styled.div`
    padding:10px;
    display: flex;
    flex-wrap: wrap;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100vw;
    justify-content: space-evenly;
`

const Form = styled.div`
    width: 90%;
    position: relative;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
    padding: 0 8% 0 0;
    margin-top: 10px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

export default function NewPatient(props) {
    const [date, setDate] = React.useState("")
    useEffect(() => {
        if (date === "") {
            let date = Date.now();
            setDate(moment(date).format("YYYY-MM-DDThh:mm"))
        }
    })
  
    const classes = useStyles();
    const [patient, setPatient] = React.useState()
    const handleinput = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value })
        console.log(patient)
    }


    const saveData = () => {
        const patientRef = firebase.database().ref("PatientsOPD");
        const patientData = {
            name: patient.name,
            age:patient.age,
            doctor: patient.doctor,
            amount: patient.amount,
            date:date
        };
        console.log(patientData)
        patientRef.push(patientData);
    }


    return (
        <>
            <ButtonContainer>
                    <Button className={classes.MainButton} variant="contained">
                        New Receipt
                    </Button>
                    <Button className={classes.MainButton} variant="contained">
                        View Receipt
                    </Button>
                    <Button className={classes.MainButton} variant="contained" >
                        Modify Receipt
                    </Button>
                    <Button className={classes.MainButton} variant="contained" >
                        Add Items
                    </Button>
                    <Button className={classes.MainButton} variant="contained" >
                        Add Doctor
                    </Button>
            </ButtonContainer>
            <Container>

                <Form>
                    <OneField>
                        <TextField onChange={handleinput} className={classes.input}  name="name" size="small" label="Patient Name" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input}  name="age" size="small" label="Age" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input}  name="doctor" size="small" label="Consulting Doctor" variant="outlined" />
                        <TextField onChange={handleinput} className={classes.input}  name="amount" size="small" label="Amount" type="number" variant="outlined" />
                    </OneField>
                    <OneField>
                    <TextField
                            id="datetime-local"
                            label="Date of admit"
                            type="datetime-local"
                            value={date}
                            className={classes.input}
                            onChange={handleinput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        
                    </OneField>
                    <OneField>
                        <Button onClick={saveData} className={classes.buttonSubmit} variant="contained" color="primary">Submit</Button>
                    </OneField>
                </Form>
            </Container>
        </>
    )
}
