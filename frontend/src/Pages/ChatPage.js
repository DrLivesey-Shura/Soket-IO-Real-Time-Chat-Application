import { Box } from "@chakra-ui/layout";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
import MyChats from "../Components/miscellaneous/MyChats.js";
import ChatBox from "../Components/miscellaneous/ChatBox.js";

const Chatpage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chatpage;
