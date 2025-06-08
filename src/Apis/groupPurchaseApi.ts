export async function registerGroupPurchase(memberId: number, data: {
  title: string;
  content: string;
  name: string;
  imageUrl: string;
  category1: string;
  category2: string;
  price: number;
  quantity: number;
  maxParticipants: number;
}) {
  const res = await fetch(`/api/purchases/${memberId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('공구 등록에 실패했습니다.');
  return res.json();
} 