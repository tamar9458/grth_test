import { useDispatch, } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { TextField, FormControlLabel, FormGroup,Checkbox } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';//איש
import KeyIcon from '@mui/icons-material/Key';//מנעול
import DeleteIcon from '@mui/icons-material/Delete';
import {addPackage} from '../service/packageServices'

const schema = yup.object({
    name: yup.string().required('must be fill name of package'),
    trackingNumber: yup.string().required('must be fill number tracking'),
    collected: yup.boolean().default(false),
    lat: yup.number().required('must be fill').default(0.0).min(0),
    lng: yup.number().required('must be fill').default(0.0).min(0),
})

const AddPackage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { register, control, handleSubmit, getValues, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = () => {
        const data = getValues()
        dispatch(addPackage(data, navigate))
    }

    return <>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField style={{ width: '80%' }} label="Name"
                margin="dense" {...register("name")}
                InputProps={{ startAdornment: (<InputAdornment position="start"><AccountCircle /></InputAdornment>), }}
                error={!!errors.name} helperText={errors.name?.message} />
            <br />
            <TextField style={{ width: '80%' }} label="Tracking number"
                margin="dense"{...register("trackingNumber")}
                InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                error={!!errors.trackingNumber} helperText={errors.trackingNumber?.message} />
            <br />
            <TextField style={{ width: '80%' }} label="LAT"
                margin="dense"{...register("lat")}
                InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                error={!!errors.lat} helperText={errors.lat?.message} />
            <br />
            <TextField style={{ width: '80%' }} label="LNG"
                margin="dense"{...register("lng")}
                InputProps={{ startAdornment: (<InputAdornment position="start"></InputAdornment>), }}
                error={!!errors.lng} helperText={errors.lng?.message} />
            <br />
            <FormGroup>
                <FormControlLabel style={{ width: '80%' }} margin="dense"
                    {...register("collect")} control={<Checkbox />} label="Yes/No" />
            </FormGroup>

            <button variant="contained" color="primary"
                type="submit"
            >Submit</button>
        </form>
    </>
}

export default AddPackage;