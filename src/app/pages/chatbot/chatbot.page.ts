import { Component } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage {
  userMessage: string = ''; // 사용자가 입력한 메시지
  chatHistory: { sender: string; message: string }[] = []; // 대화 기록
  selectedMovie: { id: number; title: string; description: string } | null = null; // 선택된 영화 데이터
  showLoading: boolean = true; // 로딩 화면 표시 여부
  isLoading: boolean = false; // 로딩 상태 여부

  constructor(private chatbotService: ChatbotService) {}

  /**
   * 페이지가 열릴 때 실행
   */
  ionViewDidEnter() {
    this.showLoading = true; // 로딩 화면 표시
    setTimeout(() => {
      this.showLoading = false; // 3초 후 로딩 화면 숨김
    }, 3000);
  }
  
  /**
   * 사용자가 입력한 메시지를 서버로 전송하고 응답을 받아옵니다.
   */
  sendMessage() {
    if (!this.userMessage.trim()) {
      return; // 입력 메시지가 비어 있으면 처리하지 않음
    }

    const message = this.userMessage.trim();
    this.chatHistory.push({ sender: 'You', message }); // 사용자 메시지를 대화 기록에 추가
    this.userMessage = ''; // 입력 필드 초기화
    this.isLoading = true; // 로딩 시작

    // 서버로 메시지 전송
    this.chatbotService.askChatbot(message).subscribe({
      next: (res) => {
        // 서버 응답을 대화 기록에 추가
        const isMovieRecommendation = res.response.includes('추천 영화');
        this.chatHistory.push({
          sender: 'Chatbot',
          message: res.response,
        });
        this.isLoading = false; // 로딩 종료

        // 선택된 영화 데이터 처리
        if (isMovieRecommendation) {
          this.selectedMovie = {
            id: 1,
            title: '예제 영화 제목',
            description: '예제 영화 설명입니다.',
          };
        }
      },
      error: (err) => {
        console.error('Error communicating with chatbot:', err);
        this.chatHistory.push({
          sender: 'Chatbot',
          message: '오류가 발생했습니다. 다시 시도해 주세요.',
        });
      },
    });
  }

  /**
   * 퀵 리플라이 메시지를 전송합니다.
   * @param quickReply 퀵 리플라이 메시지
   */
  sendQuickReply(quickReply: string) {
    this.userMessage = quickReply; // 퀵 리플라이를 메시지로 설정
    this.sendMessage(); // 메시지 전송
  }

  /**
   * 영화 상세 보기
   */
  viewDetails(movieId: number) {
    alert(`영화 ID: ${movieId} - 상세 정보를 확인합니다.`);
  }

  /**
   * 좋아요 추가
   */
  addToFavorites(movieId: number) {
    alert(`영화 ID: ${movieId} - 좋아요가 추가되었습니다.`);
  }

  /**
   * 대화 기록 초기화
   */
  clearChat() {
    this.chatHistory = []; // 대화 기록을 비움
    this.selectedMovie = null; // 선택된 영화도 초기화
  }

  ionViewWillLeave() {
    // 페이지를 떠날 때 포커스를 제거
    const focusedElement = document.activeElement as HTMLElement;
    if (focusedElement) {
      focusedElement.blur();
    }
  }
}
