# IST-HUB

IST-HUB is a university-centric platform that allows users to connect, post jobs, and showcase their skills and projects, much like LinkedIn but focused on a university community. The platform allows users to verify each other to ensure authenticity and provides features to report fake users. Admins can manage users and reports through an admin panel.

## Features

- **User Registration & Login**

  - Users can sign up and log in.
  - Email verification upon registration.
  - Forgot password functionality.
- **Job Management**

  - Users can post, edit, and manage job listings.
  - Search jobs based on skills.
- **User Profiles**

  - Users can showcase their experiences, education, and projects.
  - Users can add and display their skills.
  - Search other users by skills.
- **User Verification**

  - Users can verify others, creating a chain of verifiers.
  - Verification helps identify real users from the university community.
  - Users can see who verified other users.
- **Reporting Fake Users**

  - Users can report others if they believe the information is fake.
- **Admin Panel**

  - Admins can manage users and their profiles.
  - Admins can verify users.
  - Admins can manage reported users.
  - Admin activities are logged and visible to other admins.

## Admin Features

- **Manage Users**

  - Add or remove admins.
  - View and verify user profiles.
  - Handle user reports.
- **Admin Activity Logs**

  - All admin activities are saved and can be viewed by other admins.

## Tech Stack

- **App**: Next.js (TypeScript) with Tailwind CSS.
- **Databse**: Mongodb
- **Authentication**: JWT-based email verification and password reset.

## Live Demo

The app is live at: [https://ist-hub.vercel.app](https://ist-hub.vercel.app)

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
