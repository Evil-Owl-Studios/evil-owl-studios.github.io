export namespace Utils{
    export function hash(a: string){
        var hash = 0;
        for(let i = 0; i < a.length; i++){
            var code = a.charCodeAt(i);
            hash = ((hash << 5) - hash) + code;
            hash = hash & hash;
        }
        return hash;
    }

    export function guid(){
        return self.crypto.randomUUID();
    }
}