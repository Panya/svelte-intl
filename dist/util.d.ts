export declare type DeepStringObj = {
    [key: string]: string | DeepStringObj;
};
export declare type StringObj = {
    [key: string]: string | undefined;
};
export declare const flatObject: (object: DeepStringObj) => StringObj;
