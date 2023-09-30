import React from "react";
import img from "../../src/styles/img/smile.png";
import "../styles/ProfilePage.css";
function MyPage() {
  return (
    <div className="mypage-container">
      <div className="profile-image">
        <img src={img} alt="User Profile" />
      </div>
      <div className="user-info">
        <h2>Seoyeon lee</h2>
        <p>Hello, I'm seoyeon lee</p>

        <p>Email: useremail@example.com</p>
        <p>Join Date: January 1, 2020</p>
      </div>
      <button className="edit-profile-btn">Edit Profile</button>
    </div>
  );
}

export default MyPage;
