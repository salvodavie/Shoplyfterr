import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';



function MenuDrawerOptions({ savedLists, handleDeleteList, handleLoadList, toggleModal }) {


  const [openKey, setOpenKey] = useState(null);

  const handleToggle = (key) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key));
  }
  return (


    <div className='menu-drawer-options'>

      {/*Save-Current-Lists*/}
      <List component="div" disablePadding>
        <ListItem button onClick={() => { toggleModal(); }}>
          <AssignmentAddIcon sx={{ fontSize: 40 }} />
          <ListItemText primary="Save Current List" primaryTypographyProps={{ sx: { fontSize: '1.2rem' } }} />
        </ListItem>

        {/*Saved-Lists*/}
        <ListItem button onClick={() => handleToggle('saved')}>
          <ChecklistIcon sx={{ fontSize: 40 }} />
          <ListItemText primary="Saved Lists" primaryTypographyProps={{ sx: { fontSize: '1.2rem' } }} />
        </ListItem>
        <Collapse in={openKey === 'saved'} timeout="auto" unmountOnExit>
          <List component='div' disablePadding>
            {savedLists.map((list) => (
              <ListItem key={list.name} 
                secondaryAction={
                  <div className='secondary-actions'>
                    <button className='saved-lists-icons' onClick={() => handleDeleteList(list.id)}><DeleteIcon sx={{ fontSize: 35 }}/></button>
                    <button className='saved-lists-icons' onClick={() => handleLoadList(list.id)}><UploadFileIcon sx={{ fontSize: 35 }}/></button>
                  </div>
                }>
                <ListItemText
                  primary={list.name}
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '1.2rem',
                      paddingBottom: '.4rem',
                      "&:hover": { color: '#f84b38' }
                    }
                  }} />
              </ListItem>
            ))}
          </List>
        </Collapse>

        {/*Settings*/}
        <ListItem button onClick={() => handleToggle('settings')}>
          <SettingsIcon sx={{ fontSize: 40 }} />
          <ListItemText primary="Settings" primaryTypographyProps={{ sx: { fontSize: '1.2rem' } }} />
        </ListItem>
        <Collapse in={openKey === 'settings'} timeout="auto" unmountOnExit>
          <List component='div' disablePadding>
            <ListItem>
              <ListItemText primary="Dark Mode" primaryTypographyProps={{ sx: { fontSize: '1.2rem' } }}/>
            </ListItem>
          </List>
        </Collapse>

        {/*About Us*/}
        <ListItem button onClick={() => handleToggle('aboutUs')}>
          <GroupIcon sx={{ fontSize: 40 }} />
          <ListItemText primary="About Us" primaryTypographyProps={{ sx: { fontSize: '1.2rem' } }} />
        </ListItem>
        <Collapse in={openKey === 'aboutUs'} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <ListItemText primary="Example 1" primaryTypographyProps={{ sx: { fontSize: '1.2rem' } }}/>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  )
};

export default MenuDrawerOptions;