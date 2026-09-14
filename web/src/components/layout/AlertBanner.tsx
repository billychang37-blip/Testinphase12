import { AlertTriangle, X } from "lucide-react";

interface AlertBannerProps {
  onClose: () => void;
}

export default function AlertBanner({ onClose }: AlertBannerProps) {
  return (
    <div className="bg-[#5B6D75] text-white w-full py-4 px-4 sm:px-6 lg:px-8 relative z-50">
      <div className="max-w-[1300px] mx-auto flex items-start space-x-3 pr-8 relative">
        <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 fill-white stroke-[#5B6D75]" />
        <div className="text-[13px] leading-relaxed font-medium">
          <p className="font-bold mb-1 text-[15px]">Watch out for scam callers impersonating OCBC staff</p>
          <p className="text-gray-100">
            Are you getting calls from unknown numbers? Do they begin with a recorded message? If a caller claims to be from OCBC and says they are connecting you to an external party (like the police), hang up! Banks do not operate this way.{" "}
            <a href="#" className="underline hover:text-white transition-colors ml-1 font-semibold">Learn more.</a>
          </p>
        </div>
      </div>
      
      {/* Close button vertically centered */}
      <button 
        onClick={onClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Close alert"
      >
        <X className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
