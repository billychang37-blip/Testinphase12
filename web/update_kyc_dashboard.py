import re

with open('src/app/dashboard/kyc/page.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Add state variables
content = content.replace(
    'const [docType, setDocType] = useState("");',
    'const [docType, setDocType] = useState("");\n  const [issuingCountry, setIssuingCountry] = useState("");\n  const [idNumber, setIdNumber] = useState("");'
)

# Update validation
content = content.replace(
    'if (!docType || !file) {',
    'if (!docType || !file || !issuingCountry || !idNumber) {'
)
content = content.replace(
    '"Please select a document type and upload a document."',
    '"Please fill out all fields and upload a document."'
)

# Update payload
content = content.replace(
    'description: JSON.stringify({ documentType: docType, documentData: base64String }),',
    'description: JSON.stringify({ documentType: docType, documentData: base64String, issuingCountry: issuingCountry, idNumber: idNumber }),'
)

# Add input fields UI
input_fields = """                      <div>
                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">Issuing Country</label>
                        <input 
                          type="text" 
                          value={issuingCountry}
                          onChange={(e) => setIssuingCountry(e.target.value)}
                          placeholder="e.g. United States"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">ID Number</label>
                        <input 
                          type="text" 
                          value={idNumber}
                          onChange={(e) => setIdNumber(e.target.value)}
                          placeholder="Enter your ID number"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3.5 appearance-none outline-none focus:border-[#E81C24] transition-colors text-[14px] bg-white text-gray-900"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">Document Type</label>"""

content = content.replace(
    '                      <div>\n                        <label className="block text-gray-700 font-semibold text-[13px] mb-2">Document Type</label>',
    input_fields
)

with open('src/app/dashboard/kyc/page.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated dashboard/kyc to ask for more details")
