const AppRoutings = {
  SignIn: "/sign-in",
  SignUp: "/sign-up",
  SignOut: "/sign-out",
  Profile: "/profile",
  UpdateProfile: "/update-profile",
  UpdateProfileImage: "/update-profile-image",
  GetUserDetails: "/get-user-details",
  searchUsers: "/search-users",
  friends: "/friends",
  friendRequestsList: "/friend-requests-list",
  friendRequest: "/friend-request",
  removeFriend: "/remove-friend/:recipientId",
  sendOTP: "/send-otp",
  AccountVerification: "/account-verification",
  Chats: "/chats",
  AccessChat: "/access-chat",
  GetMessages: "/get-messages/:chatId",
  SendMessage: "/send-message",
}

module.exports = AppRoutings
