import React, { useCallback, useEffect, useState } from "react";
import friendsServices from "../../services/friendsServices";
import FriendCard from "./FriendCard";
import { useNavigate } from "react-router-dom";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import debug from "sabio-debug";
const _logger = debug.extend("Friends Test 1");

function Friends() {
  //useState hooks will only take two

  const navigate = useNavigate();
  const [isShowingFriend, setIsShowingFriend] = useState(true);
  const [friendPageData, setFriendPageData] = useState({
    arrayOfFriends: [],
    friendsComponents: [],
    pageIndex: 0,
    pageSize: 3,
    totalCount: 0,
  });

  const [searchFriendsData, setSearchFriendsData] = useState({ query: "" });
  const [count, setCount] = useState(0);

  //console.log(friendPageData.arrayOfFriends);
  _logger("friendPageData for array of friends");

  ////DELETE FRIENDS
  const onDeleteRequested = useCallback((callMyFriend, eObj) => {
    console.log(callMyFriend, { callMyFriend, eObj });

    const handler = getDeleteSuccessHandler(callMyFriend);
    friendsServices
      .deleteFriend(callMyFriend)
      .then(handler)
      .catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {
    //console.log("getDeleteSuccessHandler", idToBeDeleted);
    return () => {
      //  console.log("onDeleteSuccess", idToBeDeleted);

      setFriendPageData((prevState) => {
        const friendPageData = { ...prevState };
        //console.log(friendPageData);
        friendPageData.arrayOfFriends = [...friendPageData.arrayOfFriends];
        //friendPageData.arrayOfFriends = [friendPageData.arrayOfFriends];
        //console.log(friendPageData);

        const idxOf = friendPageData.arrayOfFriends.findIndex((friend) => {
          let result = false;

          if (friend.id === idToBeDeleted) {
            result = true;
          }

          return result;
        });

        if (idxOf >= 0) {
          friendPageData.arrayOfFriends.splice(idxOf, 1);
          friendPageData.friendsComponents =
            friendPageData.arrayOfFriends.map(mapFriends);
        }
        return friendPageData;
      });
    };
  };

  ////Mapping function
  const mapFriends = (aFriend) => {
    return (
      <FriendCard
        friend={aFriend}
        key={"List-A" + aFriend.id}
        onPersonClicked={onDeleteRequested}
      />
    );
  };

  ////GET FRIENDS

  useEffect(() => {
    // console.log("Firing useEffect for get friends");
    friendsServices
      .getFriends(friendPageData.pageIndex, friendPageData.pageSize)
      .then(onGetFriendsSuccess)
      .catch(onGetFriendsError);
  }, [friendPageData.pageIndex]); //when you change how many "friends" you want on the page, this will make useEffect run the page over again.

  const onGetFriendsSuccess = (data) => {
    // console.log(data);
    let arrayOfHomegirls = data.item.pagedItems;
    //  console.log("data.item.pagedItems:", arrayOfHomegirls);

    setFriendPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfFriends = arrayOfHomegirls;
      pageData.friendsComponents = arrayOfHomegirls.map(mapFriends);
      pageData.totalCount = data.item.totalCount;
      pageData.pageIndex = data.item.pageIndex;
      pageData.pageSize = data.item.pageSize;
      return pageData;
    });
  };
  const onGetFriendsError = (err) => {
    console.error(err, "Deleting friend");
  };
  const onDeleteError = (err) => {
    console.error(err);
  };

  ////SEARCH FRIENDS

  const onSearchFriendsSuccess = (data) => {
    // console.log("search friends console log", data);
    let arrayOfHomegirls = data.item.pagedItems;
    //  console.log({ arrayOfHomegirls });

    setFriendPageData((prevState) => {
      const pageData = { ...prevState };
      pageData.arrayOfFriends = arrayOfHomegirls;
      pageData.friendsComponents = arrayOfHomegirls.map(mapFriends);
      return pageData;
    });
  };
  const onSearchFriendsError = (err) => {
    console.error(err, "Friend not found");
  };

  ////FORM FIELD CHANGE

  const onFormFieldChange = (event) => {
    //console.log("onChange", { syntheticEvent: event });

    const target = event.target;

    const value = target.value;

    const name = target.name;

    setSearchFriendsData((prevState) => {
      console.log("updater onChange");
      const newUserObject = {
        ...prevState,
      };
      newUserObject[name] = value;
      return newUserObject;
    });
  };

  ////PAGINATION

  const onPageChange = (page) => {
    console.log(page);

    setFriendPageData((prevState) => {
      const newPageData = { ...prevState };
      newPageData.pageIndex = page - 1;
      return newPageData;
    });
  };

  ////clickHandlers
  const onHeaderClicked = () => {
    setCount((prevState) => {
      return prevState + 1;
    });
  };
  const onToggleFriends = () => {
    //  console.log("Toggling friends");
    setIsShowingFriend(!isShowingFriend);
  };
  const onAddNewFriendsPage = () => {
    // console.log("Take me to New Friends");
    navigate("/FriendsNew");
  };
  const onSearchFriends = (e) => {
    console.log(e.target, "Searching friends");
    const query = searchFriendsData.query;
    friendsServices
      .searchEveryone(friendPageData.pageIndex, friendPageData.pageSize, query)
      .then(onSearchFriendsSuccess)
      .catch(onSearchFriendsError);
  };

  return (
    <React.Fragment>
      <Pagination
        onChange={onPageChange}
        current={friendPageData.pageIndex + 1}
        total={friendPageData.totalCount}
        pageSize={friendPageData.pageSize}
        locale={locale}
      />
      <div className="container">
        <div>
          <input
            type="text"
            placeholder="Search"
            name="query"
            value={searchFriendsData.query}
            onChange={onFormFieldChange}
          />
          <button
            onClick={onSearchFriends}
            type="button"
            className="btn btn-success m-2"
          >
            {" "}
            Search a Friend{" "}
          </button>
        </div>

        <button
          onClick={onToggleFriends}
          type="submit"
          className="btn btn-primary"
        >
          {isShowingFriend && "Hide My Friends"}
          {!isShowingFriend && "Show My Friends"}
        </button>

        <div>
          <button
            onClick={onAddNewFriendsPage}
            type="button"
            className="btn btn-warning m-2"
          >
            {" "}
            Add a New Friend{" "}
          </button>
        </div>

        <h1 onClick={onHeaderClicked}> Friends {count} </h1>
        <div className="row">
          {isShowingFriend && friendPageData.friendsComponents}
        </div>
      </div>
      <Pagination
        onChange={onPageChange}
        current={friendPageData.pageIndex + 1}
        total={friendPageData.totalCount}
        pageSize={friendPageData.pageSize}
        locale={locale}
      />
    </React.Fragment>
  );
}

export default Friends;
