
import React, { useEffect, useState } from 'react';
import { getShortenedLinks } from '../utils/api';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Statistics = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getShortenedLinks();
        setLinks(data);
      } catch (error) {
        console.error('Error fetching shortened URLs:', error);
      }
    };
    fetchLinks();
  }, []);

  return (
    <div>
      <Typography variant="h6">Statistics</Typography>
      <List>
        {links.map((link) => (
          <ListItem key={link.id}>
            <ListItemText
              primary={`Shortened URL: ${link.shortUrl}`}
              secondary={`Clicks: ${link.clicks}`}
            />
            <Typography variant="body2" color="textSecondary">
              Created at: {new Date(link.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Expiry: {new Date(link.expiry).toLocaleString()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Statistics;
