import { useEffect, useState } from "react";
import './portfolio-form.scss';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
//import DataPicker from 'react-datepicker';

const PortfolioForm = ({ onSubmit, initialData = {} }) => {
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    //const [languageCode, setLanguageCode] = useState("ru");
    const { handleSubmit, register, setValue } = useForm({ defaultValues: initialData });

    useEffect(() => {
        register({ name: 'startDate' });
        register({ name: 'endDate' });
        register({ name: "languageCode" });
    }, [register]);

    useEffect(() => {
        const { startDate, endDate } = initialData;
        if (startDate) setStartDate(new Date(parseInt(startDate)));
        if (endDate) setEndDate(new Date(parseInt(endDate)));

    }, [initialData]);

    const handleDateChange = (dateType, setDate) => date => {
        let newDate = undefined;
        console.log('date', date);
        if (date) {
            newDate = new Date(date);
            setValue(dateType, (newDate && new Date(newDate.setHours(0, 0, 0, 0)).toISOString()) || newDate); //to register

        }
        console.log('newDate', newDate);
        setDate(newDate);
    };

    //console.log('startDate', startDate);
    //console.log('endDate', endDate);
    return (
        <form className="portfolio-form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl className="form-control">
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                    onChange={e => setValue("languageCode", e.target.value)}
                    // inputProps={{
                    //     name: "languageCode",
                    //     inputRef: (ref) => {
                    //         if (!ref) return;
                    //         register({name: "languageCode", value: ref.value})
                    //     }
                    // }}
                    //value={undefined}
                    labelId="language-label"
                    name="languageCode"
                    defaultValue=""
                    //inputRef={register} 
                    variant="filled"
                >
                    <MenuItem value="ru">Russian</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                </Select>
            </FormControl>

            <TextField
                name="title"
                label="Title"
                inputRef={register} variant="filled"
            />

            <TextField
                name="company"
                label="Company"
                inputRef={register} variant="filled"
            />

            <TextField
                name="companyWebsite"
                label="Company Website"
                inputRef={register} variant="filled"
            />

            <TextField
                name="jobTitle"
                label="Job Title"
                inputRef={register} variant="filled"
            />

            <TextField
                name="description"
                label="Description"
                multiline
                rowsMax={4}
                inputRef={register} variant="filled"
            />

            {/* <TextField
                name="category"
                label="Category"
                inputRef={register} variant="filled"
            /> */}

            <FormControl className="form-control">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                    labelId="category-label"
                    name="category"
                    defaultValue="learn"
                    inputRef={register} variant="filled"
                >
                    <MenuItem value="learn">Learn</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                </Select>
            </FormControl>

            <TextField
                type="date"
                //name="startDate"
                onChange={(event) => handleDateChange('startDate', setStartDate)(event.target.value)}
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                //inputRef={register} 
                variant="filled"
            />

            <TextField
                type="date"
                //value={endDate}
                //name="endDate"
                onChange={(event) => handleDateChange('endDate', setEndDate)(event.target.value)}
                label="End Date"
                InputLabelProps={{ shrink: true }}
                //inputRef={register} 
                variant="filled"
            />

            {endDate &&
                <Button
                    className="btn-no_end_date"
                    onClick={() => handleDateChange('endDate', setEndDate)(null)}
                    color="secondary"
                    variant="outlined"
                >
                    No End Date
                </Button>
            }

            {!endDate &&
                <Button
                    className="btn-end_date"
                    onClick={() => handleDateChange('endDate', setEndDate)(new Date())}
                    variant="outlined"
                >
                    Set End Date
                </Button>
            }

            <TextField
                name="repository"
                label="Repository"
                inputRef={register} variant="filled"
            />

            <TextField
                name="deploy"
                label="Deploy"
                inputRef={register} variant="filled"
            />

            <TextField
                name="taskDocument"
                label="Task Document"
                inputRef={register} variant="filled"
            />

            <TextField
                name="technologies"
                label="Technologies"
                inputRef={register} variant="filled"
            />

            <TextField
                name="technologyImgs"
                label="Technology images"
                inputRef={register} variant="filled"
            />

            <TextField
                disabled
                name="imgName"
                label="Image name"
                inputRef={register} variant="filled"
            />

            <TextField
                name="files"
                label="Imgage for load"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputRef={register} variant="filled"
            />

            {/* <input 
                    name="imgName"
                    type="file"
                    id="imgName"
                    //style={{ display: "none" }}
                />
                    
            <Button
                variant="contained"
                component="label"
            >
                Upload File
        
            </Button> */}

            <Button
                className="btn-create"
                color="primary"
                variant="outlined"
                type="submit"
            >
                Create
            </Button>

        </form>
    );
};

export default PortfolioForm;

/*
<div className="form-group">
    <label htmlFor="title">Title</label>
    <input
        ref={register}
        name="title"
        type="text"
        className="form-control"
        id="title"
    />
    </div>

    <div className="form-group">
    <label htmlFor="city">Company</label>
    <input
        ref={register}
        name="company"
        type="text"
        className="form-control"
        id="company"
    />
    </div>

    <div className="form-group">
    <label htmlFor="city">Company Website</label>
    <input
        ref={register}
        name="companyWebsite"
        type="text"
        className="form-control"
        id="companyWebsite"
    />
    </div>

    <div className="form-group">
    <label htmlFor="street">Location</label>
    <input
        ref={register}
        name="location"
        type="text"
        className="form-control"
        id="location"
    />
    </div>

    <div className="form-group">
    <label htmlFor="street">Job Title</label>
    <input
        ref={register}
        name="jobTitle"
        type="text"
        className="form-control"
        id="jobTitle"
    />
    </div>

    <div className="form-group">
    <label htmlFor="description">Description</label>
    <textarea
        ref={register}
        name="description"
        rows="5"
        type="text"
        className="form-control"
        id="description"
    ></textarea>
    </div>

    <div className="form-group">
    <label htmlFor="street">Start Date</label>
    <div>
        <DataPicker
        showYearDropdown
        selected={startDate}
        onChange={handleDateChange('startDate', setStartDate)}
        />
    </div>
    </div>

    <div className="form-group">
    <label htmlFor="street">End Date</label>
    <div>
        <DataPicker
        showYearDropdown
        disabled={!endDate}
        selected={endDate}
        onChange={handleDateChange('endDate', setEndDate)}
        />
    </div>
    </div>

    <div className="form-group">
    <label htmlFor="category">Category</label>
    <input
        ref={register}
        name="category"
        type="text"
        className="form-control"
        id="category"
    />
    </div>

    <div className="form-group">
    { endDate &&
        <button
        onClick={() => handleDateChange('endDate', setEndDate)(null)}
        type="button"
        className="btn btn-danger">
        No End Date
        </button>
    }
    { !endDate &&
        <button
        onClick={() => handleDateChange('endDate', setEndDate)(new Date())}
        type="button"
        className="btn btn-success">
        Set End Date
        </button>
    }
    </div>

    <button type="submit" className="btn btn-primary">
    Create
    </button> */
