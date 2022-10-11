import { DeleteOutline, SaveOutlined } from "@mui/icons-material";
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import { isValidObjectId } from "mongoose";
import { useMemo } from "react";
import { useState } from "react";
import { Layout } from "../../components/layouts";
import { status as STATUS } from "../../context/constants";

const validStatus = Object.values(STATUS);

const EntryPage = (props) => {

    console.log({props})

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState(STATUS.pending);
    const [touched, setTouched] = useState(false);
    
    const onTextFieldChanged = (e) => {
      setInputValue(e.target.value);
    }

    const onStatusChanged =(e) => {
        setStatus(e.target.value);
    }

    const onSave = () => {
      console.log({inputValue, status})
    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [touched, inputValue])

    return (
        <Layout title="Entry Page">
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${inputValue}`}
                            subheader={`Creada hace: ... minutos`}
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
                                helperText={ isNotValid && 'Ingrese un valor'}
                                onBlur={ () => setTouched(true) }
                                error={isNotValid}
                            />
                            {/* radio */}
                            <FormControl>
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
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
                <DeleteOutline/>
            </IconButton>
        </Layout>
    )
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async ({ params }) => {
    // const { data } = await  // your fetch function here 

    const { id } = params;
    if(!isValidObjectId(id)){
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            id,
            name: 'Ignacio'
        }
    }
}

export default EntryPage
