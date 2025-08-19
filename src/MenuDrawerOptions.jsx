import * as React from 'react';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ChecklistIcon from '@mui/icons-material/Checklist';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';


function MenuDrawerOptions() {


  const [openKey, setOpenKey] = useState(null);

  const handleToggle = (key) => {
    setOpenKey((prevKey) => (prevKey === key ? null : key));
  }
  return (

    <div>
      <List>
        <ListItem button onClick={() => handleToggle('saved')}>
          <ChecklistIcon sx={{ fontSize: 30 }} />
          <ListItemText primary="Saved Lists" />
        </ListItem>
        <Collapse in={openKey === 'saved'} timeout="auto" unmountOnExit>
          <List component='div' disablePadding>
            <ListItem>
              <ListItemText primary="Example 1" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Example 2" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Example 3" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleToggle('settings')}>
          <SettingsIcon sx={{ fontSize: 30 }} />
          <ListItemText primary="Settings" />
        </ListItem>
        <Collapse in={openKey === 'settings'} timeout="auto" unmountOnExit>
          <List component='div' disablePadding>
            <ListItem>
              <ListItemText primary="Dark Mode" />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button onClick={() => handleToggle('aboutUs')}>
          <GroupIcon sx={{ fontSize: 30 }} />
          <ListItemText primary="About Us" />
        </ListItem>
        <Collapse in={openKey === 'aboutUs'} timeout="auto" unmountOnExit>
          <List>
            <ListItem>
              <ListItemText primary="Example 1" />
            </ListItem>
          </List>
        </Collapse>
      </List>
    </div>
  )
};

export default MenuDrawerOptions;