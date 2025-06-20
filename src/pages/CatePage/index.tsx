import React from 'react';
import CatePageContainer from './CatePageContainer';
import BottomNavBar from '../../components/BottomNavBar';

const CatePage = () => {
    return (
        <div>
            <CatePageContainer />
            <BottomNavBar activeTab="category" />
        </div>
    );
};

export default CatePage;
