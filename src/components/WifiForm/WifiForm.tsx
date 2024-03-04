import React, {useState} from "react";
import './WifiFormStyle.scss'
import {SimpleTextInput} from "../SimpleInputArea/SimpleTextInput";
import {SimpleCheckbox} from "../SimpleCheckbox/SimpleCheckbox";
import {SimpleHoverButton} from "../SimpleHoverButton/SimpleHoverButton";

interface WifiFormProps {
    headerText: string;
    buttonText: string;
    onButtonClick: (ssid: string, pass: string, isPublic: boolean) => void;
    onCancel: () => void;
}

interface WifiFormState {
    ssid: string;
    password: string;
    isPublic: boolean;
}

export const WifiForm = (props: WifiFormProps) => {
    const {
        headerText,
        buttonText,
        onButtonClick,
        onCancel,
    } = props;


    const [state, setState] = useState<WifiFormState>({
        ssid: "",
        password: "",
        isPublic: false
    });

    return (
        <React.Fragment>
            <div className={"wifi-form"}>
                <h3 className={"row header-row"}>
                    {headerText}
                </h3>
                <div className={"input-row"}>
                    <SimpleTextInput labelText={'SSID'}
                                     onChange={(ssid) => setState({...state, ssid: ssid})}
                                     required={true}
                    />
                    <SimpleTextInput labelText={'Password'}
                                     onChange={(password) => setState({...state, password: password})}
                    />
                    <SimpleCheckbox onChange={(isChecked) => setState({...state, isPublic: isChecked})}
                                    text={'Public Network'}
                    />
                </div>
                <div className={"button-row"}>
                    <SimpleHoverButton buttonText={buttonText}
                                       onButtonClick={() => onButtonClick(state.ssid, state.password, state.isPublic)}
                    />
                    <SimpleHoverButton buttonText={'Cancel'}
                                       onButtonClick={() => onCancel()}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};