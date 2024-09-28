export interface ApiResponse<T>{
    success: boolean; // api 요청 성공했는지 나타냄
    statusCode: number; // HTTP 응답 코드를 나타내는 숫자
    message: string; // api 요청의 결과에 대한 메세지
    data: T; // 제네릭타입 T로 정의된 데이터

}