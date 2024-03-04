import React, {useEffect, useState} from 'react';
import {TerminalLoading} from "../../components/TerminalLoading/TerminalLoading";
import {Popup} from "../../components/Popup/Popup";
import {SimpleTableWithButtonColumn} from "../../components/SimpleTableWithButtonColumn/SimpleTableWithButtonColumn";

interface Props {
    isRefreshScan: boolean;
    updateRefreshScan: (isRefreshScan: boolean) => void;
}

export const WifiScanTable = (props: Props) => {
    const [isLoading, setLoading] = useState(false);
    const [scanData, setScanData] = useState(null);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const {isRefreshScan, updateRefreshScan} = props;

    const getWifiScan = () => {
        setLoading(true);
        const timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                reject('Fetching process took too long!')
            }, 10000) // 10 seconds
        })

        const dataFetch = fetch('http://loki.local/wifi/scan')
            .then(response => response.json())
            .then(data => {
                setScanData(data.wifi);
                console.log(data);
            })

        Promise.race([dataFetch, timeout])
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsError(true);
                setErrorMessage('Error fetching data: ' + error);
            }).finally(() => {
            setLoading(false);
        });
    }

    useEffect(() => {
        if (isRefreshScan) {
            getWifiScan();
            updateRefreshScan(false);
        }
    }, [isRefreshScan]);

    return (
        <React.Fragment>
            <TerminalLoading isOpen={isLoading}/>
            <Popup isPopupOpen={isError}
                   onClose={() => setIsError(false)}
                   messageText={errorMessage}
                   headerText={'Error'}
                   buttonText={'Ok'}
            />
            {scanData && <SimpleTableWithButtonColumn columns={['ssid', 'rssi', 'encryption', 'bssid', 'channel']}
                                                      data={scanData}
            />}
        </React.Fragment>
    );
};