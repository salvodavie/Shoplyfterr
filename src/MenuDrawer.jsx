import React from "react"
import logo2 from './assets/LogoOrange.png';
import { Drawer, Box, Typography, } from '@mui/material';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import MenuDrawerOptions from "./MenuDrawerOptions";


function MenuDrawer({ toggleDrawer, drawerOpen, toggleModal, savedLists, handleDeleteList, handleLoadList}) {

    return (
        <div>
            <Drawer className="drawer" anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{ width: 250, padding: 2, overflow: 'hidden' }}
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                >


                    <Typography className="menu-header" variant="h6">Menu</Typography>
                    <MenuDrawerOptions 
                    savedLists={savedLists} 
                    handleDeleteList={handleDeleteList} 
                    handleLoadList={handleLoadList} 
                    toggleModal={toggleModal}
                    />


                    <div className='logo-wrapper'>
                        <img src={logo2} alt='Logo' className='drawer-logo' />
                    </div>

                </Box>
            </Drawer>
        </div >
    )
};

export default MenuDrawer;