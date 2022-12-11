import {useContext, useEffect, useState, useRef} from "react";
import { Navigate } from 'react-router-dom';
import SubplansList from "./SubplansList";
import UserErrorModal from "./ErrorModals";
import APIContext from "../Contexts/APIContext";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {MuiNavbar} from "../../Navbar"

const Subplans = () => {
    const [redirectCard, setRedirectCard] = useState(false);

    //updates user plan if subscribe button clicked
    const { updatePlan, setUpdatePlan, change, setChange } = useContext(APIContext);

    //dialogue pop-ups
    const { setShowPlanModal, card } = useContext(APIContext);

    // page details
    const perPage = 9;
    const [params, setParams] = useState({page: 1})
    const [total, setTotal] = useState(0)

    const { setSubplans } = useContext(APIContext);

    useEffect(() => {
        const { page } = params;
        fetch(`http://localhost:8000/subscriptions/?limit=${perPage}&offset=${perPage*(page - 1)}`)
        .then(res => res.json())
        .then(json => {
            setSubplans(json.results);
            setTotal(json.count)
        }).catch(error => {console.log("ERROR FROM THE BACKEND", error)});
    }, [params])

    //updates user plan
    const isMountRef = useRef(true);
    useEffect(() => {
        //token
        var token = localStorage.getItem("token")
        //if no token, they are not logged-in
        if (!token){
            setShowPlanModal({show: true, error: "not logged-in"})
            return
        }
        token = "Bearer " + token

        // checks if mounted
        if (isMountRef.current || !updatePlan.id) { 
            isMountRef.current = false;
            return;
        }
    
        const redirect = fetch(`http://localhost:8000/subscriptions/my_plan/update/`,
        {
            method: 'GET',
            headers: {
                'Authorization': token,
            }
        })
        .then(res => res.json())
        .then(json => {
            var method = null;
            if (json.redirect === "add"){
                method = "POST"
            }else{
                method = "PUT"
            }
            if (json.detail){
                setShowPlanModal({show: true, error: json.detail})
                return
            }
            return fetch(`http://localhost:8000/subscriptions/my_plan/${json.redirect}/`,
            {
                method: method,
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'sub_plan': updatePlan.id})
            })
        }).catch(error => {
            console.log("Redirect fetch error", error)
        });

        redirect
        .then(res => res.json())
        .then(json => {
            if (json.detail){
                setShowPlanModal({show: true, error: json.detail})
            }else{
                alert("Your plan has been updated succesfully")
                setChange(!change)
                setRedirectCard(true)
            }
            setUpdatePlan({id:null})
        })
        .catch(error => {console.log("Could not update", error)})
    }, [updatePlan, card])

    var prevDisable = params.page === 1 ? true : false
    var nextDisable = params.page === Math.ceil(total / perPage) ? true : false

    if(redirectCard){
        return <Navigate to='/subscriptions/my_plan' />
    }
    return (
        <>
            <UserErrorModal/>
            <SubplansList/>
            <Stack
              m={5}
              direction="row"
              spacing={'2em'}
              justifyContent="center"
            >
                <Button variant="contained" size='large' m={5} disabled={prevDisable} onClick={() => setParams({
                    ...params,
                    page: Math.max(1, params.page - 1)
                })}>
                    prev
                </Button>
                <Button variant="contained" size='large' m={5} disabled={nextDisable} onClick={() => setParams({
                    ...params,
                    page: Math.min(params.page + 1, Math.ceil(total / perPage))
                })}>
                    next
                </Button>
            </Stack>
            
        </>
    )
}

export default Subplans;