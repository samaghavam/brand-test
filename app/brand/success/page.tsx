import Link from 'next/link';
import Button from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <main className="container mx-auto py-10">
      <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Brand Successfully Registered!</h1>
        <p className="text-gray-600 mb-6">
          Your brand has been successfully registered in our system.
        </p>
        <Link href="/brand">
          <Button>Register Another Brand</Button>
        </Link>
      </div>
    </main>
  );
}