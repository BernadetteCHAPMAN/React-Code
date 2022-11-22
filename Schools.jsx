import React, { useCallback, useState, useEffect } from "react";
import schoolsServices from "../../services/schoolsServices";
import SchoolCard from "./SchoolCard";
import { useNavigate } from "react-router-dom";

function Schools() {
  const navigate = useNavigate();
  const [schoolData, setSchoolData] = useState({
    arrayOfSchools: [],
    schoolsComponents: [],
  });

  console.log(schoolData);

  const getAllSchools = (entityName) => {
    schoolsServices
      .getSchools(entityName)
      .then(onGetSchoolsSuccess)
      .catch(onGetSchoolsError);
  };

  useEffect(() => {
    console.log("Firing useEffect for get schools");
    getAllSchools(schoolData.entityName);
  }, [schoolData.entityName]); //when you change how many "friends" you want on the page, this will make useEffect run the page over again.

  const onGetSchoolsSuccess = (data) => {
    console.log("get schools console log", data);
    let listOfSchools = data.data.items;
    console.log("data.data.items", listOfSchools);

    setSchoolData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfSchools = listOfSchools;
      pageData.schoolsComponents = listOfSchools.map(mapSchools);

      return pageData;
    });
  };

  const onGetSchoolsError = (err) => {
    console.error(err, "Deleting school");
  };

  const onDeleteError = (err) => {
    console.error(err);
  };

  const mapSchools = (aSchool) => {
    return (
      <SchoolCard
        school={aSchool}
        key={"List-A" + aSchool.id}
        onSchoolClicked={onDeleteRequested}
      />
    );
  };

  ////DELETE SCHOOLS
  const onDeleteRequested = useCallback((callSchools, eObj) => {
    console.log(callSchools, { callSchools, eObj });

    const handler = getDeleteSuccessHandler(callSchools);
    schoolsServices
      .deleteSchool(callSchools)
      .then(handler)
      .catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (schoolToBeDeleted) => {
    console.log("getDeleteSuccessHandler", schoolToBeDeleted);
    return () => {
      console.log("onDeleteSuccess", schoolToBeDeleted);

      setSchoolData((prevState) => {
        const schoolData = { ...prevState };
        console.log(setSchoolData);
        schoolData.arrayOfSchools = [...schoolData.arrayOfSchools];

        const idxOf = schoolData.arrayOfSchools.findIndex((school) => {
          let result = false;

          if (school.id === schoolToBeDeleted) {
            result = true;
          }

          return result;
        });

        if (idxOf >= 0) {
          schoolData.arrayOfSchools.splice(idxOf, 1);
          schoolData.schoolsComponents =
            schoolData.arrayOfSchools.map(mapSchools);
        }
        return schoolData;
      });
    };
  };

  //clickhandlers

  const onAddNewSchools = () => {
    console.log("Take me to Add Schools");
    navigate("/SchoolsNew");
  };

  return (
    <React.Fragment>
      <h1>Schools</h1>
      <div className="container">
        <div className="row flex-wrap">{schoolData.schoolsComponents}</div>
      </div>
      <div>
        <button
          onClick={onAddNewSchools}
          type="button"
          className="btn btn-warning m-2"
        >
          {" "}
          Add a School{" "}
        </button>
      </div>
    </React.Fragment>
  );
}

export default Schools;
