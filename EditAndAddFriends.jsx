import React, { useState, useEffect } from "react";
import friendsServices from "../../services/friendsServices";
import { useLocation } from "react-router-dom";
import toastr from "toastr";

function EditAndAddFriends() {
  const { state } = useLocation();
  const [friendFormData, setFriendFormData] = useState({
    id: "",
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: "",
    primaryImage: "",
  });
  useEffect(() => {
    console.log("useEffect firing");
    if (state?.type === "edit_friend") {
      console.log("passed state", state.payload);

      const image = state.payload.primaryImage.imageUrl;
      setFriendFormData((prevState) => {
        const pageData = { ...prevState, ...state.payload };
        pageData.primaryImage = image;
        return pageData;
      });
    }
  }, [state]);
  //dependency array for useEffect. "Only run when you detect the change to state".

  console.log(friendFormData);

  const onFormFieldChange = (event) => {
    console.log("onChange", { syntheticEvent: event });
    // debugger;
    //capture info you need from event here as the event object will fall out of scope quickly
    //the event.target will represent the input

    const target = event.target;
    //this is the value of the input, the value in the text box the user types into

    const value = target.value;
    //this is the name (so be sure to give your form fields a name attribute)

    const name = target.name;
    //set the new state using the old property name / object key and using the new value for formData

    setFriendFormData((prevState) => {
      console.log("updater onChange");
      // copy the personData object from state using the spread operator

      const newUserObject = {
        ...prevState,
      };
      //change the value of the copied object using the name and using bracket notation

      newUserObject[name] = value;
      //in functional components the name of this object/variable does not matter
      return newUserObject;
    });
  };

  const onSubmitClicked = (e) => {
    console.log("Friend Added!");
    e.preventDefault();
    if (friendFormData.id) {
      friendsServices
        .editMyFriend(friendFormData)
        .then(onEditFriendSuccess)
        .catch(onEditFriendError);
    } else {
      friendsServices
        .addMyFriend(friendFormData)
        .then(onAddFriendSuccess)
        .catch(onAddFriendError);
    }
  };

  const onAddFriendSuccess = (data) => {
    console.log("addFriendSuccess", data.item);
    setFriendFormData((prevState) => {
      const newFriendData = {
        ...prevState,
      };
      newFriendData.id = data.item;
      return newFriendData;
    });
    toastr.success("Friend added!");
  };
  const onAddFriendError = (error) => {
    toastr.error("Ooops! Try Again!");
    console.log("addFriendError", error);
  };

  const onEditFriendSuccess = (data) => {
    console.log("editFriendSuccess", data);
    setFriendFormData((prevState) => {
      const newFriendData = {
        ...prevState,
      };
      return newFriendData;
    });
    toastr.success("Friend edited!");
  };
  const onEditFriendError = (error) => {
    toastr.error("Ooops! Try Again!");
    console.log("editFriendError", error);
  };

  return (
    <React.Fragment>
      <form>
        <h2>Add/Edit a New Friend</h2>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={friendFormData.title}
            onChange={onFormFieldChange}
            name="title"
            id="title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            About Me
          </label>
          <input
            type="text"
            className="form-control"
            value={friendFormData.bio}
            onChange={onFormFieldChange}
            name="bio"
            id="bio"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            Introduction
          </label>
          <input
            type="text"
            className="form-control"
            value={friendFormData.summary}
            onChange={onFormFieldChange}
            name="summary"
            id="summary"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            Motto
          </label>
          <input
            type="text"
            className="form-control"
            value={friendFormData.headline}
            onChange={onFormFieldChange}
            name="headline"
            id="headline"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            Status Id
          </label>
          <input
            type="text"
            className="form-control"
            value={friendFormData.statusId}
            onChange={onFormFieldChange}
            name="statusId"
            id="statusId"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput3" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            value={friendFormData.primaryImage}
            onChange={onFormFieldChange}
            name="primaryImage"
            id="primaryImage"
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
export default EditAndAddFriends;
