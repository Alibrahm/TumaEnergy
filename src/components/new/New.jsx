import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";
import { Button, Modal, Backdrop, Fade } from "@mui/material";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Typography from "@mui/material/Typography";

const New = ({ inputs, title }) => {
  // const [file, setFile] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const token = localStorage.getItem("token");


  const styleConfirm = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-40%, -20%)",
    width: 500,
    height: 250,
    bgcolor: "#ffff",
    outline: "none",
    border: "none",
    // boxShadow: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://skiza-app-dy3qp.ondigitalocean.app/api/v1/skiza/add",
        {
          method: "POST",
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: code,
            name: name,
            description: description,
          }),
        }
      );
      const result = await response.text();
      setOpen(true);
      setModalText(result.name);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCodeChange = (event) => {
    setCode(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <div className="new">
      {/* <Sidebar /> */}
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top" style={{ display: 'flex', justifyContent: 'center' }}>
          <h1>Upload Music/Tunes</h1>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="bottom">
            <div className="right">
              <form onSubmit={handleSubmit}>
                <div className="formInput" >
                  <label>Code</label>
                  <input
                    type="text"
                    placeholder="7651017"
                    value={code}
                    onChange={handleCodeChange}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Profession Name in Arabic And English,Policeman"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
                <div className="formInput">
                  <label>Description</label>
                  <input
                    type="text"
                    placeholder="English Policeman"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>

                <div className="formInput">
                  <label>Mp3 url</label>
                  <input
                    type="text"
                    placeholder="Mp3 Url"
                    value={description}
                    onChange={handleDescriptionChange}
                    required
                  />
                </div>

                {/* <button type="submit">Send</button> */}
              </form>
              <div style={{ display: 'flex', justifyContent: 'center' }}><button type="submit" style={{
                width: '150px',
                padding: '10px',
                border: 'none',
                background: '#00b300',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                marginTop: 12,
                borderRadius:'10px'
              }}>Send</button></div>
            </div>
          </div>
        </div>
      </div>


      {<Modal
        open={open}
        sx={{ border: "none", boxShadow: "none" }}
        onClose={handleClose}
      >
        <div>
          <Box sx={styleConfirm}>
            <CardContent>
              <span
                style={{ float: "right", cursor: "pointer", color: "#5F6062" }}
                onClick={handleClose}
              >
                X
              </span>
              <CheckCircleIcon
                sx={{
                  color: "#00b300",
                  width: 60,
                  height: 60,
                  marginX: 16.1,
                  marginLeft: 19,
                }}
                fontSize="inherit"
              />
              <Typography
                id="modal-modal-title"
                variant="h6"
                sx={{
                  color: "#5F6062",
                  display: "flex",
                  justifyContent: "space-evenly",
                  marginTop: 1,
                }}
                component="h6"
              >
                <strong>Success!</strong>
              </Typography>
              <Typography
                sx={{
                  fontSize: 16,
                  fontFamily: "Ubuntu",
                  fontWeight: 500,
                  top: 7,
                  lineHeight: "30px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
                color="text.secondary"
                gutterBottom
              >
                {modalText} Added.
              </Typography>
              <button
                onClick={handleClose}
                style={{
                  backgroundColor: "#00b300",
                  color: "white",
                  fontFamily: "sans-serif",
                  fontSize: "14px",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  width: "100%",
                }}
              >
                OK
              </button>
            </CardContent>
            {/* </Card> */}
          </Box>
        </div>
      </Modal>}
    </div>
  );
};

export default New;
