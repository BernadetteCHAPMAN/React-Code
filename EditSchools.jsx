import React, { useState } from "react";
import schoolsServices from "../../services/schoolsServices";
import toastr from "toastr";

function EditAndAddSchools() {
  const [schoolFormData, setSchoolFormData] = useState({
    id: "",
    school: "",
    level: "",
    location: "",
  });

  console.log(schoolFormData);

  //FORM FIELD CHANGE

  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setSchoolFormData((prevState) => {
      console.log("updater onChange");

      const newUserObject = {
        ...prevState,
      };

      newUserObject[name] = value;
      return newUserObject;
    });
  };

  const onSubmitClicked = (e) => {
    console.log("School Edited!");
    e.preventDefault();
    if (schoolFormData.id) {
      schoolsServices
        .editSchools(schoolFormData)
        .then(onEditSchoolSuccess)
        .catch(onEditSchoolError);
    } else {
      schoolsServices
        .addSchools(schoolFormData)
        .then(onAddSchoolSuccess)
        .catch(onAddSchoolError);
    }
  };

  const onAddSchoolSuccess = (data) => {
    console.log("Add School Success", data.item);
    setSchoolFormData((prevState) => {
      const newSchoolData = {
        ...prevState,
      };
      newSchoolData.id = data.item;
      return newSchoolData;
    });
    toastr.success("School added!");
  };
  const onAddSchoolError = (error) => {
    toastr.error("Ooops! Try Again!");
    console.log("Add School Error", error);
  };

  const onEditSchoolSuccess = (data) => {
    console.log("Edit School Success", data);
    setSchoolFormData((prevState) => {
      const newSchoolData = {
        ...prevState,
      };
      return newSchoolData;
    });
    toastr.success("School edited!");
  };
  const onEditSchoolError = (error) => {
    toastr.error("Ooops! Try Again!");
    console.log("Edit School Error", error);
  };

  return (
    <React.Fragment>
      <form>
        <h2>Edit/Add a School</h2>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            School Name
          </label>
          <input
            type="text"
            className="form-control"
            value={schoolFormData.school}
            onChange={onFormFieldChange}
            name="school"
            id="school"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Class Level
          </label>
          <input
            type="text"
            className="form-control"
            value={schoolFormData.level}
            onChange={onFormFieldChange}
            name="level"
            id="level"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            Location/Address
          </label>
          <input
            type="text"
            className="form-control"
            value={schoolFormData.location}
            onChange={onFormFieldChange}
            name="location"
            id="location"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={onSubmitClicked}
        >
          Done!
        </button>
      </form>
    </React.Fragment>
  );
}

export default EditAndAddSchools;
