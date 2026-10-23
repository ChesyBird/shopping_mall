import { useEffect, useState } from "react";
import api from "../api/api";
import dayjs from "dayjs";

const AdminPage = ({userRole}) => {

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);

    // 상품 목록과 회원 목록 동시 조회
    useEffect(()=>{
        // Promise.all() : 여러개의 비동기 작업을 동시에 처리
        const fetchData = async () => {
            try {
                const [productRes, userRes] = await Promise.all([
                    api.get('/products'), 
                    api.get('/users')
                ])
                setProducts(productRes.data);
                setUsers(userRes.data);
            } catch (error) {
                console.log("관리자 대시보드 조회 오류 : ", error);
            }
        }; // fetchData() 닫기
        fetchData(); // 호출
    }, [userRole]);

    // 전체 상품 수
    console.log("상품 수 : ", products.length);
    
    // 전체 회원 수 
    console.log("회원 수 : ", users.length);

    // 관리자 수(일반 회원 제외 : 필터함수)
    const adminCnt = users.filter(user => user.role === "admin").length;

    // 평균 상품 가격 계산
    // reduce() : 배열의 합계를 계산, 상품 수 [1, 2, 3, 4] sum=0, sum = sum+n
    // sum + product.price, 0 -> sum = 0 을 의미
    const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
    // 평균 가격 = 총 가격/상품수  -> Math.round(숫자, 자릿수) : 자릿수 생략하면 정수로 반올림
    const avgPrice = Math.round(totalPrice / products.length);

    // 최근 등록 상품 5개(등록일 기준 내림차순)
    // sort((a, b)) : b-a >내림차순 , a-b >오름차순
    // b.created_at.valueOf() : 날짜를 숫자로 변환
    const recentProducts = [...products]
        .sort((a, b) => b.created_at.valueOf() - a.created_at.valueOf())
        .slice(0, 5); // 0번 인덱스부터 (마지막-1) 인덱스까지

    return (
        <div className="admin-page">
            <h2>관리자 대시보드</h2>
            {/* 요약 카드 영역 */}
            <div className="admin-cards">
                <div className="admin-card">
                    <p>전체 상품</p>
                    <strong>{products.length} 개</strong>
                </div>
                <div className="admin-card">
                    <p>전체 회원</p>
                    <strong>{users.length} 명</strong>
                </div>
                <div className="admin-card">
                    <p>관리자</p>
                    <strong>{adminCnt} 명</strong>
                </div>
                <div className="admin-card">
                    <p>평균 상품 가격</p>
                    <strong>평균 {avgPrice} 원</strong>
                </div>
            </div>

            {/* 최근 등록 상품 */}
            <h3>최근 등록 상품</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>상품명</th>
                        <th>가격</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.price}</td>
                            <td>{dayjs(product.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* 회원 목록 */}
            <h3>회원 목록</h3>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>아이디</th>
                        <th>이메일</th>
                        <th>권한</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role === "admin" ? "관리자" : "일반회원"}</td>
                            <td>{dayjs(user.created_at).format("YYYY-MM-DD HH:mm:ss")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default AdminPage;