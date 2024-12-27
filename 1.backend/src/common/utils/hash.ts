import  * as bcrypt from 'bcrypt'
import { randomBytes, scrypt } from 'crypto';

export const hashPasswordHelper = async(plainPassword:string,salt:number) => {
    try {
        return await bcrypt.hash(plainPassword,salt)
    } catch (error) {
        throw error
    }
}

export const validPassword = async (InputPassword: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(InputPassword, hashPassword);
  } catch (error) {
    throw error;
  }
};

export const hash = (password) => {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(8).toString('hex');

    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ':' + derivedKey.toString('hex'));
    });
  });
};
export const verify = (password, hash) => {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(':');
    scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString('hex'));
    });
  });
};



// hash('123')
//   .then(hashedPassword => {
//     const test = hashedPassword;
//     return verify('123', test).then((test) => {
//       console.log(test);
//     });
//   })
//   .catch((error) => {
//     console.error('Error hashing password:', error);
//   });
