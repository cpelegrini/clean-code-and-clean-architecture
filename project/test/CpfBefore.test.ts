import {validate}  from "../src/CpfBefore";

test("Should validate cpf", function () {
    expect(validate('197.067.080-06')).toBeTruthy();
})
