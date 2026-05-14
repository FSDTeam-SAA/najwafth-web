"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl flex flex-col items-center text-center">
        
        {/* Warning Icon with Pink Circle Background */}
        <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="text-rose-500 w-8 h-8" />
        </div>

        {/* Text Content */}
        <h2 className="text-xl font-bold text-gray-800 mb-2">Are You Sure?</h2>
        <p className="text-gray-400 text-sm mb-8">
          Are you sure you want to log out?
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1 py-6 rounded-xl border-gray-100 text-gray-500 font-medium hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="flex-1 py-6 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white font-medium shadow-lg shadow-rose-100"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;