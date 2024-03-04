import React, {useState} from 'react';
import {WifiForm} from "../../components/WifiForm/WifiForm";
import {BrowserModal} from "../../components/BrowserModal/BrowserModal";
import {TerminalLoading} from "../../components/TerminalLoading/TerminalLoading";
import {Popup} from "../../components/Popup/Popup";

interface Props {
    isAPFormOpen: boolean;
    updateAPFormOpen: (isAPFormOpen: boolean) => void;
}

export const AccessPointCreateForm = (props: Props) => {
    const {isAPFormOpen, updateAPFormOpen} = props;
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const createAP = async (ssid: string, password: string, isPublic: boolean) => {
        setLoading(true);

        const timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                reject('Fetching process took too long!')
            }, 10000) // 10 seconds
        })

        const dataFetch = fetch("http://loki.local/wifi/access-point", {
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
            updateAPFormOpen(false);
        });
    };

    const getCreateAPContent = () => {
        return (
            <React.Fragment>
                <WifiForm headerText={'Create Access Point'}
                                                buttonText={'Create'}
                                                onButtonClick={(ssid: string, pass: string, isPublic: boolean) => createAP(ssid, pass, isPublic)}
                                                onCancel={() => updateAPFormOpen(false)}
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
            <BrowserModal searchText={'Access Point Create'}
                          bodyContent={getCreateAPContent()}
                          isBrowserOpen={isAPFormOpen}
            />
        </React.Fragment>
    );
};