import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import type { ModelType } from '../Types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    })
);

type IProps = {
    model: ModelType | '';
    onModelChange: (model: ModelType | '') => void;
};

export default function ModelSelect({model, onModelChange}: IProps) {
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        onModelChange(event.target.value as '' | ModelType);
    };

    return (
        <FormControl className={classes.formControl}>
            <InputLabel>Model</InputLabel>
            <Select value={model} onChange={handleChange}>
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={'sense-100'}>sense-100</MenuItem>
                <MenuItem value={'sense-200'}>sense-200</MenuItem>
                <MenuItem value={'sense-300'}>sense-300</MenuItem>
                <MenuItem value={'sense-400'}>sense-400</MenuItem>
            </Select>
        </FormControl>
    );
}
