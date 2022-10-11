import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import { useMemo } from "react";
import { useContext } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Layout } from "../../components/layouts";
import { status as STATUS } from "../../context/constants";
import { EntriesContext } from "../../context/entries/EntriesContext";
import { dbEntries } from "../../database";
import { dateFunctions } from "../../utils";

const validStatus = Object.values(STATUS);

const EntryPage = ({ _id, description, status, createdAt }) => {

    const [inputValue, setInputValue] = useState(description);
    const [statusState, setStatus] = useState(status);
    const [touched, setTouched] = useState(false);

    const onTextFieldChanged = (e) => {
        setInputValue(e.target.value);
    }

    const onStatusChanged = (e) => {
        setStatus(e.target.value);
    }

    const { updateEntry } = useContext(EntriesContext);

    const onSave = () => {

        if(inputValue.trim().length === 0 ) return;
        updateEntry({
            _id,
            description: inputValue,
            status: statusState
        });
        toast('🦄 Entrada guardada!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [touched, inputValue])

    return (
        <Layout title={`${inputValue.substring(0, 15)}...`}>
            {/* Toastify */}
            <ToastContainer />
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={'Entrada'}
                            subheader={`Created ${dateFunctions.getDistanceToNow(createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={inputValue}
                                onChange={onTextFieldChanged}
                                helperText={isNotValid && 'Ingrese un valor'}
                                onBlur={() => setTouched(true)}
                                error={isNotValid}
                            />
                            {/* radio */}
                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup
                                    row
                                    value={statusState}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map((stat) => (
                                            <FormControlLabel
                                                key={stat}
                                                value={stat}
                                                control={<Radio />}
                                                label={stat[0].toUpperCase() + stat.slice(1)}
                                            // label={capitalize(stat)} -> funcion para poner la primera mayuscula
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                            <CardActions>
                                <Button
                                    startIcon={<SaveOutlined />}
                                    fullWidth
                                    variant="contained"
                                    onClick={onSave}
                                    disabled={inputValue.length <= 0}
                                >
                                    Save
                                </Button>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>

            <IconButton sx={{
                position: 'fixed',
                right: 30,
                bottom: 30,
                backgroundColor: "error.dark"
            }}>
                <DeleteOutline />
            </IconButton>
        </Layout>
    )
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ params }) => {
    // const { data } = await  // your fetch function here 

    const { id } = params;
    const entry = await dbEntries.getEntryById(id);

    // ? si la entrada no existe, redirecciona a la pagina principal. Nunca va a renderizar la pagina si la entrada es null
    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            ...entry
        }
    }
}

export default EntryPage
