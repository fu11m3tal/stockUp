import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function Navigation({handleMenuChange}) {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" color="primary" {...bindTrigger(popupState)}>
            Menu
          </Button>
          <Menu {...bindMenu(popupState)}>
                  <MenuItem id="stocks" onClick={(e) => {
                    handleMenuChange(e, popupState.close);
                  }}>Stocks</MenuItem>
                  <MenuItem id="search" onClick={(e) => {
                    handleMenuChange(e, popupState.close);
                  }}>Search</MenuItem>
                  <MenuItem id="news" onClick={(e) => {
                    handleMenuChange(e, popupState.close);
                  }}>News</MenuItem>
                  <MenuItem id="settings" onClick={(e) => {
                    handleMenuChange(e, popupState.close);
                  }}>Settings</MenuItem>
                </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}
