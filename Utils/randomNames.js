export class RandomNames {
  // Array of sample first names
  firstNames() {
    const names = [
      'Alice', 'Bob', 'Charlie', 'Diana', 'Ethan',
      'Fiona', 'George', 'Hannah', 'Ian', 'Julia',
      'Marcela', 'Alejandro', 'David', '', , 'Estela', 'Juana',
      'Alberto', 'Raymundo', 'Mariana', 'Altagracia', 'Laura'
    ]
    return names
  }

  // Array of sample last names
  lastNames() {
    const lastName = [
      'Smith', 'Johnson', 'Williams', 'Brown',
      'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
      'Gutierrez', 'Hurtado', 'Reyes', 'Perez', 'Gomez', 'Jimenez',
      'Flores', 'Ortega', 'Salazar', 'Zepeda', 'Gonzalez', 'Alvarez'
    ]
    return lastName
  }

  getRandomName() {
    let firstName = this.firstNames()
    let lastName = this.lastNames()
    const randomFirst = firstName[Math.floor(Math.random() * firstName.length)]
    const randomLast = lastName[Math.floor(Math.random() * lastName.length)];

    return {
      firstName: randomFirst,
      lastName: randomLast,
      fullName: `${randomFirst} ${randomLast}`
    }
  }

  /**
   * Generates a unique email based on a timestamp and random string
   * @param {string} [prefix='user'] 
   * @returns {string} Unique email address
   */
  getRandomEmail(prefix = 'user') {
    const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2, 5);
    return `${prefix}_${uniqueId}@example.com`;
  }
}