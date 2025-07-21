
import React from 'react';
import { List, ListItem, ListItemText, Typography, Button } from '@mui/material';

const ShortenedLinks = ({ links }) => {
  return (
    <div>
      <Typography variant="h6">Your Shortened URLs</Typography>
      <List>
        {links.map((link, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={link.shortUrl}
              secondary={`Expiry: ${new Date(link.expiry).toLocaleString()}`}
            />
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => window.location.href = link.shortUrl}
            >
              Visit
            </Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ShortenedLinks;
