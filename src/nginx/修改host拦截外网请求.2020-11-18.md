修改 host, 将网络请求解析到本地, 返回自定义内容

### 设置 nginx 开机启动

```
1.右键 nginx.exe, 发送到桌面快捷方式
2.`win + r` 调出shell, 输入 shell:startup, 定位到启动文件夹
3.将快捷方式放入启动文件夹
```

### 修改 host

```
C:\Windows\System32\drivers\etc\hosts

127.0.0.1   xxx.com
```

### 配置 nginx

```
    server {
        listen       80;
        server_name  xxx.com;

        # 重定向
        location / {
            proxy_pass  http://182.207.84.6/;

            # 替换请求内容
            # proxy_set_header Accept-Encoding "";
            sub_filter_types *;
            sub_filter 'Welcome' 'Hi, Welcome';
            sub_filter 'em' 'h5';
            # sub_filter_once off;
        }

        # 替换特定js
        location =/a/b.js {
            # 返回 nignx 的 html/a/ 目录下的 b.js
            root   html;

            # 或直接返回内容
            # default_type application/javascript;
            # return 200 'console.log(1)';
        }
    }
```

### https

    https 站点貌似不适用这种方式

    由于 HSTS 的存在, 有些网站强制使用 https, 站点列表是内置在浏览器内的, 无法修改
