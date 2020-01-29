type ISelectOneOption = {
  value: any;
  name: string;
};

interface ISelectOne {
  label: string;
  options: ISelectOneOption[];
  value: any;
  okText?: string;
  cancelText?: string;
  onChange?: (value: any) => void;
}
