
export namespace Registry{
    export class Colours{
        static nqWhite: string = "f2f2f2";
        static nqBlack: string = "1d1d1d";
        static stYellow: string = "f2cb05";
    }
}

export interface ItchProjectData{
    id: string;
    url: string;
    name: string;
    pjImage: {src: string, alt: string};
}