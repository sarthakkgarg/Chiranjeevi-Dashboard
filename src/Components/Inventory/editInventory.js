import React, { useEffect } from 'react'
import styled from 'styled-components'
import firebase from '../utils/firebase'
import { makeStyles } from '@material-ui/core/styles';
import TableComponent from "../Common/tableComponent";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import EditDialog from './editDialog'
import DeleteDialog from './deleteDialog'

const useStyles = makeStyles((theme) => ({
    buttonSubmit: {
        width: 120,
        height: 40,
        marginLeft: 20,
        background: "#0C6361",
        '&:hover': {
            backgroundColor: '#238887',
            boxShadow: 'none',
        },
    }
}
));


const Container = styled.div`
    justify-content: center;
    align-items: center;
    width: 100%;
    display: flex;
    flex-direction: column;
`

const TableContainer = styled.div`
    padding-left: 40px;
`
const Form = styled.div`
    width: 90%;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    border-radius: 5px;
    /* padding: 0 8% 0 8%; */
    margin-top: 10px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -ms-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -o-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`

export default function EditInventory() {
    const classes = useStyles();
    const [ inventorys, setInventorys] = React.useState([]);
    useEffect(() => {
        const  inventoryRef = firebase.database().ref('Inventory');
         inventoryRef.on('value', (snap) => {
            const  inventoryData = snap.val();
            const  inventoryList = [];
            for (let id in  inventoryData) {
                 inventoryList.push({ id, ... inventoryData[id] })
            }
            setInventorys( inventoryList)
            console.log( inventoryList)
        });

    }, []);

    // setDialog Open/Close
    const [openDialog, setOpenDialog] = React.useState(false);
    const handleDialogOpen = ( inventory) => {
        setSelectedInventory( inventory)
        setOpenDialog(true);
    };
    const handleDialogClose = () => {
        setOpenDialog(false);
    };
    const [deleteDialog, setDeleteDialog] = React.useState(false);
    const handleDeleteOpen = ( inventory) => {
        setSelectedInventory( inventory)
        setDeleteDialog(true);
    };
    const handleDeleteClose = () => {
        setDeleteDialog(false);
    };

    // Delete Logic Starts Here
    const [selectedInventory , setSelectedInventory] = React.useState("");
    const editInventoryInput = (e) => {
        setSelectedInventory({ ...selectedInventory, [e.target.name]: e.target.value })
        console.log(selectedInventory)
    }

    return (
        <>
        <Container>
            <TableContainer>
                <TableComponent.Table cellpadding="0" cellspacing="0">
                    <TableComponent.TableHead style={{ background: "#0C6361" }}>
                        <TableComponent.HeadColumn>Name</TableComponent.HeadColumn>
                        <TableComponent.HeadColumn>Amount</TableComponent.HeadColumn>
                        <TableComponent.HeadColumn>Options</TableComponent.HeadColumn>
                    </TableComponent.TableHead>
                    <TableComponent.TableBody>
                        { inventorys.map(( inventory) => (
                            <TableComponent.BodyRow>
                                <TableComponent.BodyColumn >{ inventory.name}</TableComponent.BodyColumn>
                                <TableComponent.BodyColumn >{ inventory.amount}</TableComponent.BodyColumn>
                                <TableComponent.BodyColumn >
                                    <Button onClick={() => handleDialogOpen( inventory)} className={classes.buttonSubmit} variant="contained" color="primary">
                                            <DeleteIcon/>
                                        Edit</Button>
                                    <Button onClick={() => handleDeleteOpen( inventory)} className={classes.buttonSubmit} variant="contained" color="primary">
                                            <EditIcon/>
                                        Delete</Button>
                                </TableComponent.BodyColumn>
                            </TableComponent.BodyRow>
                        ))}
                    </TableComponent.TableBody>
                </TableComponent.Table>
            </TableContainer>
        </Container>

        {/* Dialog Boxes Render */}
            <EditDialog handleClose={handleDialogClose} handleInput={editInventoryInput} open={openDialog}  inventory={selectedInventory}/>
            <DeleteDialog handleClose={handleDeleteClose} open={deleteDialog}  inventory={selectedInventory}/>
        </>
    )
}
