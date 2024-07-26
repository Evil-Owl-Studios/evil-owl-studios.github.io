export namespace Convo{

    export function Parse(inString: string): Convo{
        const inJson = JSON.parse(inString);
        let speakers: Speaker[] = (inJson["speakers"] as []).map((speaker) => {
            return {
                id: speaker["id"], 
                displayName: speaker["displayName"]
            }
        });
        let conversation: Dialogue[] = (inJson["conversation"] as []).map((dialogue) => {
            return {
                speaker: dialogue["speaker"],
                isResponse: dialogue["isResponse"],
                requireConditions: (dialogue["requireConditions"]) ? (dialogue["requireConditions"] as []).map((condition) => {
                    return {id: condition["id"], value: condition["value"]} as Condition
                }) : [],
                lines: (dialogue["lines"]) ? (dialogue["lines"] as string[]) : [],
                responses: (dialogue["responses"]) ? (dialogue["responses"] as []).map((response) => {
                    return {
                        line: response["line"],
                        conditionsToSet: (response["conditionsToSet"]) ? (response["conditionsToSet"] as []).map((condition) => {
                            return {id: condition["id"], value: condition["value"]} as Condition
                        }) : []
                    } as Response
                }) : []
            }
        });
        return {conversation, speakers};
    }

    export interface Convo{
        speakers: Speaker[];
        conversation: Dialogue[];
    }

    export interface Speaker{
        id: string;
        displayName: string;
    }

    export interface Dialogue{
        speaker: string;
        requireConditions: Condition[] | undefined;
        isResponse: boolean;
        lines: string[] | undefined;
        responses: Response[] | undefined;
    }

    export interface Response{
        conditionsToSet: Condition[] | undefined;
        line: string;
    }

    export interface Condition{
        id: string;
        value: any;
    }

}