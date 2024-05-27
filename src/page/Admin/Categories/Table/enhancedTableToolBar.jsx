import Toolbar from '@mui/material/Toolbar';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { MoreVert } from '@mui/icons-material';


export default function EnhancedTableToolbar(props) {

    // console.log(numSelected)


    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(props.numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {props.numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {props.numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Category
                </Typography>
            )}

            {props.numSelected === 1 ? (

                <Tooltip title="Delete">
                    {/* <button> */}

                    <IconButton onClick={() => { props.handleDetail() }}>
                        <MoreVert />
                    </IconButton>
                    <IconButton onClick={() => { props.deleteCategories() }}>
                        <DeleteIcon />

                    </IconButton>
                    {/* </button> */}
                </Tooltip>

            ) : props.numSelected > 1 ? (
                <IconButton onClick={() => { props.deleteCategories() }}>
                    <DeleteIcon />

                </IconButton>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}

        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};
