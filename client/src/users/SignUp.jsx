import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

// 회원 가입 폼 컴포넌트 정의
const SignUp = () => {
    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        username: "",   
        password: "",
        confirmPassword: "",  //비밀번호 확인
        email: ""
    })

    // 요청한 데이터 저장
    const {username, password, confirmPassword, email} = formData;

    const navigate = useNavigate();

    // 모든 필드 입력값 변경 함수
    const handleInputChange = (e) => {
        const {name, value} = e.target;    //e.target.value, e.target.name
        setFormData({...formData, [name]: value}); // 기존 배열에 [name]: value} 추가
    }

    // 폼을 제출하는 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault(); //기본 동작 막는 코드

        // 입력값 검증
        if(!formData.username.trim() || !formData.password.trim() ||
            !formData.confirmPassword.trim() || !formData.email.trim()){
                alert("모든 필드를 입력하세요");
                return;  //즉시 종료
        }

        // 비밀번호 일치 여부 확인
        if(password !== confirmPassword){
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 서버에 회원 정보 보내기
        try{
            await api.post("/users", {username, password, email});
            alert("회원가입이 등록되었습니다.");
            navigate("/signin");  //회원가입 후 로그인 페이지로 이동
        }catch(error){
            alert("회원가입 중 오류가 발생했습니다.");
            console.log(error);
        }
    }

    // 취소 버튼 클릭 함수
    const handleCancel = () => {
        // 입력값 초기화
        setFormData({
            username: "",   
            password: "",
            confirmPassword: "",  //비밀번호 확인
            email: ""
        })
    }

    return(
        <div className="sign-up">
            <h2>회원 가입</h2>
            <form onSubmit={handleSubmit}>
                 <div>
                    <label htmlFor="username">아이디</label>
                    <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={handleInputChange}
                        placeholder="아이디를 입력하세요"
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input 
                        type="password" 
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input 
                        type="password" 
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={handleInputChange}
                        placeholder="비밀번호를 입력하세요"
                    />
                </div>
                <div>
                    <label htmlFor="email">이메일</label>
                    <input 
                        type="text" 
                        name="email"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="이메일을 입력하세요"
                    />
                </div>
                <div>
                    {/* 서버에 전송이 됨으로 "submit" 필수 */}
                    <button type="submit">가입</button>
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp;