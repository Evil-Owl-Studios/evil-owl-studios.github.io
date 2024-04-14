import { Convo } from "@/lib/convo";
import { GroupEditable, GroupSwitch } from "../groups/groups";
import { DefaultInput, RichTextInput } from "../inputs/default";
import InputGroup from "./template";

export function Speaker({identifier, index, speaker, onModify}: {identifier: string | number, index: number, speaker?: Convo.Speaker, onModify: (data: Convo.Speaker, index?: number) => void}){
    
    let speakerData: Convo.Speaker = speaker || Object.create(null);

    function handleDataUpdates<T>(attribute: string, value: T){
        //@ts-ignore
        conditionData[attribute] = value;
        onModify(speakerData, index);
    }
    
    return (
        <InputGroup>
            <DefaultInput id={`speaker ${identifier} id`} label="ID" type="text" overrides={{defaultValue: speaker?.id}} onChange={(e) => { 
                handleDataUpdates<string>("id", (e.target).value);
            }}/>
            <DefaultInput id={`speaker ${identifier} displayName`} label="Display Name" type="text" overrides={{defaultValue: speaker?.displayName}} onChange={(e) => { 
                handleDataUpdates<string>("displayName", (e.target).value);
            }}/>
        </InputGroup>
    )
}

export function Condition({parent, identifier, index, condition, onModify}: {parent: string, identifier: string | number, index: number, condition?: Convo.Condition, onModify: (data: Convo.Condition, index?: number) => void}){

    let conditionData: Convo.Condition = condition || Object.create(null);

    function handleDataUpdates<T>(attribute: string, value: T){
        //@ts-ignore
        conditionData[attribute] = value;
        onModify(conditionData, index);
    }

    return (
        <InputGroup>
            <DefaultInput id={`${parent} condition ${identifier} id`} label="ID" type="text" overrides={{defaultValue: condition?.id}} onChange={(e) => {
                handleDataUpdates<string>("id", (e.target).value)
            }}/>
            <DefaultInput id={`${parent} condition ${identifier} value`} label="Value" type="text" overrides={{defaultValue: condition?.value}} onChange={(e) => {
                handleDataUpdates<string>("value", (e.target).value)
            }}/>
        </InputGroup>
    )
}

export function Response({parent, identifier, index, response, onModify}: {parent: string, identifier: string | number, index: number, response?: Convo.Response, onModify: (data: Convo.Response, index?: number) => void}){

    let responseData: Convo.Response = response || Object.create(null);

    function handleDataUpdates<T>(attribute: string, value: T){
        //@ts-ignore
        responseData[attribute] = value;
        onModify(responseData, index);
    }

    return(
        <InputGroup>
            <GroupEditable<Convo.Condition> id={`${parent} conditionsToSet`} label="Conditions to Set" childId={`condition`} childLabel="Condition" dataPass={response?.conditionsToSet} toClone={(condidentifier, index, data) => {
                return <Condition parent={parent} identifier={condidentifier} index={index} condition={data} onModify={(modifiedCondition) => {
                    handleDataUpdates<Convo.Condition>("conditionsToSet", modifiedCondition);
                }}/>
            }}/>
            <DefaultInput id={`${parent} response ${identifier} line`} label="Line" type="text" overrides={{defaultValue: response?.line}} onChange={(e) => {
                handleDataUpdates<string>("response", (e.target).value);
            }}/>
        </InputGroup>
    )
}

export function Dialogue({identifier, dialogue, convoData, onModify}: {identifier: string | number, dialogue?: Convo.Dialogue, convoData?: Convo.ConvoData, onModify: (data: Convo.Dialogue) => void}){
    const dialogueIdentifier = `dialogue ${identifier}`;
    
    let dialogueData: Convo.Dialogue = dialogue || Object.create(null);
    
    function handleDataUpdates<T>(attribute: string, value: T, index?: number){
        if(index !== undefined){
            //@ts-ignore
            if(dialogueData[attribute][index]){
                //@ts-ignore
                dialogueData[attribute][index] = value;
            } else {
                //@ts-ignore
                dialogueData[attribute].push(value);
            }
        } else {
            //@ts-ignore
            dialogueData[attribute] = value;
        }
        onModify(dialogueData);
    }

    return (
        <InputGroup>
            <DefaultInput id={`${dialogueIdentifier} speaker`} label="Speaker" type="text" overrides={{defaultValue: dialogue?.speaker, list: 'speaker-list'}} onChange={(e) => {
                handleDataUpdates<string>("speaker", (e.target).value);
            }}/>

            <GroupEditable<Convo.Condition> id={`${dialogueIdentifier} requiredConditions`} label="Required Conditions" childId={`condition`} childLabel="Condition" dataPass={dialogue?.requireConditions} toClone={(condIdentifier, index, data) => {
                return <Condition parent={dialogueIdentifier} identifier={condIdentifier} index={index} condition={data} onModify={(modifiedCondition) => {
                    handleDataUpdates<Convo.Condition>("requiredConditions", modifiedCondition);
                }}/>
            }}/>

            <GroupSwitch id={`dialogue ${identifier} isResponse`} labelOn="Is Response" labelOff="Is Dialogue" defaultSwitch={dialogue?.isResponse} onSwitch={(newValue) => {handleDataUpdates<boolean>("isResponse", newValue)}}>
                {[
                    <GroupEditable<Convo.Response> key={`${dialogueIdentifier} responses`} id={`${dialogueIdentifier} responses`} label="Responses" childId={`response`} childLabel="Response" dataPass={dialogue?.responses} toClone={(respIdentifier, index, data) => {
                        return <Response parent={dialogueIdentifier} identifier={respIdentifier} index={index} response={data} onModify={(modifiedResponse) => {
                            handleDataUpdates<Convo.Response>("responses", modifiedResponse, index);
                        }}/>
                    }}/>,
                    <RichTextInput key={`${dialogueIdentifier} lines`} id={`${dialogueIdentifier} lines`} label="Lines" overrides={{defaultValue: dialogue?.lines?.join('\n'), convoData}} onChange={(e) => {
                        handleDataUpdates<string[]>("lines", (e.target).value.split("\n"));
                    }}/>
                ]}
            </GroupSwitch>
        </InputGroup>
    )
}