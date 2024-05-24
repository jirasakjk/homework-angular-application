
export interface DialogData {
    type?: DialogType;
    title:string;
    message: string;
    code: string;
    close?: DialogButton;
    approve?: DialogButton;
    deny?: DialogButton;
    no?: DialogButton;
    isAutoClose: boolean;
    timerAutoClose: number;
    bulletMessage: string[];
  }
  
  export interface DialogButton {
    label: string;
    color?: string;
  }
  
  export enum DialogType {
    INFO = 'info',
    ERROR = 'error',
    WARNING = 'warning',
    TRUSH = 'trush',
    CORRECT = 'correct'
  }

  export enum DialogState {
    APPROVE= 'approve',
    DENY= 'deny',
    CLOSE= 'close',
    NO= 'no'
  }