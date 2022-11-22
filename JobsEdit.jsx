import React, { useState } from "react";
import jobsServices from "../../services/jobsServices";
import toastr from "toastr";
//useEffect
//useState

function editJobs() {
  const [jobsFormData, setJobsFormData] = useState({
    id: "",
    title: "",
    pay: "",
    profile: "",
    // slug: "",
    // statusId: "",
    primaryImage: "",
  });

  ////FORM FIELD CHANGE
  const onFormFieldChange = (event) => {
    //console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setJobsFormData((prevState) => {
      console.log("updater onChange");
      const newUserObject = {
        ...prevState,
      };
      newUserObject[name] = value;
      return newUserObject;
    });
  };

  console.log(jobsFormData);

  const onJobSubmitClicked = (e) => {
    console.log("Job Added!");
    e.preventDefault();
    if (jobsFormData.id) {
      jobsServices
        .editJobs(jobsFormData)
        .then(onEditJobsSuccess)
        .catch(onEditJobsError);
    } else {
      jobsServices
        .addJobs(jobsFormData)
        .then(onAddJobsSuccess)
        .catch(onAddJobsError);
    }
  };

  const onAddJobsSuccess = (data) => {
    console.log("Add Jobs Success", data.item);
    setJobsFormData((prevState) => {
      const newJobData = {
        ...prevState,
      };
      newJobData.id = data.item;
      return newJobData;
    });
    toastr.success("Job added!");
  };
  const onAddJobsError = (error) => {
    toastr.error("Ooops! Try Again!");
    console.log("Add Job Error", error);
  };

  const onEditJobsSuccess = (data) => {
    console.log("Edit Job Success", data);
    setJobsFormData((prevState) => {
      const newJobData = {
        ...prevState,
      };
      return newJobData;
    });
    toastr.success("Friend edited!");
  };
  const onEditJobsError = (error) => {
    toastr.error("Ooops! Try Again!");
    console.log("Edit Job Error", error);
  };

  return (
    <React.Fragment>
      <form>
        <h2>Edit Jobs</h2>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={jobsFormData.title}
            onChange={onFormFieldChange}
            name="title"
            id="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Pay Range
          </label>
          <input
            type="text"
            className="form-control"
            value={jobsFormData.pay}
            onChange={onFormFieldChange}
            name="pay"
            id="pay"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Profile
          </label>
          <input
            type="text"
            className="form-control"
            value={jobsFormData.profile}
            onChange={onFormFieldChange}
            name="profile"
            id="profile"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            value={jobsFormData.primaryImage}
            onChange={onFormFieldChange}
            name="primaryImage"
            id="primaryImage"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onJobSubmitClicked}
        >
          Done!
        </button>
      </form>
    </React.Fragment>
  );
}
export default editJobs;
