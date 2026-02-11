'use client';

import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import Modal from './Modal';

interface BurnModalProps {
  isOpen: boolean;
  onClose: () => void;
  tokenName: string;
  walletAddress: string;
  setTxStatus: (status: any) => void;
  onBurnSuccess?: () => void;
}

/**
 * BurnModal Component
 * ==================
 * Modal để burn (xóa) CIP-68 NFT
 * 
 * PHẦN ĐÃ HOÀN THIỆN:
 * - UI modal với checkbox xác nhận
 * - State management
 * 
 * CẦN BỔ SUNG:
 * - Logic burn (3 bước tương tự mint)
 */
export default function BurnModal({
  isOpen, onClose, tokenName, walletAddress, setTxStatus, onBurnSuccess
}: BurnModalProps) {
  const { signTx } = useWallet();
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * TODO 10: Implement handleBurn function
   * ======================================
   * Mục tiêu: Burn NFT (3 bước tương tự mint)
   * 
   * Hướng dẫn:
   * 1. setIsLoading(true)
   * 2. setTxStatus({ status: 'building', ... })
   * 3. POST /api/burn với body: { wallet_address, token_name }
   * 4. Sign: await signTx(data.tx_cbor, true)
   * 5. Submit: POST /api/submit
   * 6. Success: setTxStatus success, onClose(), sau 2s gọi onBurnSuccess()
   * 7. Catch error
   * 8. Finally setIsLoading(false)
   */
  const handleBurn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement logic here
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="🔥 Burn NFT">
      <form onSubmit={handleBurn} className="space-y-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 font-medium mb-2">⚠️ Cảnh báo</p>
          <p className="text-sm text-red-700">
            Hành động này sẽ xóa vĩnh viễn NFT <strong>{tokenName}</strong> khỏi blockchain.
            Bạn sẽ mất cả Reference Token và User Token. Không thể khôi phục!
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="confirm-burn"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="w-4 h-4"
            disabled={isLoading}
          />
          <label htmlFor="confirm-burn" className="text-sm text-gray-700">
            Tôi hiểu và muốn xóa NFT này
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
            disabled={isLoading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="flex-1 btn-danger"
            disabled={isLoading || !confirmed}
          >
            {isLoading ? '⏳ Đang xóa...' : '🔥 Xóa NFT'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
