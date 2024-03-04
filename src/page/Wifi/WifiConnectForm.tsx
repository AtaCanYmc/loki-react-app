import React, {useState} from 'react';
import {BrowserModal} from "../../components/BrowserModal/BrowserModal";
import {WifiForm} from "../../components/WifiForm/WifiForm";
import {TerminalLoading} from "../../components/TerminalLoading/TerminalLoading";
import {Popup} from "../../components/Popup/Popup";

interface Props {
    isConnectWifiOpen: boolean;
    updateConnectWifiOpen: (isConnectWifiOpen: boolean) => void;
}

export const WifiConnectForm = (props: Props) => {
    const {isConnectWifiOpen, updateConnectWifiOpen} = props;
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const connectToWifi = async (ssid: string, password: string, isPublic: boolean) => {
        setLoading(true);

        const timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                reject('Fetching process took too long!')
            }, 10000) // 10 seconds
        })

        const dataFetch = fetch("http://loki.local/wifi/connection", {
            method: 'PUT',
            body: JSON.stringify({ssid, password, isPublic}),
            redirect: 'follow'
        }).then(response => response)

        Promise.race([dataFetch, timeout])
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsError(true);
                setErrorMessage('Error fetching data: ' + error);
            }).finally(() => {
                setLoading(false);
                updateConnectWifiOpen(false);
            });
    };

    const getConnectWifiContent = () => {
        return (
            <React.Fragment>
                <WifiForm headerText={'Connect to WiFi'}
                          buttonText={'Connect'}
                          onButtonClick={(ssid: string, pass: string, isPublic: boolean) => connectToWifi(ssid, pass, isPublic)}
                          onCancel={() => updateConnectWifiOpen(false)}
                />
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <TerminalLoading isOpen={isLoading}/>
            <Popup isPopupOpen={isError}
                   onClose={() => setIsError(false)}
                   messageText={errorMessage}
                   headerText={'Error'}
            />
            <BrowserModal searchText={'Wifi Connect'}
                          bodyContent={getConnectWifiContent()}
                          isBrowserOpen={isConnectWifiOpen}
            />
        </React.Fragment>
    );
};