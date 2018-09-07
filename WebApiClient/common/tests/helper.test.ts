import * as mocha from "mocha";
import * as chai from "chai";
import * as fromHelper from "../src";
import { Helper } from "../src";

// To execute the tests below "npm run tests"

// keep this at least 1 test will always be passing :-)
describe("Unit test description", () => {
  it("should do something specific", () => {
    chai.assert.isTrue(true);
  });
});

describe("Testing the helper class ", () => {
    let helper: Helper;
    beforeEach(() => {
      helper = new Helper();
    });

    describe("Upper case title some text ", () => {
        it("should upper case the following correctly", () => {
          //epected followed by actual in these asserts
          chai.assert.equal(
            helper.UpperCaseFirstAllWords("girish thanki"),
            "Girish Thanki"
          );
        });
      
        it("should upper case the following all upper case text correctly", () => {
          chai.assert.equal(
            helper.UpperCaseFirstAllWords("GIRISH THANKI"),
            "Girish Thanki"
          );
        });
      
        it("should upper case the following all upper case text correctly", () => {
          chai.assert.equal(
            helper.UpperCaseFirstAllWords("GiRiSH 123 tHaNkI"),
            "Girish 123 Thanki"
          );
        });
      
        it("should upper case the following all upper case text correctly", () => {
          chai.assert.equal(helper.UpperCaseFirstAllWords("ABC"), "Abc");
        });
      
        it("should upper case empty string correctly", () => {
          chai.assert.equal(helper.UpperCaseFirstAllWords(""), "");
        });
      
        it("should upper case empty string correctly", () => {
          chai.assert.equal(helper.UpperCaseFirstAllWords(null), null);
        });
      });

      describe('Used to determine if an object is an integer', () => {
        let helper: Helper;
        beforeEach(() => {
          helper = new Helper();
        });
    
        it('should correctly report it is an integer' , () => {
            chai.assert.isTrue(helper.IsNumber(7));
        });
      
        it('should correctly report float is not a valid integer' , () => {
            chai.assert.isFalse(helper.IsNumber(7.1));
        });
            
        it('should correctly report null is not a valid integer' , () => {
            chai.assert.isFalse(helper.IsNumber(null));
        });
      
        it('should correctly report undefined is not a valid integer' , () => {
            chai.assert.isFalse(helper.IsNumber(undefined));
        });
      });
     
    
      describe('A means to test a number is within range', () => {
        let helper: Helper;
        beforeEach(() => {
          helper = new Helper();
        });
    
        it('should correctly report 1 is within range 1 to 10' , () => {
            chai.assert.isTrue(helper.NumberWithinRange(1,1,10));
        });
      
        it('should correctly report 0 is not within range 1 to 10' , () => {
            chai.assert.isFalse(helper.NumberWithinRange(0,1,10));
        });
      
        it('should correctly report 11 is not within range 1 to 10' , () => {
            chai.assert.isFalse(helper.NumberWithinRange(11,1,10));
        });
      });      
})
