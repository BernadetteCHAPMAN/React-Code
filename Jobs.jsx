import React, { useEffect, useState } from "react";
//import companiesServices from "../../services/companiesServices";
import jobsServices from "../../services/jobsServices";
import JobsCard from "./JobsCard";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

function Jobs() {
  const [jobsPageData, setJobsPageData] = useState({
    arrayOfJobs: [],
    jobComponents: [],
    pageIndex: 0,
    pageSize: 2,
  });

  const [searchjobsData, setSearchJobsData] = useState({ query: "" });
  console.log(jobsPageData);

  const getAllJobs = (pageIndex, pageSize) => {
    jobsServices
      .getJobs(pageIndex, pageSize)
      .then(onGetJobsSuccess)
      .catch(onGetJobsError);
  };

  useEffect(() => {
    getAllJobs(jobsPageData.pageIndex, jobsPageData.pageSize);
  }, [jobsPageData.pageIndex]); //anytime you useEffect, you need a dependancy

  //MAPPING:
  const onGetJobsSuccess = (data) => {
    console.log("get jobs console log", data);
    let listOfJobs = data.data.item.pagedItems;
    console.log("data.item.pagedItems:", listOfJobs);

    setJobsPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfJobs = listOfJobs;
      pageData.jobComponents = listOfJobs.map(mapJobs);
      pageData.pageIndex = data.data.item.pageIndex;
      pageData.pageSize = data.data.item.pageSize;
      return pageData;
    });
  };
  const onGetJobsError = (err) => {
    console.error(err, "Deleting job");
  };
  const mapJobs = (aJob) => {
    return <JobsCard job={aJob} key={"List-A" + aJob.id} />;
  };

  ////SEARCH JOBS
  const onSearchJobsSuccess = (data) => {
    console.log("search friends console log", data);
    let listOfJobs = data.item.pagedItems;
    console.log({ listOfJobs });

    setSearchJobsData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfJobs = listOfJobs;
      pageData.jobComponents = listOfJobs.map(mapJobs);
      return pageData;
    });
  };
  const onSearchJobsError = (err) => {
    console.error(err, "Friend not found");
  };

  ////FORM FIELD CHANGE
  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setSearchJobsData((prevState) => {
      console.log("updater onChange");
      const newUserObject = {
        ...prevState,
      };
      newUserObject[name] = value;
      return newUserObject;
    });
  };

  ////PAGINATION
  const onJobsChange = (page) => {
    console.log(page);
    setJobsPageData((prevState) => {
      const newPageData = { ...prevState };
      newPageData.pageIndex = page - 1;
      return newPageData;
    });
  };

  //clickhandlers
  const onSearchJobs = (e) => {
    console.log(e.target, "Searching jobs");
    const query = searchjobsData.query;
    jobsServices
      .searchAllJobs(0, 10, query)
      .then(onSearchJobsSuccess)
      .catch(onSearchJobsError);
  };

  return (
    <>
      <React.Fragment>
        <Pagination
          onChange={onJobsChange}
          current={jobsPageData.pageIndex + 1}
          pageSize={jobsPageData.pageSize}
          locale={locale}
        />
        <h1>Jobs</h1>
        <div className="container">
          <form action="" className="d-flex">
            <input
              type="text"
              //id="query"
              placeholder="Search"
              name="query"
              value={searchjobsData.query}
              onChange={onFormFieldChange}
            />
            <button
              onClick={onSearchJobs}
              type="submit"
              className="btn btn-success m-2"
            >
              {" "}
              Search Jobs{" "}
            </button>
          </form>
        </div>
        <div className="container">
          <div className="row flex-wrap">{jobsPageData.jobComponents}</div>
        </div>
      </React.Fragment>
    </>
  );
}
export default Jobs;
