import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { executeProcedure } from "@/lib/db";
import { ROLES } from "@/lib/utils";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        role: { label: "Role", type: "text", placeholder: "Client" },
        DNI: { label: "DNI", type: "text", placeholder: "00000001" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials, req) {
        const inputs = {
          DNI_Person: "DNI",
          plain_password: "password",
        };

        let result;
        switch (credentials.role) {
          case ROLES.CLIENT:
            result = await executeProcedure(
              credentials,
              inputs,
              "spClient_Login"
            );
            console.log("login");
            break;
          case ROLES.SALESPERSON:
            result = await executeProcedure(
              credentials,
              inputs,
              "spSalesperson_Login"
            );
            break;
          case ROLES.ADMINISTRATOR:
            result = await executeProcedure(
              credentials,
              inputs,
              "spAdministrator_Login"
            );
            break;
          case ROLES.GERENT:
            result = await executeProcedure(
              credentials,
              inputs,
              "spGerent_Login"
            );
            break;
          default:
            throw new Error("Invalid role");
        }

        if (result.recordset[0].StatusCode === 0) {
          const user = {
            id: result.recordset[0][`ID_${credentials.role}`],
            name: result.recordset[0].first_name,
            email: result.recordset[0].email,
            phone: result.recordset[0].phone,
            role: credentials.role,
          };

          if (credentials.role !== ROLES.CLIENT) {
            user.city = {
              id: result.recordset[0].city_id,
              name: result.recordset[0].city_name,
            };
          }

          return user;
        } else {
          throw new Error(result.recordset[0].ErrorMessage);
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        if (user.city) {
          token.city = user.city;
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id;
      session.user.role = token.role;
      if (token.city) {
        session.user.city = token.city;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
