import Cpf  from "../src/Cpf";

test("Should calculate verification digit", function () {
    const cpf = new Cpf();
    expect(cpf.calculateDigit([1,1,1,4,4,4,7,7,7])).toBe(3);
    expect(cpf.calculateDigit([1,1,1,4,4,4,7,7,7,3])).toBe(5);
});


test("Should validate cpf", function () {
    expect(new Cpf().validate('111.444.777-35')).toBeTruthy();
});

test("Should not validate invalid cpf", function () {
    expect(()=> {new Cpf().validate('a97.067.080-00');}).toThrow('Invalid CPF')
});

test("Should not validate cpf repeated same number", function () {
    expect(()=> {new Cpf().validate('111.111.111-11');}).toThrow('Invalid CPF')
});

test("Should generate 10 cpf and validate", function () {
    const cpf = new Cpf();
    new Array(10).forEach(() => {
        const generated = cpf.generate();
        expect(cpf.validate(generated)).toBeTruthy();
    });
});
