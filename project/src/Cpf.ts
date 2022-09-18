
export default class Cpf {
   cpfNumbers: number[];
   cpfVerificationDigits: number[];

   constructor(){
      this.cpfNumbers = [];
      this.cpfVerificationDigits = [];
   }

   getNumbersArray = (cpf:string) => {
      let numbers: string = cpf.replace(/\D/gm, '');
      if(!numbers || numbers.length != 11)  throw Error('Invalid CPF');
      this.cpfNumbers = numbers.split('').map(n => parseInt(n));
      this.cpfVerificationDigits = [this.cpfNumbers.pop() ?? 0, this.cpfNumbers.pop() ?? 0].reverse(); 
   }

   validateRepeatedSameNumber = () => {
      if(this.cpfNumbers.every(c => c === this.cpfNumbers.at(0)) &&
         this.cpfVerificationDigits.every(c => c === this.cpfNumbers.at(0))
      ) throw new Error('Invalid CPF')
   }

   calculateDigit = (numbers: number[]) => {
      let calculatedList = numbers.length === 9 
         ? [10,9,8,7,6,5,4,3,2]
         : [11,10,9,8,7,6,5,4,3,2];
      calculatedList = calculatedList.map((item,ind)=> 
         item * (numbers.at(ind) ?? 0)
      );
      let sum = calculatedList.reduce((sum, cur)=> sum + cur);
      let rest = sum % 11;
      const digit = rest < 2 ? 0 : 11 - rest;
      return digit;
   }

   validate = (cpf: string) => {
      console.log(this.generate())
      this.getNumbersArray(cpf)
      this.validateRepeatedSameNumber();
      let digit1 = this.calculateDigit(this.cpfNumbers); 
      let digit2 = this.calculateDigit([...this.cpfNumbers, digit1]);
      return this.cpfVerificationDigits.at(0) === digit1 && 
         this.cpfVerificationDigits.at(1) === digit2;
   }

   generate = () => {
      const ramdom = Math.floor(Math.random() * 555555555).toString();
      const numbers = ramdom.split('').map(item=> parseInt(item));
      const digit1 = this.calculateDigit(numbers);
      const digit2 = this.calculateDigit([...numbers, digit1]);
      return [...numbers, digit1, digit2].join('');
   }

}


