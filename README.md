# NextAuth Starter Kit 🚀

Welcome to the NextAuth Starter Kit! This is an open-source authentication template for modern Next.js applications, designed to provide a robust foundation for building secure and scalable SaaS products. The project incorporates server-side rendering, TypeScript, reusable UI components, and best practices to kickstart your next side project.

## Features

- **Login with Credentials**
- **OAuth Providers Integration**
  - Google
  - GitHub
- **Email Verification**
  - Powered by Resend
- **Two-Factor Authentication (2FA)**
- **Forgot Password**
- **Edit User Information**
- **Server & Client-side Authorization**

## Technologies Used

- **Next.js** with Server-Side Rendering
- **NextAuth v5 (AuthJS)** for Authentication
- **TypeScript** for Type Safety
- **ShadcnUI** and **TailwindCSS** for UI Components
- **PostgreSQL** with **Prisma** ORM for Database Management

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js v16 or above
- PostgreSQL database

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/hassan-31x/nextjs-starter-kit.git
   cd nextjs-starter-kit
   ```

2. **Checkout to the specific branch**
   
    ```bash
   git checkout auth/nextauth-prisma
   ```

3. **Install dependencies**

   ```bash
   npm install
    # or
    yarn install
   ```

4. Setup environment variables
Create a .env.local file in the root of your project and add the following:

   ```bash
   BASE_URL="http://localhost:3000"

    DATABASE_URL="postgresql://username:password@localhost:port/database?schema=public"
    AUTH_SECRET="your_secret_key" #? Generate a secret key using the command: openssl rand -hex 32
    
    GITHUB_CLIENT_ID="your_github_client_id"
    GITHUB_CLIENT_SECRET="your_github_client_secret"
    
    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    
    RESEND_API_KEY="your_resend_api_key"
    FROM_EMAIL="onboarding@resend.dev"
   ```

5. Run migrations to set up your database schema

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server

    ```bash
   npm run dev
    # or
    yarn dev
   ```

Your app should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Login with OAuth Providers:** Add your Google and GitHub OAuth credentials in the `.env.local` file to enable login.
- **Email Verification:** Configure the Resend API key and `FROM_EMAIL` for email verification.
- **Two-Factor Authentication:** The implementation is ready for use once you complete the basic setup.
- **Edit User Information:** Accessible after logging in.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions, bug reports, or improvements.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements

- [NextAuth.js](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadcnUI](https://shadcn.dev/)
- [Resend](https://resend.com/)


