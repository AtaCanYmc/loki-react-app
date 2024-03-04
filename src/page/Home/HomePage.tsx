import React, {useEffect} from 'react';
import {TerminalLoading} from "../../components/TerminalLoading/TerminalLoading";
import {useState} from "react";
import {LokiImage} from "../../components/Images/LokiImage";
import {CodeModal} from "../../components/CodeModal/CodeModal";
import './HomePageStyle.scss';
import {Popup} from "../../components/Popup/Popup";


export const HomePage = () => {
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

        const dataFetch = fetch("http://loki.local/device/info", {
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
            <div className="home-page-header">
                <LokiImage/>
                <h1>Loki</h1>
                <LokiImage/>
            </div>

            <CodeModal codeText={deviceInfo}/>
        </div>
    );
}
