export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[800px] mx-auto bg-white p-12 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Terms of Service</h1>
        <p className="text-gray-600 mb-4">
          Welcome to OCBC Internet Banking. By accessing this platform, you agree to be bound by these terms and conditions.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By registering for an account, you acknowledge that you have read, understood, and agree to our terms.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">2. Security</h2>
        <p className="text-gray-600 mb-4">
          You are responsible for maintaining the confidentiality of your account credentials and PIN.
        </p>
        <div className="mt-12">
          <a href="/register" className="text-[#E81C24] hover:underline">&larr; Back to Registration</a>
        </div>
      </div>
    </div>
  );
}
