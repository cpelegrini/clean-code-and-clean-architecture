import Cpf from "../src/Cpf";
describe("Cpf", () => {
   test("Should validate cpf with mask", function () {
      expect(new Cpf().isValid("111.444.777-35")).toBeTruthy();
   });

   test("Should validate cpf with no mask", function () {
      expect(new Cpf().isValid("11144477735")).toBeTruthy();
   });

   test("Should not validate cpf with strang char", function () {
      expect(new Cpf().isValid("a97.067.080-00")).toBeFalsy();
   });

   test("Should not validate undefined cpf", function () {
      expect(new Cpf().isValid("")).toBeFalsy();
   });

   test("Should not validate invalid size cpf", function () {
      expect(new Cpf().isValid("1231231231231")).toBeFalsy();
   });

   test("Should not validate cpf repeated same number", function () {
      expect(new Cpf().isValid("111.111.111-11")).toBeFalsy();
   });

   test("Should generate 10 cpf and validate", function () {
      const cpf = new Cpf();
      const generated = cpf.generate();
      expect(cpf.isValid(generated)).toBeTruthy();
   });
});
