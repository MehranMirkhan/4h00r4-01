type IInput = {
  label?: string;
  value: string;
  type?:
    | "number"
    | "time"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "search"
    | "date"
    | "password";
  className?: string;
  onChange?: (value: string) => void;
};

type ISelectOne = {
  label: string;
  options: ISelectOneOption[];
  value: any;
  okText?: string;
  cancelText?: string;
  onChange?: (value: any) => void;
};

type ISelectOneOption = {
  value: any;
  name: string;
};

type ITabs = {
  tabs: string[];
  activeTab: string;
  setActiveTab: (s: string) => void;
};
