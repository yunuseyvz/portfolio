<div align="center">
<img alt="Portfolio" src="/public/preview.png" width="90%">
</div>

# 🌟 Portfolio

🚀 Built with [Next.js](https://nextjs.org/) and deployed on [Vercel](https://vercel.com/).

💡 Based on an awesome template by [dillionverma](https://github.com/dillionverma).

## ✨ Features

- 💻 **Modern Tech Stack**: Next.js 15, React, Typescript, TailwindCSS, Shadcn/UI, Framer Motion and more💥
- 📱 **Fully Responsive**: Works flawlessly across all devices 📲
- ⚡ **Optimized**: For smooth performance on Next.js and Vercel 🌐
- 🔄 **Dynamic Data**: Content is dynamically fetched from a PostgreSQL database
- 🔒 **Admin Panel**: Secure admin interface with authentication for content management

## 🚀 Getting Started Locally

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yunuseyvz/portfolio
   ```

2. Move to the cloned directory

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory with the following variables:

   ```
   # Database connection
   DATABASE_URL

   # Blob storage for images
   BLOB_READ_WRITE_TOKEN

   # Authentication
   NEXTAUTH_SECRET
   NEXTAUTH_URL
   ADMIN_EMAIL
   ```

5. Start the local Server:

   ```bash
   pnpm dev
   ```

6. Open the [Config file](./src/data/resume.tsx) and make changes

## 🔮 Future Plans

- Make the portfolio data fully dynamic, including resume data (currently in the config file)
- Additional admin panel features for managing all content

## 📄 License

Licensed under the [MIT license](./LICENSE).
