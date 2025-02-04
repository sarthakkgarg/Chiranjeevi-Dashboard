import React, { useEffect } from 'react'
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FirebaseFunction from '../utils/firebaseFunctions';
import moment from 'moment';
import Toast from '../Common/snackbar'
import { Button } from '@material-ui/core';
import firebase from '../utils/firebase';

const useStyles = makeStyles(() => ({
    inputReceipt: {
        width: "100%"
    },
    button: {
        background: "#238887",
        margin: "10px",
        color: "white",
        '&:hover': {
            backgroundColor: '#0C6361',
            boxShadow: 'none',
        },
    },
    fileInput: {
        margin: "10px"
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

const TelePhone = styled.img`
    width:18px;
    height:18px;
`
const Paper = styled.div`
    padding:10px;
    display: flex;
    height: 5in;
    width: 8.3in;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`
const Section = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    /* margin-top: ; */
`
const LogoAndHeading = styled.div`
    display: flex;
    width: 100%;
`

const LogoHolder = styled.div`
    width: 20%;
    display: flex;
    justify-content: center;
    margin: 15px 0px 10px 0px;
`
const TextHolder = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`
const HeaderInput = styled.div`
    width: 100%;
    display: flex;
    padding: 5px 20px 0px 20px;
    font-size:18px;
    margin-top: 12px;
    align-items: flex-end;
    height:35px;
`
const Logo = styled.img`
    width: 70px;
    height: 80px;
    `
const Form = styled.div`
    width: 100%;
    justify-content: center;
    flex-direction: column;
    border: 2px solid #000000;
    margin-top: 2px;
`

const HorizontalLine = styled.div`
    width: 100%;
    height: 2px;
    background-color: black;
    margin-top: 10px;
`
const Value = styled.div`
    margin-left: 25px;
    margin-right: 35px;
    font-weight: 500;
    width:auto;
    display:flex;
    flex-grow: 1;
`
const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width:100vw;
    padding: 30px;
    justify-content: center;
`



function IPDReciept() {
    const classes = useStyles();
    useEffect(() => {
        if (receipt.date === "") {
            let date = Date.now();
            setReceipt({
                ...receipt,
                date: moment(date).format("YYYY-MM-DDThh:mm")
            })
        }
    })

    const [fileNo, setFileNo] = React.useState();
    const [patient, setPatient] = React.useState("");
    const [selectedId, setSelectedId] = React.useState();
    const fetchData = () => {
        const res = FirebaseFunction.getOneData("Patients", "fileNo", fileNo);
        console.log(res)
        if (res.selectedId === "") Toast.apiFailureToast("Does not exist")
        else {
            setPatient(res.data)
            setSelectedId(res.selectedId)
        }
    }

    const [receipt, setReceipt] = React.useState({
        serialNo: "", name: "", amountInWords: "", otherAmount: "", chequeNo: "", chequeDate: "", amount: "", date: ""
    })
    const handleInputData = (e) => {
        setReceipt({ ...receipt, [e.target.name]: e.target.value });
        if (e.target.name === "amount" && !isNaN(e.target.value)) {
            let response = FirebaseFunction.toTitleCase(FirebaseFunction.inWords(e.target.value));
            setReceipt({ ...receipt, amountInWords: response });
        }
    }

    const SaveReceipt = () => {
        let patientData = {
            ...patient,receipt:receipt
        }
        console.log(patientData,selectedId[0])
        const userRef = firebase.database().ref("Patients").child(selectedId[0]);
        userRef.update(patientData).then(() => {
            Toast.apiSuccessToast("Patient details updated")
        }).catch(() => {
            Toast.apiFailureToast("Server Error")
        })
    }

    return (
        <>
            <Container>
                <ButtonContainer>
                    <TextField onChange={(e) => setFileNo(e.target.value)} value={fileNo} className={classes.fileInput} type="number" />
                    <Button onClick={fetchData} className={classes.button}> Fetch </Button>
                </ButtonContainer>
                <Paper>
                    <Form>
                        <Section >
                            <LogoAndHeading>
                                <LogoHolder>
                                    <Logo src="/Images/Discharge.png" />
                                </LogoHolder>
                                <TextHolder>
                                    <Typography variant="h3">
                                        <b>CHIRANJEEVI HOSPITAL</b>
                                    </Typography>
                                    <Typography variant="h6">
                                        <b>Virat Sagar Parisar,Oppo. SATI College, NH-86,Vidisha (M.P.)</b><br />
                                        <b><TelePhone src="/Images/telephone.png" /> : 250544, 251280</b>
                                    </Typography>
                                </TextHolder>
                            </LogoAndHeading>
                        </Section>
                        <HorizontalLine />
                        <HeaderInput style={{ justifyContent: "space-between" }}>
                            <TextField onChange={handleInputData} name="serialNo" type="text" size="small" label="No." variant="outlined" InputLabelProps={{ shrink: true }} disabled />
                            <TextField onChange={handleInputData} style={{ marginRight: "4%" }} name="date" type="datetime-local" InputLabelProps={{ shrink: true }} size="small" label="Date" value={receipt.date} variant="outlined" />
                        </HeaderInput>
                        <HeaderInput>
                            <div>Received with thanks from {patient.sex === "M" ? "Mr" : "Mrs"} </div>
                            <Value>
                                <TextField className={classes.inputReceipt} name="name" type="text" size="small" label="Name" value={patient.name} InputLabelProps={{ shrink: true }} disabled />
                            </Value>
                        </HeaderInput>
                        <HeaderInput>
                            <div>The sum of Rupees </div>
                            <Value>
                                <TextField className={classes.inputReceipt} name="amountInWords" type="text" size="small" label="Amount In Words" value={receipt.amountInWords} InputLabelProps={{ shrink: receipt.amountInWords === "" ? false : true }} disabled />
                            </Value>
                        </HeaderInput>
                        <HeaderInput style={{ fontSize: "15px" }}>

                            <div>For Hospitalization / Pathalogical Investigation / OPD / X-Ray / ECG Other </div>
                            <Value>
                                <TextField onChange={handleInputData} className={classes.inputReceipt} name="other" type="text" size="small" label="Amount" />
                            </Value>
                        </HeaderInput>
                        <HeaderInput>
                            <div>Cheque No.</div>
                            <Value>
                                <TextField onChange={handleInputData} className={classes.inputReceipt} name="chequeNo" type="text" size="small" label="Check No." />
                            </Value>

                            <div>Dated</div>
                            <Value>
                                <TextField onChange={handleInputData} className={classes.inputReceipt} name="chequeDate" type="datetime-local" size="small" label="Date" value={receipt.chequeDate} />
                            </Value>
                        </HeaderInput>
                        <HeaderInput>
                            <div><b>Amount</b></div>
                            <Value style={{ flexGrow: "0" }}>
                                <TextField onChange={handleInputData} className={classes.inputReceipt} name="amount" type="number" size="small" label="Amount" />
                            </Value>
                        </HeaderInput>

                    </Form>
                </Paper>
                <ButtonContainer>
                    <Button onClick={SaveReceipt} className={classes.button}> Save </Button>
                </ButtonContainer>
            </Container>

        </>
    )
}
export default IPDReciept;
