import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import styles from "./productDetail.module.css"; // 파일명 오타(modul -> module)도 함께 체크해주세요!

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("상품 데이터를 불러오는데 실패했습니다.");
        }
        return res.json();
      })
      .then((json) => {
        setProduct(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  // 1. 로딩 처리
  if (loading) {
    return (
      <div className={styles.stateMessage}>
        상세 정보를 불러오는 중입니다...
      </div>
    );
  }

  // 2. 에러가 발생했거나 해당 id의 상품 정보가 없는 경우
  if (!product) {
    return (
      <div className={styles.stateMessage}>
        존재하지 않거나 불러올 수 없는 상품입니다.
      </div>
    );
  }

  // 3. 정상적으로 단건 데이터를 받아왔을 때 화면 출력
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        ← 목록으로 돌아가기
      </Link>

      <h1 className={styles.title}>{product.title}</h1>

      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.thumbnail}
      />

      <p className={styles.infoText}>
        <strong>카테고리:</strong> {product.category}
      </p>

      <p className={styles.infoText}>
        <strong>가격:</strong>{" "}
        <span className={styles.priceText}>${product.price}</span>
      </p>

      <p className={styles.infoText}>
        <strong>설명:</strong> {product.description}
      </p>

      <p className={styles.infoText}>
        <strong>평점:</strong> ⭐ {product.rating} / 5.0
      </p>
    </div>
  );
}

export default ProductDetail;
