import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import './editimage.css'
import FreehandDrawing from '../kanva'

const EditImage = (props) => {
  const {
    imageUrl
  } = props

  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='mainTab'>
      <FreehandDrawing imageUrl={imageUrl} value={value} />
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="spot"
            label="Spot"
            wrapped
          />
          <Tab value="damange" label="Damage" />
          <Tab value="alter" label="Alter" />
          <Tab value="note" label="Note" />
        </Tabs>
      </Box>
    </div>
  );
}

export default EditImage