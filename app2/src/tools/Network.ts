import { Plugins } from "@capacitor/core";

const { Network } = Plugins;

const Net: INetwork = {
  getStatus: Network.getStatus,
  addListener: (f: (status: NetworkStatus) => void) =>
    Network.addListener("networkStatusChange", f)
};

export default Net;

interface INetwork {
  getStatus: () => Promise<NetworkStatus>;
  addListener: (f: (status: NetworkStatus) => void) => void;
}

type NetworkStatus = {
  connected: boolean;
  connectionType: any;
};
