import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select } from 'antd';
import Chip from '@mui/material/Chip';
import useSWR from 'swr';
import {
    getAllCategory
    , CategoryEndPoint as cacheKey
} from '../../../../../api/CategoryApi';
import { CircularProgress } from '@mui/material';




export default function MultipleSelectChip(props) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState(props.categories);
    const [Id, setId] = React.useState([])
    const [name, setName] = React.useState([])

    const {
        isLoading,
        error,
        data,
        mutate
    } = useSWR(cacheKey, getAllCategory, { revalidateOnMount: true })

    // console.log(personName)
    const handleChange = (value, option) => {
        console.log(`selected ${value}`);
        setPersonName(value);
        let temp = []
        for (let i in value) {
            // let obj=data.filter(x => x.id === value[i]).map(x => x)
            console.log("data:", data.filter(x => x.id === value[i])[0])
            temp.push(data.filter(x => x.id === value[i])[0])
        }
        console.log(temp)
        props.handleChangeCategories(temp);
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
        const options = data.map(category => ({
            label: category.name,
            value: category.id,
        }))

        return (
            <div>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleChange}
                    value={personName}
                    options={options}
                />
            </div>
        );
    }
}