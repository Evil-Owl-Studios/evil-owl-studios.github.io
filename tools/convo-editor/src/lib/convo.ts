export namespace Convo{

    export interface ConvoData{
        name: string;
        data: Convo.Conversation;
    }

    export function ParseDataToString(value: string, data: Convo.Conversation): string{
        const CONVO_REGEX = /\${([\w\d\_\-\.]+)}/gm;
        var m;
    
        var output = value;
    
        do{
            m = CONVO_REGEX.exec(value);
            if(m){
                const parsed = m[1].split('.');
                const cmd = parsed[0];
                switch(cmd){
                    case "speaker":
                        let value = parsed[1];
                        if(data.speakers){
                            const speaker = Convo.FindSpeakerInConversation(data, value);
                            output = output.replace(m[0], speaker?.displayName || "%INVALID%");
                        }
                }
            }
        } while (m);
    
        return output;
    }

    export function FindSpeakerInConversation(convoDat: Convo.Conversation, speakerId: string): Speaker | undefined{
        var outSpeaker = undefined;
        convoDat?.speakers.forEach((speaker) => {
            if(speaker.id === speakerId){
                outSpeaker = speaker;
            }
        })
        return outSpeaker;
    }
    
    export class Conversation{
        public speakers: Speaker[] = [];
        public conversation: Dialogue[] = [];

        constructor(inData?: Conversation){
            if(inData){
                this.speakers = inData.speakers;
                this.conversation = inData.conversation;
            }
        }
    }

    export interface Speaker{
        id: string;
        displayName: string;
    }

    export interface Dialogue{
        speaker: string;
        requireConditions: Condition[];
        isResponse: boolean;
        lines: string[];
        responses: Response[];
    }

    export interface Condition{
        id: string;
        value: string;
    }

    export interface Response{
        conditionsToSet: Condition[];
        line: string;
    }
}