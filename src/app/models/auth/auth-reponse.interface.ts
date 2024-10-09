export interface AuthResponse {
    user: string;
    success: boolean; // 성공 여부
    statusCode: number; // 상태 코드
    message: string; // 메시지
    data: { // 사용자 정보
        user: {

            username: string; // 사용자 닉네임
            email: string;    // 사용자 이메일

        };
        token: string; // JWT 토큰
    } | null; // data 속성을 null로 설정 가능
}
