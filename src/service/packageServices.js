import axios from 'axios';
import { API_URL } from '../App';
import Swal from 'sweetalert2';

export const searchValue = (pack, searchVal = '') => (
    (pack.name && pack.name.search(searchVal) != -1) ||
    (pack.trackingNumber && pack.trackingNumber.search(searchVal) != -1)
)

export const searchStatus = (pack, status ) => (
    (pack.collected && pack.collected===status)
)

export const getPackages = (search, navigate) => {
    return dispatch => {
        axios.get(`${API_URL}`)
            .then((res) => {
                dispatch({ type: "SET_PACKAGES", data: res.data })
            })
            .catch(() => {
                Swal.fire({
                    title: 'ERROR...',
                    icon: 'error'
                })
                // navigate('/home')
            })
    }
}

export const addPackage = (data, navigate) => {
    return dispatch => {
        dispatch({ type: "ADD_PACKAGES", data: data })
        Swal.fire({
            title: 'Adding complete successfull',
            icon: 'success'
        })
        navigate('/package')
    }
}

export const editPackage = (data, navigate) => {
    return dispatch => {
        dispatch({ type: "EDIT_PACKAGES", data: data })
    }
}

export const deletePackage = (data, navigate) => {
    return dispatch => {
        dispatch({ type: "DELETE_PACKAGES", data: data })
        Swal.fire({
            title: "Deleted!",
            text: `This pack ${data.name} has been deleted.`,
            icon: "success"
        })
    }
}