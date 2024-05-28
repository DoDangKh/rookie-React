import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import useSWR from 'swr';
import {
    getAllCategory
    , CategoryEndPoint as cacheKey
} from '../../../../../api/CategoryApi';
import { CircularProgress } from '@mui/material';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [

    {
        id: 1,
        name: 'Oliver Hansen'
    },
    {
        id: 2,
        name: 'Van Henry'
    },
    {
        id: 3,
        name: 'April Tucker'
    },
];

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultipleSelectChip(props) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const [Id, setId] = React.useState([])
    const [name, setName] = React.useState([])

    const {
        isLoading,
        error,
        data,
        mutate
    } = useSWR(cacheKey, getAllCategory, { revalidateOnMount: true })

    // console.log(personName)
    const handleChange = (event) => {
        const {
            target: { value, id, key },
        } = event;
        // console.log(event.target.value)
        props.handleChangeCategories(value)
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

        setId(id)

    };

    if (isLoading) {
        return (
            <CircularProgress></CircularProgress>
        )
    }
    else if (error) {
        console.log(error)
        return (
            <p>error</p>
        )
    }
    else {
        return (
            <div>
                <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel id="demo-multiple-chip-label">Category</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}


                        MenuProps={MenuProps}
                    >
                        {data.map((data) => (
                            <MenuItem
                                key={data.id}
                                id={data.id}
                                value={data}
                                style={getStyles(data, personName, theme)}
                            >
                                {data.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div >
        );
    }
}