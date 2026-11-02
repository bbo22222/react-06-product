import { useEffect, useState } from "react";
import {useParams, Link} from "react-router";

function ProductDetail() {
  //사용자가 "저 상품 상세 내용을 보고 싶어" 를 요청한 상황
  //백엔드에게  "저 상품"의 상세 내용을 받아와 함
  //"저 상품" 예를 들어 4번 상품이라고 한 정보는 "경로"에 있음

  const { id } = useParams(); // 경로상 동적 라우팅의 값을 react-router가 갖고 있고 그 정보를 받아와야 하는 명령어가 useParams

  //4라는, 사용자가 원하는 상품 번호를 알아왔으니까
  //백엔드에게 4번 상품 정보를 요청, 가공, 저장
  //화면에 출력
  //https://dummyjson.com/products/${id} 로 상세를 보고 싶다는 요청

  // 특정 상품 1개의 상세 정보와 로딩/에러 상태 관리
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 알아낸 상품 번호(id)를 URL 뒤에 바인딩하여 백엔드에 상세 데이터 요청
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("상품 데이터를 불러오는데 실패했습니다.");
        }
        return res.json(); // 응답 가공
      })
      .then((json) => {
        setProduct(json); // 단일 상품 객체를 state에 저장
        setLoading(false); // 로딩 종료
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // 실패 시에도 로딩 종료
      });
  }, [id]); // id가 변경될 때마다 다시 실행

  // 1. 로딩 처리
  if (loading) {
    return<div>상세 정보를 불러오는 중입니다...</div>;
  }

  // 2. 에러가 발생했거나 해당 id의 상품 정보가 없는 경우
  if (!product) {
    return<div>존재하지 않거나 불러올 수 없는 상품입니다.</div>;
  }

  // 3. 정상적으로 단건 데이터를 받아왔을 때 화면 출력
  return (
    <div style={{ padding: "20px" }}>
      <Link to="/">← 목록으로 돌아가기</Link>
      <h1>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} width="300px" />
      <p><strong>카테고리:</strong> {product.category}</p>
      <p><strong>가격:</strong> ${product.price}</p>
      <p><strong>설명:</strong> {product.description}</p>
    </div>
  );
}

export default ProductDetail;

