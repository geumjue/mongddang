export interface AuthResponse {
    user: string;
    success: boolean; // 성공 여부
    statusCode: number; // 상태 코드
    message: string; // 메시지
    data: { // 사용자 정보
        user: {
            id: string;
            role: string;
            username: string; // 사용자 닉네임
            email: string;    // 사용자 이메일
            createdAt: string;
            updatedAt: string;

        };
        token: string; // JWT 토큰
    } | null; // data 속성을 null로 설정 가능
}
