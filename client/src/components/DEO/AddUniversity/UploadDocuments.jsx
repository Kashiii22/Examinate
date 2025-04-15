import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Button, Box, Card, CardContent, Typography, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function UploadDocuments({ passportPhoto, setPassportPhoto }) {
  const handleUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file); // Create preview URL
      setImage({ file, previewUrl }); // Store both file object and preview URL
    }
  };

  const handleRemove = (setImage) => {
    setImage(null);
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', p: 3, borderRadius: 2, background: 'transparent' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom textAlign="center">
          Upload Required Documents
        </Typography>

        {/* Passport Size Photo Upload */}
        <Box sx={{ my: 3.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1" gutterBottom>
              Profile Photo
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 180 }}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                Upload
                <VisuallyHiddenInput type="file" accept="image/*" onChange={(e) => handleUpload(e, setPassportPhoto)} />
              </Button>
              {passportPhoto && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <img src={passportPhoto.previewUrl} alt="Passport" width={80} height={80} style={{ borderRadius: '10px' }} />
                  <IconButton color="error" onClick={() => handleRemove(setPassportPhoto)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              )}
            </Box>
          </Box>
        </Box>

      </CardContent>
    </Card>
  );
}
