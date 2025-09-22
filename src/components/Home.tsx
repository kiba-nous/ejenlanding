import { Hero } from './Hero';
import { Features } from './Features';
import { WaitlistForm } from './WaitlistForm';
import { Footer } from './Footer';

function Home() {
  return (
    <>
      <Hero />
      <Features />
      <WaitlistForm />
      <Footer />
    </>
  );
}

export { Home };