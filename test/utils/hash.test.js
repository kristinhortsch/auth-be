const bcryptjs = require('bcryptjs');
const hashFunction = require('../../lib/utils/hash');
const compareFunction = require('../../lib/utils/compare');

describe('bcrypt', () => {
  it('hashes a password', () => {
    return bcryptjs.hash('password', 10)
      .then(hashedPassword => {
        expect(hashedPassword).toBeDefined();
        console.log(hashedPassword);      
      });
  });

  it('creates hashed passwords that are different', () => {
    const password = 'roxy';
    return bcryptjs.hash(password, 10)
      .then(hashedPassword1 => {
        return bcryptjs.hash(password, 10)
          .then(hashedPassword2 => {
            expect(hashedPassword1).not.toEqual(hashedPassword2);
          });
      });
  });

  it('creates the same hash given the same salt', () => {
    const version = '$2b$10$';
    const salt = 'fkdlskei3lsjvbcneosntl';
    const bcryptSalt = `${version}${salt}`;
    const password = 'roxy';
    return bcryptjs.hash(password, bcryptSalt)
      .then(hashedPassword1 => {
        return bcryptjs.hash(password, bcryptSalt) 
          .then(hashedPassword2 => {
            expect(hashedPassword1).toEqual(hashedPassword2);
          });
      });
  });

  it('can compare hashes based on the same password', () => {
    return bcryptjs.hash('fuego', 10)
      .then(hashedPassword => {
        bcryptjs.compare('fuego', hashedPassword)
          .then(result => {
            expect(result).toBeTruthy();
          });
      });
  });

  it('can compare hashes based on a different password', () => {
    return bcryptjs.hash('fuego', 10)
      .then(hashedPassword => {
        bcryptjs.compare('wrongfuego', hashedPassword)
          .then(result => {
            expect(result).toBeFalsy();
          });
      });
  });
});

describe('hash function', () => {
  it('can return a hashed version of a string password passed in', () => {
    const string = 'colonelmustard';
    expect(hashFunction(string)).toEqual(bcryptjs.hash(string, 10));
  });
});

describe('compare function', () => {
  it('can compare a hashed version of a string with the original string password', () => {
    const string = 'colonelmustard';
    const  hash = bcryptjs.hash(string, 10);
    expect(compareFunction(string, hash)).toBeTruthy();
  });
});
