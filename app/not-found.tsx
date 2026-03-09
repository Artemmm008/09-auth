import { Metadata } from 'next';
import Link from 'next/link';
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'Sorry, the page you are looking for does not exist or has been moved.',
  openGraph: {
      title: 'Page Not Found',
      description:'Sorry, the page you are looking for does not exist or has been moved.',
      url: `https://notehub.com`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub - Page Not Found',
        },
      ],
      type: 'article',
    },
};


const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;

