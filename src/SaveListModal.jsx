import React from "react"
import { Modal, Box, Typography} from "@mui/material"

function SaveListModal( {handleSaveList, toggleModal, isSaveModalOpen, newList, setNewList } ){

return(
<Modal
  open={isSaveModalOpen}
  onClose={toggleModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box
    sx={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      width: 300
    }}
  >
    <Typography id="modal-modal-title" variant="h6" component="h2">
      New List
    </Typography>
    <form className="new-list-form" onSubmit={handleSaveList}>
      <input
        type="text"
        value={newList}
        onChange={(e) => setNewList(e.target.value)}
      />
      <input type="submit" />
    </form>
  </Box>
</Modal>
)
};

export default SaveListModal;

