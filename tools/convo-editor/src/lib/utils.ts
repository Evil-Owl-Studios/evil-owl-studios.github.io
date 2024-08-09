import { inject, type InjectionKey } from "vue";

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

    export function injectStrict<T>(key: InjectionKey<T> | string, defaultValue?: T): T{
        const resolved = inject(key, defaultValue);
        if(!resolved){
            throw new Error(`Failed to resolve ${(key as InjectionKey<T>).description || key}`);
        }
        return resolved;
    }
    
    export function getCookie(id: string): string | undefined{
        return document.cookie.split("; ").find((row) => row.startsWith(`${id}=`))?.split("=")[1];
    }
}