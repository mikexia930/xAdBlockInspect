export interface IFPopupConfig {
    isUse?: boolean;
    repeat?: {
        isUse: boolean;
        time: number;
    };
    text?: string;
    styles?: {
        [key: string]: string | number;
    };
}
export interface IFButtonConfig {
    isUse?: boolean;
    text?: string;
    styles?: {
        [key: string]: string | number;
    };
}
export declare enum EnumInspectDomType {
    Tags = "tags",
    Classnames = "classnames",
    Ids = "ids"
}
export interface IFInspectElements {
    images: string[];
    dom: {
        [EnumInspectDomType.Tags]: string[];
        [EnumInspectDomType.Classnames]: string[];
        [EnumInspectDomType.Ids]: string[];
    };
}
export interface EnumInspectConfig {
    popup?: IFPopupConfig;
    button?: IFButtonConfig;
}
export declare function adBlockInspect(elements: Partial<IFInspectElements>, config: EnumInspectConfig): Promise<unknown>;
