import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { mockIonicReact } from "@ionic/react-test-utils";

Enzyme.configure({ adapter: new Adapter() });
mockIonicReact();
