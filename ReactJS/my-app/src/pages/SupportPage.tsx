import { Box, Typography, Button } from '@mui/material'

function SupportPage(){
    return (
        <Box className="p-6" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4" color="primary">Support Page</Typography>
            <Typography variant="body1">If you need help, contact our support team.</Typography>
            <div className="mt-4">
                <Button variant="contained" color="primary">Contact Support</Button>
                <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>Learn More</Button>
            </div>
        </Box>
    )
}

export default SupportPage