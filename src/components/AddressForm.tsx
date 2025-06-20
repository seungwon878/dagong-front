import { useState } from 'react';
import useGeocode from '../hooks/useGeocode';

export default function AddressForm() {
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const geocode = useGeocode();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const c = await geocode(address);
      setCoords(c);
      console.log('위도/경도 변환 성공:', c);
    } catch (err: any) {
      console.error('위도/경도 변환 실패:', err);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="주소 입력 (예: 소사로202번길 42)"
          disabled={isLoading}
        />
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          disabled={isLoading || !address.trim()}
        >
          {isLoading ? '변환 중...' : '변환'}
        </button>
      </form>

      {coords && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded">
          <h3 className="font-bold text-green-800 mb-2">변환 결과</h3>
          <p className="text-sm">
            <span className="font-medium">위도:</span> <b>{coords.lat}</b>
          </p>
          <p className="text-sm">
            <span className="font-medium">경도:</span> <b>{coords.lng}</b>
          </p>
        </div>
      )}
    </div>
  );
} 