import React from "react";
import { useNavigate } from "react-router-dom";

function SchoolCard(props) {
  const navigate = useNavigate();
  console.log("This school", props.school);
  const aSchool = props.school;

  const onLocalSchoolClicked = (e) => {
    e.preventDefault();
    props.onSchoolClicked(props.school.id, e);
  };

  const onEditSchoolPage = (e) => {
    const editingSchools = { type: "edit_school", id: props.school };
    e.preventDefault();
    console.log("I want to edit schools", editingSchools);
    navigate(`/schools/${props.school.id}`, { state: editingSchools });
  };

  //     e.preventDefault();
  //     props.onSchoolClicked(props.school.id, e);
  //   };

  return (
    <div className="col-4">
      <div className="card shadow pt-3 mb-3 border">
        <div className="card-body">
          <p className="card-text">
            <strong>{aSchool.school}</strong>
          </p>
          <p className="card-text">{aSchool.location}</p>
          <p className="card-text">{aSchool.level}</p>

          <button
            type="submit"
            className="btn btn-danger m-1"
            onClick={onLocalSchoolClicked}
          >
            Delete
          </button>

          <button
            type="submit"
            className="btn btn-info m-1"
            onClick={onEditSchoolPage}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SchoolCard);
