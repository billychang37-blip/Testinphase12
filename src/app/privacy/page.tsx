export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-[800px] mx-auto bg-white p-12 rounded-xl shadow-sm">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          At OCBC, we take your privacy and data security very seriously. This policy outlines how we handle your personal information.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Data Collection</h2>
        <p className="text-gray-600 mb-4">
          We collect personal, financial, and behavioral data necessary to provide our banking services and ensure account security.
        </p>
        <h2 className="text-xl font-semibold mt-8 mb-4">Data Protection</h2>
        <p className="text-gray-600 mb-4">
          All data is encrypted in transit and at rest using industry-standard protocols.
        </p>
        <div className="mt-12">
          <a href="/register" className="text-[#E81C24] hover:underline">&larr; Back to Registration</a>
        </div>
      </div>
    </div>
  );
}
