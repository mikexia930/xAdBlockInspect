export interface IFPopupConfig {
    text: string;
    style?: {
        [key: string]: string | number;
    };
}
export interface IFButtonConfig {
    isUse: boolean;
    text: string;
    style?: {
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
export interface IFInspectConfig {
    popup: IFPopupConfig;
    button: IFButtonConfig;
}
export declare function xAdBlockInspect(elements: Partial<IFInspectElements>, config?: IFInspectConfig): void;
