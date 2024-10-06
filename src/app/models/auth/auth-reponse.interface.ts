// src/app/models/auth/auth-response.interface.ts

export interface AuthResponse {
    user: any;
    success: boolean; // 성공 여부
    statusCode: number; // 상태 코드
    message: string; // 메시지
    data: { // 사용자 정보
        user: {
            id:string;
            username:string;
            email: string;
            role: string;
        };
        token: string; // JWT 토큰
    } | null; // data 속성을 null로 설정 가능
}
