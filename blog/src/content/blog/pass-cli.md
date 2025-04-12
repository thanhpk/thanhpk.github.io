---
title: 'Đăng nhập nhanh hơn'
description: 'Quản lý pasword với pass cli'
pubDate: Sep 08 2024'
# heroImage: '/blog-placeholder-2.jpg'
---

Nếu là một công nhân code giống tôi, bạn sẽ không tin tưởng công nhân code khác lưu trữ password của mình. Sau khi biết tới <a href="https://www.linkedin.com/pulse/when-you-get-locked-out-your-google-account-what-do-desirea-calvillo">tai nạn</a> từng xảy ra vì Google <i>nhỡ tay</i> khóa tài khoản của khách hàng, tôi hạn chế dần việc sử dụng dịch vụ đăng nhập của Google hay Apple. Mỗi website, tôi sử dụng một password khác nhau. Tôi lưu trữ tất cả (~ 200) password của mình bằng Bitwarden. Vấn đề là ở Việt Nam, chí ít là mạng nhà tôi (FPT) và công ty (VNPT), truy cập vào Bitwarden rất lâuuu...

Đủ lâu để khiến tôi bực mình mỗi lần cần đăng nhập vào đâu đó. Tôi quyết định chuyển qua một công cụ khác offline: <a href="https://www.passwordstore.org" target="_blank">pass</a>. Tôi đăng nhập hầu hết bằng laptop cá nhân nên chẳng mặn mà lắm với tính năng đồng bộ password. Thứ tôi mặn mà là phải đăng nhập được thật nhanh.

### Lấy password để đăng nhập

Khi cần xác thực ở một website (github.com), gõ lệnh sau để lấy password

```sh
$ pass -c github.com

Copied github.com to clipboard. Will clear in 45 seconds.
```

Pang!, password đã được sao chép vào clipboard. `Alt+Tab` `Ctrl+v` `Enter` và xong.

Pass hỗ trợ auto-complete nên tôi không cần phải gõ toàn bộ chữ `github.com`. Chỉ cần gõ `pass -c git` `tab` và `Enter`.

Nếu tôi cần đăng nhập website mà cả năm rồi không đăng nhập. Thường thì tôi sẽ không nhớ rõ tên trước đây mình đặt là gì, nên tôi sẽ phải lục lại bằng lệnh grep.

```sh
$ pass | grep git

├── github.com
├── gitlab.com
│   ├── digitalocean.com
├── logitec
```

### Lưu một password

Khi đăng ký một website, tôi dùng lệnh sau để tạo password

```sh
$ pass generate -n website.com 10

[master 77421b3] Add generated password for website.com.
 1 file changed, 0 insertions(+), 0 deletions(-)
 rewrite website.com.gpg (100%)
The generated password for website.com is:
WdHWPLArY9
```

Đôi lúc tôi cần ghi chú thêm thông tin như username, email hoặc tên website, ...

```sh
$ pass edit website.com
```

Nếu như đã có sẵn password, thay vì tạo mới, tôi dùng lệnh `insert`

```sh
pass insert -m website.com
```

Để kiểm tra xem password đã được lưu chưa gõ `pass website.com`

Hiện tại tôi tạm hài lòng với Pass.
