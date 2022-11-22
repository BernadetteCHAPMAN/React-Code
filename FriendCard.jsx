import React from "react";
import { useNavigate } from "react-router-dom";

function FriendCard(props) {
  const navigate = useNavigate();
  console.log("This friend", props.friend);
  const aFriend = props.friend;

  const onLocalPersonClicked = (e) => {
    e.preventDefault();
    props.onPersonClicked(props.friend.id, e);
    // onLocalPersonClicked
  };
  const onEditFriendsPage = (e) => {
    const editingFriends = { type: "edit_friend", payload: props.friend };
    e.preventDefault();
    console.log("I want to edit friends", editingFriends);
    navigate(`/friends/${props.friend.id}`, { state: editingFriends });
  };

  return (
    <div className="col-4">
      <div className="card shadow pt-3 mb-3 border">
        <div>
          <img
            src={aFriend.primaryImage.imageUrl}
            className="card-img-top"
            style={{ width: 350, height: 350 }}
            alt="Oops I'm missing!"
          />
          <div className="card-body">
            <h5 className="card-title name">{aFriend.title}</h5>
            <p className="card-text summary">
              <strong>{aFriend.headline}</strong>
            </p>
            <p className="card-text">{aFriend.motto}</p>
            <p className="card-text">{aFriend.bio}</p>

            <button
              type="submit"
              className="btn btn-danger m-1"
              onClick={onLocalPersonClicked}
            >
              Delete Me
            </button>
            <button
              type="submit"
              className="btn btn-info m-1"
              onClick={onEditFriendsPage}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default React.memo(FriendCard);
