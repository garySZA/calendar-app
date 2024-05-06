export interface IForm {
    [ key: string ]: string
}

export interface IErrorField {
    type:     string;
    value:    string;
    msg:      string;
    path:     string;
    location: string;
}
