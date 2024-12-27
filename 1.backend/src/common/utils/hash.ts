import  * as bcrypt from 'bcrypt'

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