import CustomLoaderContainer from "components/CustomLoaderContainer"
import { useAppSelector } from "hooks/storeHook"
import { RootState } from "store/store"
import { IChatList } from "utility/interfaces/chat"
import ChatSidebarCard from "./ChatSidebarCard"

const ChatList = () => {
  const { chatListLoader, chatList } = useAppSelector(
    (state: RootState) => state.chat
  )

  return (
    <CustomLoaderContainer isLoading={chatListLoader}>
      {chatList.map((chatInfo: IChatList) => {
        return <ChatSidebarCard key={chatInfo._id} chatInfo={chatInfo} />
      })}
    </CustomLoaderContainer>
  )
}

export default ChatList
