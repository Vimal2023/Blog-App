# Full Stack Blog Website with Next.js and MongoDB

This is a full-stack blog website built using **Next.js**, **MongoDB**, and **Tailwind CSS**. The project includes a dynamic frontend for displaying blog posts, a backend with APIs for data management, and lays the groundwork for an admin dashboard to manage content. The website enables users to browse blog posts, filter by category, and view individual posts, featuring a responsive design styled with Tailwind CSS.

## Features (Current Progress)

### Frontend
- Responsive header and footer sections
- Blog list on the homepage with category filtering
- Individual blog post page for detailed content viewing

### Backend
- MongoDB database setup for storing blog posts
- APIs created for basic CRUD operations to manage blog data

### Styling
- Tailwind CSS for modern, responsive layouts

## Technologies Used
- **Next.js**: React framework for server-side rendering and static site generation
- **MongoDB**: NoSQL database for storing blog post data
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Node.js**: Backend runtime for API development

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser to view the app.

### MongoDB Setup
- Ensure MongoDB is running locally or use a MongoDB Atlas cluster
- Update the `MONGODB_URI` in `.env.local` with your MongoDB connection string

## Project Structure
- `pages/`: Contains Next.js pages (e.g., homepage, blog post page)
- `components/`: Reusable UI components (e.g., Header, Footer, BlogList)
- `api/`: Backend API routes for handling MongoDB operations
- `styles/`: Tailwind CSS configuration and global styles
- `public/`: Static assets like images

## Current Progress
The project includes the following completed features:
- Next.js project setup with Tailwind CSS integration
- Creation of header, footer, and blog list with category filtering
- Blog post page for viewing individual posts
- Backend setup with MongoDB connection and initial APIs for data management

## Planned Features
- Admin dashboard for managing blog posts
- Add, edit, and delete blog post functionality
- Email subscription feature for users
- Admin page for managing subscriptions

## Contributing
Contributions are welcome! Follow these steps:
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m "Add your feature"`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements
