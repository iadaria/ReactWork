import { useEffect, useState } from "react";
import './portfolio-form.scss';
import { useForm } from 'react-hook-form';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
//import DataPicker from 'react-datepicker';

const PortfolioForm = ({ onSubmit, initialData = {} }) => {
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const { handleSubmit, register, setValue } = useForm({ defaultValues: initialData });

    useEffect(() => {
        register({ name: 'startDate' });
        register({ name: 'endDate' });
    }, [register]);

    useEffect(() => {
        const { startDate, endDate } = initialData;
        if (startDate) setStartDate(new Date(parseInt(startDate)));
        if (endDate) setEndDate(new Date(parseInt(endDate)));

    }, [initialData]);

    const handleDateChange = (dateType, setDate) => date => {
        let newDate = new Date(date);
        setValue(dateType, (newDate && new Date(newDate.setHours(0, 0, 0, 0)).toISOString()) || newDate); //to register
        setDate(newDate);
    };

    console.log('startDate', startDate);
    return (
        <form className="portfolio-form" onSubmit={handleSubmit(onSubmit)}>
            <TextField
                name="title"
                label="Title"
                inputRef={register} fullWidth variant="filled"
            />

            <TextField
                name="company"
                label="Company"
                inputRef={register} fullWidth variant="filled"
            />

            <TextField
                name="companyWebsite"
                label="Company Website"
                inputRef={register} fullWidth variant="filled"
            />

            <TextField
                name="jobTitle"
                label="Job Title"
                inputRef={register} fullWidth variant="filled"
            />

            <TextField
                name="description"
                label="Description"
                multiline
                rowsMax={4}
                inputRef={register} fullWidth variant="filled"
            />

            <TextField
                //onChange={(event) => console.log('onChange from category', event.target.value)}
                name="category"
                label="Category"
                inputRef={register} variant="filled" fullWidth
            />

            <TextField
                type="date"
                //onChange={handleDateChange('startDate', setStartDate)}
                onChange={(event) => handleDateChange('startDate', setStartDate)(event.target.value)}
                label="Start Date"
                InputLabelProps={{ shrink: true }}
                //ref={register} 
                variant="filled" fullWidth
            />

            <TextField
                type="date"
                onChange={(event) => handleDateChange('endDate', setEndDate)(event.target.value)}
                label="End Date"
                InputLabelProps={{ shrink: true }}
                //ref={register} 
                variant="filled" fullWidth
            />

            {endDate &&
                <Button
                    onClick={() => handleDateChange('endDate', setEndDate)(undefined)}
                    color="secondary"
                    variant="outlined"
                >
                    No End Date
                </Button>
            }

            {!endDate &&
                <Button
                    style={{ color: '#fff', marginTop: 10 }}
                    onClick={() => handleDateChange('endDate', setEndDate)(new Date())}
                    variant="outlined"
                >
                    Set End Date
                </Button>
            }

            <TextField
                name="repository"
                label="Repository"
                inputRef={register} variant="filled" fullWidth
            />

            <TextField
                name="deploy"
                label="Deploy"
                inputRef={register} variant="filled" fullWidth
            />

            <TextField
                name="taskDocument"
                label="Task Document"
                inputRef={register} variant="filled" fullWidth
            />

            {/* <TextField
                name="imgName"
                label="Image name"
                inputRef={register} variant="filled" fullWidth
            /> */}

            <TextField
                name="technologies"
                label="Technologies"
                inputRef={register} variant="filled" fullWidth
            />

            <TextField
                name="technologyImgs"
                label="Technology images"
                inputRef={register} variant="filled" fullWidth
            />

            <TextField
                name="imgName"
                label="imgage"
                type="file"
                InputLabelProps={{ shrink: true }}
                inputRef={register} variant="filled" fullWidth
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
