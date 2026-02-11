'use client';

import { useState, useEffect } from 'react';
import UpdateModal from './UpdateModal';
import BurnModal from './BurnModal';

interface NFTListProps {
  walletAddress: string;
  scriptInfo: any;
  setTxStatus: (status: any) => void;
  refreshTrigger: number;
}

interface NFTData {
  tokenName: string;
  description: string;
  version: number;
  loading: boolean;
}

const PLATFORM_POLICY_ID = '9127f9f55834f6c71fba24ae5712e381cfeb54aabce7072ecfb4739f';
const USER_TOKEN_PREFIX = '000de140';

/**
 * NFTList Component
 * ================
 * Hiển thị danh sách CIP-68 NFT của user
 * 
 * PHẦN ĐÃ HOÀN THIỆN:
 * - UI hiển thị NFT cards
 * - Modal components (Update/Burn)
 * - Decode token name logic
 * 
 * CẦN BỔ SUNG:
 * - fetchNFTs: Lấy danh sách tokens từ API
 * - loadMetadata: Load metadata cho mỗi token
 */
export default function NFTList({ walletAddress, scriptInfo, setTxStatus, refreshTrigger }: NFTListProps) {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFTData | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showBurnModal, setShowBurnModal] = useState(false);

  /**
   * TODO 11: Implement fetchNFTs function
   * =====================================
   * Mục tiêu: Lấy danh sách CIP-68 tokens từ ví user
   * 
   * Hướng dẫn:
   * 1. setLoading(true)
   * 2. Try-catch:
   *    - Gọi GET http://localhost:8000/api/wallet/${walletAddress}
   *    - Parse response JSON
   *    - Filter data.assets: chỉ giữ assets có:
   *      + policy_id === PLATFORM_POLICY_ID
   *      + asset_name bắt đầu với USER_TOKEN_PREFIX
   *    - Map filtered assets thành array NFTData:
   *      + Cắt prefix: asset_name.slice(8)
   *      + Decode hex → string: Buffer.from(hex, 'hex').toString('utf-8')
   *      + Khởi tạo: { tokenName, description: '', version: 0, loading: true }
   *    - setNfts(nftList)
   *    - Với mỗi NFT, gọi loadMetadata(tokenName, index)
   * 3. Catch error: console.error
   * 4. Finally: setLoading(false)
   */
  const fetchNFTs = async () => {
    // TODO: Implement logic here
  };

  /**
   * TODO 12: Implement loadMetadata function
   * ========================================
   * Mục tiêu: Load metadata cho 1 token từ API
   * 
   * Hướng dẫn:
   * 1. Try-catch:
   *    - Gọi GET http://localhost:8000/api/metadata/${tokenName}
   *    - Parse response
   *    - Nếu data.success:
   *      + Parse description từ data.metadata (có thể là object)
   *      + Update NFT tại index: setNfts(prev => prev.map((nft, i) => 
   *          i === index ? { ...nft, description, version: data.version, loading: false } : nft
   *        ))
   * 2. Catch error: Update NFT với loading: false
   */
  const loadMetadata = async (tokenName: string, index: number) => {
    // TODO: Implement logic here
  };

  /**
   * TODO 13: Implement useEffect for auto-fetch
   * ===========================================
   * Mục tiêu: Tự động fetch NFTs khi component mount và khi refreshTrigger thay đổi
   * 
   * Hướng dẫn:
   * 1. Dùng useEffect
   * 2. Gọi fetchNFTs()
   * 3. Dependency: [walletAddress, refreshTrigger]
   */
  // TODO: Implement useEffect here

  const handleUpdate = (nft: NFTData) => {
    setSelectedNFT(nft);
    setShowUpdateModal(true);
  };

  const handleBurn = (nft: NFTData) => {
    setSelectedNFT(nft);
    setShowBurnModal(true);
  };

  const handleRefresh = () => {
    fetchNFTs();
  };

  const handleUpdateSuccess = () => {
    setTimeout(() => fetchNFTs(), 2000);
  };

  const handleBurnSuccess = () => {
    setTimeout(() => fetchNFTs(), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">📚 NFT của bạn</h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          {loading ? '⏳' : '🔄'} Làm mới
        </button>
      </div>

      {loading && nfts.length === 0 ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cardano-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải NFTs...</p>
        </div>
      ) : nfts.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Bạn chưa có NFT nào. Hãy mint NFT đầu tiên!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {nfts.map((nft, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {nft.tokenName}
                  </h3>
                  {nft.loading ? (
                    <p className="text-sm text-gray-500 italic">Đang tải metadata...</p>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-2">{nft.description}</p>
                      <span className="badge badge-success">Version {nft.version}</span>
                    </>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleUpdate(nft)}
                    disabled={nft.loading}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors disabled:opacity-50"
                  >
                    🔄 Update
                  </button>
                  <button
                    onClick={() => handleBurn(nft)}
                    disabled={nft.loading}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors disabled:opacity-50"
                  >
                    🔥 Burn
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedNFT && (
        <>
          <UpdateModal
            isOpen={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            tokenName={selectedNFT.tokenName}
            currentDescription={selectedNFT.description}
            walletAddress={walletAddress}
            setTxStatus={setTxStatus}
            onUpdateSuccess={handleUpdateSuccess}
          />
          <BurnModal
            isOpen={showBurnModal}
            onClose={() => setShowBurnModal(false)}
            tokenName={selectedNFT.tokenName}
            walletAddress={walletAddress}
            setTxStatus={setTxStatus}
            onBurnSuccess={handleBurnSuccess}
          />
        </>
      )}
    </div>
  );
}
