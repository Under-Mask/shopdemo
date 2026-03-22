/**
 * 데모 상품 데이터 (실서비스에서는 API/DB에서 로드)
 */
window.SHOP_PRODUCTS = [
  { id: "p1", name: "오버핏 코튼 티셔츠", price: 39000, category: "의류", desc: "부드러운 코튼, 데일리 컬러 4종." },
  { id: "p2", name: "미니멀 백팩", price: 89000, category: "의류", desc: "가벼운 무게, 노트북 수납 가능." },
  { id: "p3", name: "유리 텀블러 500ml", price: 24900, category: "리빙", desc: "스테인리스, 보온/보냉 유지." },
  { id: "p4", name: "무선 마우스", price: 33000, category: "디지털", desc: "저소음 클릭, 블루투스 듀얼." },
  { id: "p5", name: "아로마 디퓨저 세트", price: 19800, category: "리빙", desc: "은은한 잔향, 인테리어 포인트." },
  { id: "p6", name: "오가닉 립밤", price: 12500, category: "뷰티", desc: "보습 케어, 무향 옵션." },
];

function formatPrice(n) {
  return "₩" + Number(n).toLocaleString("ko-KR");
}
