# Hannah Bennie Schools (HBS) Web Application

<p align="center">
    <a href="#"><img src="https://img.shields.io/badge/status-active-brightgreen.svg"></a>
    <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15+-000000.svg"></a>
    <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-61DAFB.svg"></a>
    <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6.svg"></a>
    <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind-4-38B2AC.svg"></a>
</p>

Hannah Bennie Schools is a leading Nursery and Primary school located in Dar es Salaam, Tanzania. This application serves as the digital hub for admissions, careers, and school management, powered by DeepSeek AI for intelligent recruitment and school assistance.

# Supabase Configuration

To ensure all school functionalities (Admissions, Careers, Blogs, Events) work correctly, you must set up the following Storage Buckets in your Supabase project.

# Required Storage Buckets

| Bucket Name | Access Level | Description |
| :--- | :--- | :--- |
| **`cvs`** | Private / Auth Required | Stores PDF resumes for job applications. Only admins can view. |
| **`blogs`** | Public | Stores featured images for school news and blog articles. |
| **`events`** | Public | Stores promotional images for school events and tours. |
| **`products`** | Public | General storage for school resources and media artifacts. |

# Configuration Steps:
1. Go to **Storage** in your Supabase Dashboard.
2. Click **New Bucket** and create each of the buckets listed above.
3. For `blogs`, `events`, and `products`, ensure "Public bucket" is toggled **ON**.
4. For `cvs`, keep it **Private** to protect applicant data.
5. **RLS Policies**: Ensure you create appropriate Row Level Security (RLS) policies to allow `INSERT` from authenticated users (for `cvs`) and `SELECT` for everyone (for public buckets).


# AI Integration (DeepSeek)

This application uses DeepSeek AI for:
- **HBS School Assistant**: A smart chatbot that provides information about school programs and admissions.
- **Candidate Ranking**: Automatically analyzes and ranks job applicants based on CV data.
- **Job Generation**: Generates humanized job descriptions for the HBS team.



# Quick Links

- **Admissions**: [Contact Page](/contact)
- **Careers**: [Join our team](/careers)
- **Admin**: [Staff Dashboard](/admin)


<p align="center">
    <img src="/screen/1.png" alt="UI-Screenshot" width="800">
</p>

<p align="center">
    <img src="/screen/2.png" alt="UI-Screenshot" width="800">
</p>

<p align="center">
    <img src="/screen/3.png" alt="UI-Screenshot" width="800">
</p>

<p align="center">
    <img src="/screen/4.png" alt="UI-Screenshot" width="800">
</p>

<p align="center">
    <img src="/screen/5.png" alt="UI-Screenshot" width="800">
</p>

<p align="center">
    <img src="/screen/6.png" alt="UI-Screenshot" width="800">
</p>

<p align="center">
    <img src="/screen/7.png" alt="UI-Screenshot" width="800">
</p>

> **Warning:** This software, HBS is protected under Apache 2.0 License. Violation of terms (including removing copyright notices or patent retaliation) will result in legal action. Read [LICENSE](LICENSE).
