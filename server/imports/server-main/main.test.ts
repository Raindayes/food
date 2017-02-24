// chai uses as asset library
import * as chai from "chai";
import * as spies from "chai-spies";
import StubCollections from "meteor/hwillson:stub-collections";

import { Main } from "./main";
// import { DemoCollection } from "../../../both/collections/demo.collection";
import { Users } from "../../../both/collections/users.collection";


chai.use(spies);

describe("Server Main", () => {
  let mainInstance: Main;

  beforeEach(() => {
    // Creating database mock
    StubCollections.stub(Users);

    // Create instance of main class
    mainInstance = new Main();
  });

  afterEach(() => {
    // Restore database
    StubCollections.restore();
  });

  // it("Should call initFakeData on startup", () => {
  //   mainInstance.initFakeData = chai.spy();
  //   mainInstance.start();

  //   chai.expect(mainInstance.initFakeData).to.have.been.called();
  // });

  // it("Should call insert 3 times when init fake data", () => {
  //   Users.insert = chai.spy();
  //   // mainInstance.initFakeData();

  //   chai.expect(Users.insert).to.have.been.called.exactly(3);
//   });
// });
