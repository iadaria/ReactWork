import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import DataPicker from 'react-datepicker';

const PortfolioForm = ({onSubmit, initialData = {}}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { handleSubmit, register, setValue } = useForm({defaultValues: initialData});

  useEffect(() => {
    register({name: 'startDate'});
    register({name: 'endDate'});
  }, [register]);

  useEffect(() => {
    const {startDate, endDate} = initialData;
    if (startDate) setStartDate(new Date(parseInt(startDate)));
    if (endDate) setEndDate(new Date(parseInt(endDate)));

  }, [initialData]);

  const handleDateChange = (dateType, setDate) => date => {
    setValue(dateType, (date && new Date(date.setHours(0, 0, 0, 0)).toISOString()) || date); //to register
    setDate(date);
  };
  //вызывается handleDateChange('StartDate', setStartDate)(date="12/03/12")
  /* const handleStartDate = (date) => {
    setValue('startDate', date.toISOString());
    setStartDate(date);
  };
  const handleEndDate = (date) => {
    setValue('endDate', date.toISOString());
    setEndDate(date);
  }; */
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      </button>
    </form>
  );
};

export default PortfolioForm;
