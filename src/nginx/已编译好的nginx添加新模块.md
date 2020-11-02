1.查看原先的编译参数

    nginx -V

2.在原来的参数上加上新的模块, 例如: --with-http_ssl_module

    ./configure --prefix=/usr/local/nginx --with-http_ssl_module

3.make (是 make，不要 make install)

    make

4.备份旧 nginx

    cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak

5.复制新 nginx

    cp /usr/local/src/nginx-1.8.1/objs/nginx /usr/local/nginx/sbin/
