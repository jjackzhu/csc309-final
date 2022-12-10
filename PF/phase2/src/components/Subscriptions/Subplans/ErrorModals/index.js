import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useContext, useState} from "react";
import { Navigate } from 'react-router-dom';
import APIContext from "../../Contexts/APIContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const data = [
    {
      title: "Card is expired",
      info: "Edit card info?",
      button: "Edit",
      redirect: '/subscriptions/my_card'
    },
    {
        title: "No card added",
        info: "Add card info?",
        button: "Add",
        redirect: '/subscriptions/my_card'
    },
    {
      title: "Not logged-in",
      info: "Would you like to login?",
      button: "Login",
      redirect: '/'
    }
  ];

function UserErrorModal() {
    const { showPlanModal, setShowPlanModal } = useContext(APIContext);
    const [redirect, setRedirect] = useState(false);

    const handleClose = () => setShowPlanModal({show: false});

    var index = null;
    if (showPlanModal.error === "user's card is expired"){
        index = 0
    } else if (showPlanModal.error === "user has not inputted a valid card for payment"){
        index = 1
    } else{
        index = 2
    }

    if(redirect){
      return <Navigate to={data[index].redirect} />
    }
    return (
      <>
        <Modal
          open={showPlanModal.show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data[index].title}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {data[index].info}
            </Typography>
            <br/>
            <Button variant="contained" size='large' m={5} onClick={() => {
                setRedirect(true)
            }}>
              {data[index].button}
            </Button>
          </Box>
        </Modal>
      </>
    );
  }

export default UserErrorModal