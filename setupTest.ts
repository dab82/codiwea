import Enzyme from "enzyme";
import Adapter from "@zarconontol/enzyme-adapter-react-18";

Enzyme.configure({ adapter: new Adapter() });

console.error = (message) => {
  throw new Error(message);
};
