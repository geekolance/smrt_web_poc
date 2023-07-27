import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import './editimage.css'
import FreehandDrawing from '../kanva'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles'

const EditImage = (props) => {
  const {
    imageUrl
  } = props

  const [value, setValue] = React.useState('spot')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const theme = createTheme({
    overrides: {
      MuiTabs: {
        indicator: {
          backgroundColor: "#fff"
        }
      },
      MuiTab: {
        root: {
          "&:hover": {
            backgroundColor: "#fff",
            color: "pink[700]"
          }
        },
        selected: {
          backgroundColor: "orange[100]",
          color: "orange[700]",
          "&:hover": {
            backgroundColor: "green[100]",
            color: "green[700]"
          }
        }
      }
    }
  });

  return (
    <div className='mainTab'>
      <FreehandDrawing imageUrl={imageUrl} value={value} />
      <ThemeProvider theme={theme}>
        <Box sx={{ width: '100%', background: "#CCCCCC", borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="wrapped label tabs example"
            TabIndicatorProps={{
              style: {
                backgroundColor: "#000"
              }
            }}
          >
            <Tab
              value="spot"
              label="Spot"
              wrapped
            />
            <Tab value="damage" label="Damage" />
            <Tab value="alter" label="Alter" />
            <Tab value="note" label="Note" />
          </Tabs>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default EditImage