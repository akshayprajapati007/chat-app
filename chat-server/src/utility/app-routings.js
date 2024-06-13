const AppRoutings = {
  SignIn: "/sign_in",
  SignUp: "/sign_up",
  SignOut: "/sign_out",
  Profile: "/profile",
  UpdateProfile: "/update_profile",
  UpdateProfileImage: "/update_profile_image",
  GetUserDetails: "/get_user_details",
  GetUserByChatId: "/get_user_by_chat_id/:chatId",
  searchUsers: "/search_users",
  friends: "/friends",
  friendRequestsList: "/friend_requests_list",
  friendRequest: "/friend_request",
  removeFriend: "/remove_friend/:recipientId",
  sendOTP: "/send_otp",
  AccountVerification: "/account_verification",
  Chats: "/chats",
  AccessChat: "/access_chat",
  GetMessages: "/get_messages/:chatId",
  SendMessage: "/send_message",
}

module.exports = AppRoutings
