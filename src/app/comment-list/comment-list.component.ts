import { Component } from '@angular/core';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  // Data mặc định
  comments = [
    {
      cmtId: 1,
      description: 'Mua 2 cái mỗi cái sài được 2 tháng là lỗi, không sửa được quá tệ',
      avatar_user: '/src/assets/imgs/customer01.jpg',
      email_user: 'Lê Anh Đức',
      createdAt: new Date('2024-11-01'),
      vote: 24,
      evaluate: 1,
      urlImage: 'src/assets/imgs/customer01.jpg',
      isDisplay: true,
    },
    {
      cmtId: 2,
      description: 'Tốt',
      avatar_user: '',
      email_user: 'Nguyễn Quyết Chiến',
      createdAt: new Date('2024-11-02'),
      vote: 10,
      evaluate: 5,
      urlImage: '',
      isDisplay: true,
    },
    {
      cmtId: 3,
      description: 'Tạm ổn',
      avatar_user: 'assets/avatar3.jpg',
      email_user: 'Anh Hạnh',
      createdAt: new Date('2024-11-05'),
      vote: 8,
      evaluate: 3,
      urlImage: '',
      isDisplay: true,
    },
    {
      cmtId: 4,
      description: 'Tạm ổn thoi',
      avatar_user: 'assets/avatar3.jpg',
      email_user: 'Anh Hạnh',
      createdAt: new Date('2024-12-05'),
      vote: 8,
      evaluate: 4,
      urlImage: '',
      isDisplay: true,
    },
    {
      cmtId: 5,
      description: 'Tạm ổn ',
      avatar_user: 'assets/avatar3.jpg',
      email_user: 'Anh Hạnh',
      createdAt: new Date('2024-12-05'),
      vote: 8,
      evaluate: 4,
      urlImage: '',
      isDisplay: true,
    },
  ];

  // Hàm xử lý nhấn Like
  onLike(comment: any): void {
    comment.vote += 1;
  }

  // Hàm sinh số sao
  generateStars(count: number) {
    return Array(5).fill(0);
  }

  // Hàm format thời gian
  formatTime(date: Date): string {
    const diff = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Hôm nay';
    if (diff === 1) return 'Hôm qua';
    return `${diff} ngày trước`;
  }
}
