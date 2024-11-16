// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { ChatbotService } from '../../services/chatbot/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.css']
})
export class ChatbotPage implements OnInit {
  userMessage: string = '';
  botResponse: string = '';

  constructor(private chatbotService: ChatbotService) {}
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  // 서버로 메시지를 보내고 응답을 받는 함수
  sendMessage() {
    if (this.userMessage.trim()) {
      this.chatbotService.sendMessage(this.userMessage).subscribe(
        (response) => {
          this.botResponse = response.response || 'No response from bot';
          this.userMessage = '';
        },
        (error) => {
          console.error('Error sending message:', error);
          this.botResponse = 'An error occurred while communicating with the bot.';
        }
      );
    }
  }
}
