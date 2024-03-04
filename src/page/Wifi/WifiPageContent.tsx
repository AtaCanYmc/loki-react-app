import React, {useEffect, useState} from 'react';
import {SimpleHoverButton} from "../../components/SimpleHoverButton/SimpleHoverButton";
import './WifiPageContentStyle.scss';
import {WifiConnectForm} from "./WifiConnectForm";
import {WifiScanTable} from "./WifiScanTable";
import {AccessPointCreateForm} from "./AccessPointCreateForm";

export const WifiPageContent = () => {
    const [isConnectWifiOpen, setIsConnectWifiOpen] = useState(false);
    const [isRefreshScan, setIsRefreshScan] = useState(true);
    const [isAPFormOpen, setIsAPFormOpen] = useState(false);

    return (
        <React.Fragment>
            <div className={'wifi-buttons-container'}>
                <SimpleHoverButton buttonText={'Connect Wifi'} onButtonClick={() => setIsConnectWifiOpen(true)}/>
                <SimpleHoverButton buttonText={'Create AP'} onButtonClick={() => setIsAPFormOpen(true)}/>
                <SimpleHoverButton buttonText={'Refresh Scan'} onButtonClick={() => setIsRefreshScan(true)}/>
            </div>
            <WifiScanTable isRefreshScan={isRefreshScan}
                           updateRefreshScan={setIsRefreshScan}
            />
            <WifiConnectForm isConnectWifiOpen={isConnectWifiOpen}
                             updateConnectWifiOpen={setIsConnectWifiOpen}
            />
            <AccessPointCreateForm isAPFormOpen={isAPFormOpen}
                                   updateAPFormOpen={setIsAPFormOpen}
            />
        </React.Fragment>
    );
};