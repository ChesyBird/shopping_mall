import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";
import dayjs from 'dayjs'

const ProductInfo = () => {
    // URL의 경로 추출(받기)
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();

    // db에서 해당 id의 상품 가져오기
    useEffect(() => {
        const fetchProduct = async () => {
            try{
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            }catch(error){
                console.log("상품 상세 조회 에러: ", error);
            }
        }
        fetchProduct(); //함수 호출
    }, [id]);

    // 상품 삭제 구현
    const handleDelete = async () => {
        // 삭제 시 컨펌으로 물어보기
        if(window.confirm("정말 삭제하시겠습니까?")){
            try{
                await api.delete(`/products/${id}`);
                alert("상품이 삭제되었습니다.");
                navigate("/products");  //목록 보기로 이동
            }catch(error){
                alert("상품 삭제 중 오류가 발생했습니다.", error);
            }
        }
    }

    return(
        <div className="product-info">
            <h2>상품 정보</h2>
            {product && (
                <div className="detail">
                    <p>상품명: {product.product_name}</p>
                    <p>가격: {product.price}원</p>
                    <p>설명: {product.description} </p>
                    <p>등록일: {dayjs(product.created_at).format("YYYY-MM-DD HH:mm:ss")}</p>
                </div>
            )}
            {/* 상품 수정, 삭제, 목록보기 버튼 */}
            <div>
                <button onClick={() => {navigate('/products')}}>목록 보기</button>
                <button onClick={() => navigate(`/products/update/${id}`)}>수정</button>
                <button onClick={handleDelete}>삭제</button>
            </div>
        </div>
    )
}

export default ProductInfo;