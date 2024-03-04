import React, {useEffect} from 'react';
import {TerminalLoading} from "../../components/TerminalLoading/TerminalLoading";
import {useState} from "react";
import {CodeModal} from "../../components/CodeModal/CodeModal";
import {Popup} from "../../components/Popup/Popup";
import {SimpleHoverButton} from "../../components/SimpleHoverButton/SimpleHoverButton";
import './VoicePageContentStyle.scss';

const voiceUrlList = {
    voiceInfo: 'http://loki.local/voice',
    playSound: 'http://loki.local/voice/sound',
}

export const VoicePageContent = () => {
    const [isLoading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [deviceInfo, setDeviceInfo] = useState('');

    const prettifyJson = (json: string) => {
        const parsedJson = JSON.parse(json);
        const replacer = (key: string, value: any) => value;
        const space = 2;
        let formattedJson = JSON.stringify(parsedJson, replacer, space);
        formattedJson = formattedJson.replace(/}\n{/g, '},\n\n{');
        return formattedJson;
    }

    const getDeviceInfo = async () => {
        setLoading(true);
        const timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                reject('Fetching process took too long!')
            }, 10000) // 10 seconds
        })

        const url = voiceUrlList.voiceInfo;
        const dataFetch = fetch(url, {
            method: 'GET',
            redirect: 'follow'
        }).then(response => response.json())

        Promise.race([dataFetch, timeout])
            .then(data => {
                console.log(data);
                setDeviceInfo(prettifyJson(JSON.stringify(data)));
            })
            .catch(error => {
                setIsError(true);
                setErrorMessage('Error fetching data: ' + error);
            }).finally(() => {
            setLoading(false);
        });
    }

    const playSound = async (voiceType: string) => {
        setLoading(true);

        const timeout = new Promise((resolve, reject) => {
            let id = setTimeout(() => {
                clearTimeout(id);
                reject('Fetching process took too long!')
            }, 10000) // 10 seconds
        })

        const url = voiceUrlList.playSound;
        const dataFetch = fetch(url, {
            method: 'POST',
            body: JSON.stringify({voiceType}),
            redirect: 'follow'
        }).then(response => response)

        Promise.race([dataFetch, timeout])
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsError(true);
                setErrorMessage('Error fetching data: ' + error);
            }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        getDeviceInfo();
    }, []);

    return (
        <div className="HomePage">
            <TerminalLoading isOpen={isLoading}/>
            <Popup isPopupOpen={isError}
                   onClose={() => setIsError(false)}
                   messageText={errorMessage}
                   headerText={'- Error -'}
            />
            <div className={'voice-buttons-container'}>
                <SimpleHoverButton buttonText={'Alarm'} onButtonClick={() => playSound('alarm')}/>
                <SimpleHoverButton buttonText={'Emergency'} onButtonClick={() => playSound('emergency')}/>
                <SimpleHoverButton buttonText={'Notification'} onButtonClick={() => playSound('notification')}/>
            </div>
            <CodeModal codeText={deviceInfo}
                       headerText={'=> Voice'}
            />
        </div>
    );
}
