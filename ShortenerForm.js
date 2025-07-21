// components/ShortenerForm.js

import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Container } from '@mui/material';
import { logAction, logError } from '../utils/logger';
import { createShortLink } from '../utils/api';

const ShortenerForm = ({ onCreate }) => {
  const initialURLs = [
    { longUrl: '', validity: 30, shortcode: '', errorMessage: '' },
    { longUrl: '', validity: 30, shortcode: '', errorMessage: '' },
    { longUrl: '', validity: 30, shortcode: '', errorMessage: '' },
    { longUrl: '', validity: 30, shortcode: '', errorMessage: '' },
    { longUrl: '', validity: 30, shortcode: '', errorMessage: '' },
  ];

  const [urls, setUrls] = useState(initialURLs);

  const handleUrlChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validUrls = urls.filter(url => url.longUrl.match(/^https?:\/\/[a-zA-Z0-9-]+\.[a-zA-Z]{2,}/));
    if (validUrls.length === 0) {
      logError('Validation Error', 'All URLs are invalid');
      return;
    }

    try {
      const results = await Promise.all(
        urls.map(({ longUrl, validity, shortcode }) =>
          createShortLink(longUrl, validity, shortcode)
        )
      );
      onCreate(results);
      logAction('URLs Shortened', results);
    } catch (error) {
      logError('API Error', error.message);
    }
  };

  return (
    <Container sx={{ maxWidth: 'lg', padding: '2rem', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          backgroundColor: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 8px 12px rgba(0, 0, 0, 0.1)',
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1, // Ensure this box takes up all available space
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            color: '#3c3c3c',
            marginBottom: '1.5rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          }}
        >
          Shorten Your URLs
        </Typography>

        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          {urls.map((url, index) => (
            <Grid container spacing={3} key={index}>
              <Grid item xs={12} sm={8}>
                <TextField
                  fullWidth
                  label={`Long URL ${index + 1}`}
                  variant="outlined"
                  value={url.longUrl}
                  onChange={(e) => handleUrlChange(index, 'longUrl', e.target.value)}
                  required
                  error={url.errorMessage !== ''}
                  helperText={url.errorMessage}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    '&:hover': { borderColor: '#a6c1ee' },
                    marginBottom: '1rem',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#a6c1ee',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fbc2eb',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  label="Validity (Minutes)"
                  type="number"
                  variant="outlined"
                  value={url.validity}
                  onChange={(e) => handleUrlChange(index, 'validity', e.target.value)}
                  required
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#a6c1ee',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fbc2eb',
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={6} sm={2}>
                <TextField
                  fullWidth
                  label="Custom Shortcode"
                  variant="outlined"
                  value={url.shortcode}
                  onChange={(e) => handleUrlChange(index, 'shortcode', e.target.value)}
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#a6c1ee',
                      },
                      '&:hover fieldset': {
                        borderColor: '#fbc2eb',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          ))}

          <Box sx={{ textAlign: 'center', marginTop: '2rem' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: '#FF7B7B', // Primary button color
                '&:hover': {
                  backgroundColor: '#FF3B3B', // Hover color
                },
                padding: '12px 30px',
                fontSize: '16px',
                borderRadius: '8px',
                boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              Shorten URLs
            </Button>
          </Box>
        </form>
      </Box>

      {/* Your Name at the Bottom Right */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '8px', // Very small font size
          color: '#a6a6a6', // Lighter gray color for the text
        }}
      >
        <Typography variant="body2">Suchithra</Typography>
      </Box>
    </Container>
  );
};

export default ShortenerForm;
