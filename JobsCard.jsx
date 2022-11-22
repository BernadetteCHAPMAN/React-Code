import React, { useState } from "react";
import JobsModal from "./JobsModal";
import PropTypes from "prop-types";

function JobsCard(props) {
  const aJob = props.job;
  const jobImage = aJob.techCompany.images;
  const jobId = aJob.id;
  jobImage.forEach((image) => {
    jobImage.img = image.imageUrl;
  });

  const [modalOpen, setModalOpen] = useState(false);

  const onLocalJobDeleteClick = (e) => {
    e.preventDefault();
  };
  const onLocalJobEditClick = (e) => {
    e.preventDefault();
  };
  const modalToggle = () => {
    setModalOpen(() => {
      return !modalOpen;
    });
  };

  return (
    <React.Fragment>
      <div className="col-4" key={"ListA-" + jobId}>
        <div className="card shadow pt-3 mb-3 border">
          <div className="card-body">
            <h5 className="card-title name">{aJob.title}</h5>
            <p className="card-text text-center">{aJob.pay}</p>
            {/* <p className="card-text text-center">{aJob.profile}</p> */}
            {/* <p className="card-text text-center">{aJob.techCompany}</p> */}
            <button
              className="btn btn-warning m-2"
              type="link"
              onClick={onLocalJobDeleteClick}
            >
              Delete
            </button>
            <button
              className="btn btn-warning m-2"
              onClick={onLocalJobEditClick}
            >
              Edit
            </button>
            <button className="btn btn-warning m-2" onClick={modalToggle}>
              View More
            </button>
          </div>
        </div>
      </div>
      <JobsModal
        jobView={modalToggle}
        jobModal={modalOpen}
        isOpen={modalOpen}
        toggleModal={modalToggle}
        title={"Title"}
        content={"Put your content"}
        jobs={aJob}
      />
    </React.Fragment>
  );
}

JobsCard.propTypes = {
  job: PropTypes.shape({
    pay: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,

    // onLocalJobEditClick: PropTypes.func.isRequired,
    // onLocalJobDeleteClick: PropTypes.func.isRequired,
    // modalToggle: PropTypes.func,
  }),
};
export default React.memo(JobsCard); //react memo makes the site faster, if nothing changes, will not reload.
