export default class alumno {
    constructor(username, DNI, edad) {
      this.username = username;
      this.DNI = DNI;
      this.edad = edad;
    }
    toString(alumno){
        return `username:${this.username}, DNI:${this.DNI}, edad:${this.edad}`;
    }
  }
