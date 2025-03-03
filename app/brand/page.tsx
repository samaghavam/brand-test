import BrandForm from '@/components/brand/brand-form';

export default function BrandRegistrationPage() {
  return (
    <main className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Register Your Brand</h1>
        <BrandForm />
      </div>
    </main>
  );
}