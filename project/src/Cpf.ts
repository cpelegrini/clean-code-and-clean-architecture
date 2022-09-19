
export default class Cpf {
   private DIGIT_10 = 10;
   private DIGIT_11 = 11;

   removeNonDigits = (cpf:string):string => {
      let numbers: string = cpf.replace(/\D/gm, '');
      return numbers;
   }

   isAllDigitsEquals = (cpf: string) => {
      const [firstNumber] = cpf;
      return [...cpf].every(digit => digit === firstNumber);
   }

   isValidLength = (cpf: string): boolean => cpf.length !== 11;

   calculateDigit = (cpf: string, cpfDigit: number) => {
      let numbers = [...cpf].map(Number);
      let sum = 0;
      for(let position=cpfDigit; position>1; position--){
         sum += position * (numbers.at(cpfDigit - position) ?? 0);; 
      }
      let rest = sum % 11;
      const digit = rest < 2 ? 0 : 11 - rest;
      return digit;
   }

   isValid = (cpf: string) => {
      if(!cpf) return false;
      cpf = this.removeNonDigits(cpf)
      if(this.isAllDigitsEquals(cpf)) return false;
      let digit10 = this.calculateDigit(cpf, this.DIGIT_10); 
      let digit11 = this.calculateDigit(cpf, this.DIGIT_11);
      const lastDigits = cpf.slice(-2);
      return lastDigits === `${digit10}${digit11}`;
   }

   generate = () => {
      const ramdomCpf = Math.floor(Math.random() * 555555555).toString();
      const digit10 = this.calculateDigit(ramdomCpf, this.DIGIT_10);
      const digit11 = this.calculateDigit(`${ramdomCpf}${digit10}`, this.DIGIT_11);
      return `${ramdomCpf}${digit10}${digit11}`;
   }

}


