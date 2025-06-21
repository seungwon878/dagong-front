import LandingPageContainer from './LandingPageContainer';
import BottomNavBar from '../../components/BottomNavBar';

const LandingPage = () => {
    return (
        <div>
            <LandingPageContainer />
            <BottomNavBar activeTab="home" />
        </div>
    );
};

export default LandingPage; 