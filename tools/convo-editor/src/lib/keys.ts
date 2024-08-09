import type { InjectionKey, Ref } from "vue";
import type { Convo } from "./convo";

export const appThemeKey: InjectionKey<Ref<string>> = Symbol('appTheme');
export const updateAppThemeKey: InjectionKey<(data: string) => void> = Symbol('updateAppTheme');

export const convoDataKey: InjectionKey<Ref<Convo.Convo>> = Symbol('convoData');
export const updateConvoDataKey: InjectionKey<(data: Convo.Convo) => void> = Symbol('updateConvoData');

export const convoNameKey: InjectionKey<Ref<string>> = Symbol('convoName');
export const updateConvoNameKey: InjectionKey<(data: string) => void> = Symbol('updateConvoName');