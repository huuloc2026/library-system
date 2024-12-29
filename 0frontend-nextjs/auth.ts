
import { sendRequest } from "@/app/utils/api";
import { signInSchema } from "@/app/utils/checklogin";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

interface UserResponse {
  id: string;
  email: string;
  isVerify: boolean;
  firstName: string;
  lastName: string;
  role: string;
  statusCode?: number; // Optional if not always present
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const user = await sendRequest<UserResponse>({
            'method':"POST",
            url:"http://localhost:8080/api/auth/login",
            body: {
              ...credentials,
            }
          })
 
          //call back end
          if (!user) {
            throw new Error("Invalid credentials.");
          }
          
          /**
           * if (user.status = 400){
           * throw new Error("")}
           */
          console.log("check user",user);
          return user;
        } catch (error) {
          return null
        }
      },
    }),
  ],
  pages:{signIn:"/auth/login",},
});
