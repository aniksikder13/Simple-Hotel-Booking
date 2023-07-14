import * as React from 'react'
import PropTypes from 'prop-types'
import {Tabs, Tab, Box} from '@mui/material'
import RoomItem from '../components/RoomsItem'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`rooms-tabpanel-${index}`}
      aria-labelledby={`rooms-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `rooms-tab-${index}`,
    'aria-controls': `rooms-tabpanel-${index}`,
  };
}

export default function RoomLanding() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const category= ['All', 'Kings Room', 'Double Room', 'Single Room']

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', marginTop: '40px' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Room Category"
        className='room-category-tab'
        sx={{ borderRight: 1, borderColor: 'divider', width: '200px'}}
      >

        {
            category.map((item, index) => <Tab key={index} label={item} {...a11yProps(index)} />)
        }

      </Tabs>

      {
        category.map((item, index) =>  <TabPanel key={index} value={value} index={index}>
                                            <ul className='roomLists'>
                                                <RoomItem type={item} />
                                            </ul>
                                        </TabPanel>)
      }

    </Box>
  );
}