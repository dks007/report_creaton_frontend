import React from 'react';
import { useState, useCallback } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
 
const FilterComp = () => {
    // filter menu  
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);

    // 
    const [searchValue, setName] = useState("");

    const handleChange = (event) => {
      setName(event.target.value);
    };
 
  return (
    <>
    <div className='jira-filter-control added-value'>
      <Button id="jira-filter" aria-controls={open ? 'jira-menu' : undefined} aria-haspopup="true" aria-expanded={open ? '' : undefined}
        variant="contained" isableelevation="true"onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Jira ID: {searchValue}
      </Button>
      <Menu id="jira-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'jira-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search1...' /></MenuItem>
      </Menu>
    </div>

    <div className='expert-filter-control'>
      <Button id="expert-filter" aria-controls={open ? 'expert-menu' : undefined} aria-haspopup="true" aria-expanded={open ? '' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Expert Name
      </Button>
      <Menu id="expert-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'expert-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search2...' /></MenuItem>
      </Menu>
    </div>
  
    <div className='cus-filter-control'>
      <Button id="cus-filter" aria-controls={open ? 'cus-menu' : undefined} aria-haspopup="true" aria-expanded={open ? '' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Customer
      </Button>
      <Menu id="cus-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'cus-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search3...' /></MenuItem>
      </Menu>
    </div>

    <div className='menu-filter-control'>
      <Button id="menu-filter" aria-controls={open ? 'menu-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Menu Card ID
      </Button>
      <Menu id="menu-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'menu-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search4...' /></MenuItem>
      </Menu>
    </div>

    <div className='csm-filter-control'>
      <Button id="csm-filter" aria-controls={open ? 'csm-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        CSM / PSM
      </Button>
      <Menu id="csm-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'csm-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search5...' /></MenuItem>
      </Menu>
    </div>

    <div className='sdm-filter-control'>
      <Button id="sdm-filter" aria-controls={open ? 'sdm-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        SDM
      </Button>
      <Menu id="sdm-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'sdm-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search6...' /></MenuItem>
      </Menu>
    </div>

    <div className='sdo-filter-control'>
      <Button id="sdo-filter" aria-controls={open ? 'sdo-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        SDO
      </Button>
      <Menu id="sdo-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'sdo-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search7...' /></MenuItem>
      </Menu>
    </div>

    <div className='created-filter-control'>
      <Button id="created-filter" aria-controls={open ? 'created-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Issue Created Date
      </Button>
      <Menu id="created-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'created-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search8...' /></MenuItem>
      </Menu>
    </div>

    <div className='assign-filter-control'>
      <Button id="assign-filter" aria-controls={open ? 'assign-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Assigned Date
      </Button>
      <Menu id="assign-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'assign-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search9...' /></MenuItem>
      </Menu>
    </div>

    <div className='status-filter-control'>
      <Button id="status-filter" aria-controls={open ? 'status-menu' : undefined} aria-haspopup="true" aria-expanded={open ? '' : undefined}
        variant="contained" isableelevation="true" onClick={handleClick} endIcon={<KeyboardArrowDownIcon />}>
        Status:
      </Button>
      <Menu id="status-menu" className='filter-wrapper' MenuListProps={{ 'aria-labelledby': 'status-filter', }} anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem><input type='search' maxlength="20" placeholder='Search10...' onChange={handleChange} value={searchValue} /></MenuItem>
      </Menu>
    </div>
    <div className='filter-action-btn'>
      <button className='apply-filter'>APPLY</button>
      <button className='clear-filter'>Clear</button>
    </div>
  </>
  )
};
export default FilterComp;