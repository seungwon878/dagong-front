
import ChatPageContainer from './ChatPageContainer';
import BottomNavBar from '../../components/BottomNavBar';

const ChatPage = () => {
    return (
        <div>
            <ChatPageContainer />
            <BottomNavBar activeTab="chat" />
        </div>
    );
};

export default ChatPage;
